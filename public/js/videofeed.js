var nativeImage = require('electron').nativeImage
var moment = require('moment');
let player;
let video, canvas, context, src, dst, dictionary, markerIds, markerCorners, parameter;
let height, width;
const FPS = 20;
const type = 'image/png';
const quality = 9;

// opencv.js build from https://github.com/ganwenyao/opencv_js
var cv = require('./js/opencv.js')

let recording = false;
let mediaRecorder;
let chunks = [];

async function init() {
  video = document.getElementById('video-canvas');
  canvas = document.getElementById('canvasOutput');
}

const wsConnect = async function() {
  wsUrl = 'ws://localhost:3000';

  player = new JSMpeg.Player(wsUrl, {
    canvas: video,
    audio: false,
    videoBufferSize: 512 * 1024,
    preserveDrawingBuffer: true,
    disableGl: true,
    onPlay: p => {
    }
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

cv['onRuntimeInitialized']=()=>{
};

function initOpenCV() {
  width = video.width;
  height = video.height;
  context = video.getContext("2d");
  src = new cv.Mat(height, width, cv.CV_8UC4);
  dst = new cv.Mat(height, width, cv.CV_8UC3);
  dictionary = new cv.Dictionary(cv.DICT_6X6_250);
  markerIds = new cv.Mat();
  markerCorners  = new cv.MatVector();
  parameter = new cv.DetectorParameters();

  parameter.adaptiveThreshWinSizeMax = 23;
  parameter.adaptiveThreshWinSizeStep = 10,
  parameter.adaptiveThreshConstant = 7;
  parameter.minMarkerPerimeterRate = 0.1;
  parameter.maxMarkerPerimeterRate = 4;
  parameter.polygonalApproxAccuracyRate = 0.03;
  parameter.minCornerDistanceRate = 0.05;
  parameter.minDistanceToBorder = 3;
  parameter.minMarkerDistanceRate = 0.05;
  parameter.cornerRefinementMethod = cv.CORNER_REFINE_NONE;
  parameter.cornerRefinementWinSize = 5;
  parameter.cornerRefinementMaxIterations = 30;
  parameter.cornerRefinementMinAccuracy = 0.1;
  parameter.markerBorderBits = 1;
  parameter.perspectiveRemovePixelPerCell = 2;
  parameter.perspectiveRemoveIgnoredMarginPerCell = 0.13;
  parameter.maxErroneousBitsInBorderRate = 0.35;
  parameter.minOtsuStdDev = 5.0;
  parameter.errorCorrectionRate = 0.6;

  // schedule first one.
  setTimeout(processVideo, 0);
}

function processVideo() {
  if (opencv) {
    let begin = Date.now();
    context.drawImage(video, 0, 0, width, height);
    src.data.set(context.getImageData(0, 0, width, height).data);
    cv.cvtColor(src, dst, cv.COLOR_RGBA2RGB, 0);
    cv.detectMarkers(dst, dictionary, markerCorners, markerIds, parameter);
    if (markerIds.rows > 0) {
        cv.drawDetectedMarkers(dst, markerCorners, markerIds);
    }
    cv.imshow("canvasOutput", dst); 
    // schedule next one.
    let delay = 1000/FPS - (Date.now() - begin);
    setTimeout(processVideo, delay);
  }
}

function saveImage() {
  let data;
  if (opencv) {
    data = canvas.toDataURL(type, quality);
  } else {
    data = video.toDataURL(type, quality);
  }
  const img = nativeImage.createFromDataURL(data).toPNG();
  const fileName = 'image-'+ moment().format('M_D_Y-[at]-h_mm_ss_A') + '.png';
  ipcRenderer.send('save_photo', fileName, img)
}

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

function videoControl() {
  let stream;
  if (!recording) {
    if (opencv) {
      stream = canvas.captureStream(FPS);
    } else {
      stream = video.captureStream(FPS)
    }
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

ipcRenderer.on('saved_file', (event, status) => {
  console.log("Saved file " + status)
})

