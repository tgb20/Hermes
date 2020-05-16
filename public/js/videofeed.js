const nativeImage = require('electron').nativeImage
const moment = require('moment');
let video, canvas, context;
let markerLabels, detector, recording, mediaRecorder;
const FPS = 20; // for saving video
const type = 'image/png'; // for saving images
const quality = 9; // PNG quality
let chunks = [];

async function init() {
  video = document.getElementById('video-canvas');
  canvas = document.getElementById('canvasOutput');
  context = canvas.getContext("2d");
  markerLabels = JSON.parse(localStorage.getItem('markers'));
  detector = new AR.Detector();
  requestAnimationFrame(tick);
}

const wsConnect = async function() {
  wsUrl = 'ws://localhost:3000';

  const player = new JSMpeg.Player(wsUrl, {
    canvas: video,
    audio: false,
    videoBufferSize: 512 * 1024,
    preserveDrawingBuffer: true,
    disableGl: true,
    onPlay: p => { }
  });
}

// ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  setTimeout(init, 500);
}

document.addEventListener("DOMContentLoaded", () => {
  wsConnect();
});

ipcRenderer.on('useLocalCamera', (event, useLocalCamera) => {
  if (useLocalCamera) { 
    video = document.querySelector('video');
    if (navigator.mediaDevices === undefined) {
      navigator.mediaDevices = {};
    }
    
    if (navigator.mediaDevices.getUserMedia === undefined) {
      navigator.mediaDevices.getUserMedia = function(constraints) {
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
        
        if (!getUserMedia) {
          return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }
  
        return new Promise(function(resolve, reject) {
          getUserMedia.call(navigator, constraints, resolve, reject);
        });
      }
    }
    
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then( (stream) => {
        if ("srcObject" in video) {
          video.srcObject = stream;
        } else {
          video.src = stream;
        }
      })
      .catch(function(err) {
        console.log(err.name + ": " + err.message);
      }
    ); 
  } else {
    video = document.getElementById('video-canvas')
  }
});

function saveImage() {
  const data = canvas.toDataURL(type, quality);
  const img = nativeImage.createFromDataURL(data).toPNG();
  const fileName = 'image-'+ moment().format('M_D_Y-[at]-h_mm_ss_A') + '.png';
  ipcRenderer.send('save_photo', fileName, img)
}

/* Listeners for code block events */
ipcRenderer.on('takePhoto', (event, arg) => {
  saveImage();
});

ipcRenderer.on('startVideo', (event, arg) => {
  recording = false;
  videoControl();
});

ipcRenderer.on('stopVideo', (event, arg) => {
  recording = true;
  videoControl();
});

ipcRenderer.on('saved_file', (event, status) => {
  console.log("Saved file " + status)
})

/* Start and stop video */
function videoControl() {
  if (!recording) {
    const stream = canvas.captureStream(FPS);
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.start();

    document.querySelector("#video-control i").textContent = 'videocam_off';
    recording = true;

    mediaRecorder.ondataavailable = (ev) => {
      chunks.push(ev.data);
    }

    mediaRecorder.onstop = (ev)=>{
      const blob = new Blob(chunks, { 'type' : 'video/mp4;' });
      chunks = [];
      const videoFilename = 'video-'+ moment().format('M_D_Y-[at]-h_mm_ss_A')
      saveBlob(blob, videoFilename);
    }
  } else {
    mediaRecorder.stop();
    document.querySelector("#video-control i").textContent = 'videocam';
    recording = false;
  }
}

function saveBlob(blob, fileName) {
  let reader = new FileReader()
  reader.onload = function() {
      if (reader.readyState == 2) {
          var buffer = new Buffer(reader.result)
          ipcRenderer.send('save_video', fileName, buffer)
          console.log(`Saving ${JSON.stringify({ fileName, size: blob.size })}`)
      }
  }
  reader.readAsArrayBuffer(blob)
}

/* OpenCV AruCo functions */
function tick(){
  requestAnimationFrame(tick);
  
  if (video.readyState === video.HAVE_ENOUGH_DATA){
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    
    var markers = detector.detect(imageData);
    if (markers.length > 0) {
      detectedMarkers = [...new Set(markers)]; 
      drawCorners(detectedMarkers);
      drawId(detectedMarkers);
    } 
  }
}
      
function drawCorners(markers){
  var corners, corner, i, j;

  context.lineWidth = 3;

  for (i = 0; i !== markers.length; ++ i){
    corners = markers[i].corners;
    
    context.strokeStyle = "red";
    context.beginPath();
    
    for (j = 0; j !== corners.length; ++ j){
      corner = corners[j];
      context.moveTo(corner.x, corner.y);
      corner = corners[(j + 1) % corners.length];
      context.lineTo(corner.x, corner.y);
    }

    context.stroke();
    context.closePath();
    
    context.strokeStyle = "green";
    context.strokeRect(corners[0].x - 2, corners[0].y - 2, 4, 4);
  }
}

function drawId(markers){
  var corners, corner, x, y, i, j;
  
  context.strokeStyle = "blue";
  context.lineWidth = 1;
  
  for (i = 0; i !== markers.length; ++ i){
    corners = markers[i].corners;
    
    x = Infinity;
    y = Infinity;
    
    for (j = 0; j !== corners.length; ++ j){
      corner = corners[j];
      
      x = Math.min(x, corner.x);
      y = Math.min(y, corner.y);
    }
    const label = (markerLabels[markers[i].id] != '') ? markerLabels[markers[i].id] : markers[i].id 
    context.strokeText(label, x, y)
  }
}

ipcRenderer.on('updateMarkers', (event, status) => {
  markerLabels = JSON.parse(localStorage.getItem('markers'));
})
