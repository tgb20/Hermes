
let videoCanvas;
let player;

async function init() {
  videoCanvas = document.getElementById('video-canvas');
}


const wsConnect = async function() {
  wsUrl = 'ws://localhost:3000';

  player = new JSMpeg.Player(wsUrl, {
    canvas: videoCanvas,
    audio: false,
    videoBufferSize: 512 * 1024,
    preserveDrawingBuffer: true,
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
