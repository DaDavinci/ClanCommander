const { desktopCapturer, remote, MenuItem } = require('electron');
const { exit } = require('process');
const { dialog, Menu } = remote;

// Global state
let mediaRecorder;
const recordedChunks = [];

// Button Elements
const videoElement = document.querySelector('video');
const canvasElement = document.querySelector('canvas');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const videoSelectBtn = document.getElementById('selectBtn');

// Button Functionality
stopBtn.hidden = true;
startBtn.hidden = true;

startBtn.onclick = e => {
  mediaRecorder.start();
  startBtn.hidden = true;
  stopBtn.hidden = false;
};

stopBtn.onclick = e => {
  mediaRecorder.stop();
  startBtn.hidden = false;
  stopBtn.hidden = true;
};

// Get videosource ordered list with windows and screen onclick etc.
videoSelectBtn.onclick = getVideoSources;
document.onreadystatechange = getVideoSources;

// Get the available video sources
async function getVideoSources() {
  const selectedSource: boolean = false;

  const inputSources = await desktopCapturer.getSources({
    types: ['window']
  });

  inputSources.map(source => {
    var substring: string = source.name.substr(0);
    console.log("source: " + substring + " length: " + substring.length);
    if(substring == "RuneScape" && substring.length == 9){
      this.selectedSource = true;
      return selectSource(source);
    }else{
      console.log("Invalid Source");
    }
  });
}

// Change the videoSource window to record
async function selectSource(source) {

  videoSelectBtn.innerText = source.name;

  // ClanConsole.appendMessage("Capturing Source: " + source.name.toString());

  const constraints: any = {
    audio: false,
    video: {
      mandatory: {
        chromeMediaSource: 'desktop',
        chromeMediaSourceId: source.id
      }
    }
  };

  // Create a Stream
  const stream = await navigator.mediaDevices.getUserMedia(constraints)
  .then((feed) => {
    // Set buttons hidden
    startBtn.hidden = false;
    videoSelectBtn.hidden = false;

    // Preview the source in a video element
    if(videoElement != undefined){
      // videoElement.srcObject = feed;
      videoElement.srcObject = feed;
      // videoElement.src = URL.createObjectURL(feed);

      videoElement.onloadedmetadata = (e) => {
        videoElement.play();
        videoElement.controls = false;
      };

    }else if(canvasElement != undefined){
      console.log("Cannot add MediaStream to canvas yet... Find out how.");
    }else{
      console.log("Cannot find element to stream media to...");
    }

    // Add a way to Crop the video Element with SourceBufffer


    //@TODO Preview a cropped source in a canvas element and test image manipulation like drawing boxes to crop further.
    //@TODO Convert live feed so it can be used inside a canvas, i dont know if live recording works...

    // Create the Media Recorder with options.
    // const options = { mimeType: 'video/webm;codecs=vp9,opus' };
    // mediaRecorder = new mediaRecorder(feed, options);

    // Register Event Handlers
    // mediaRecorder.ondataavailable = handleDataAvailable;
    // mediaRecorder.onstop = handleStop;
  })
  .catch((e) => {
    // ClanConsole.appendMessage("Error caught: " + e.toString());
    console.log("Error Caught: " + e.toString());
    return;
  });

}

// Captures all recorded chunks
function handleDataAvailable(e) {
  // ClanConsole.appendMessage('Video Data: ' + e.data.toString());
  recordedChunks.push(e.data);
}

// Saves the video file on stop
async function handleStop(e) {
  const blob = new Blob(recordedChunks, {
    type: 'video/webm;codecs=vp9,opus'
  });

  const buffer = Buffer.from(await blob.arrayBuffer());

  const { filePath } = await dialog.showSaveDialog({
    buttonLabel: 'Save',
    defaultPath: `${videoSelectBtn.innerText.toString()}-${Date.now()}.webm`
  });

  if (filePath) {
    // writeFile(filePath, buffer, () => console.log('video saved successfully (' + filePath.toString() + ')!'));
  }
  videoSelectBtn.hidden = false;

}