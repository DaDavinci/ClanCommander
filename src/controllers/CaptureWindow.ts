const { desktopCapturer, remote, MenuItem } = require('electron');
const { exit } = require('process');
const { dialog, Menu } = remote;

class CaptureWindow
{

  // Global state
  private mediaRecorder;
  private recordedChunks = [];

  // Button Elements
  public videoElement = document.querySelector('video');
  public canvasElement = document.querySelector('canvas');
  public startBtn = document.getElementById('startBtn');
  public stopBtn = document.getElementById('stopBtn');
  public videoSelectBtn = document.getElementById('selectBtn');

  // Constructor
  public constructor()
  {

    // Button Functionality
    this.stopBtn.hidden = true;
    this.startBtn.hidden = true;

    // Set button EvenHandling
    this.stopBtn.onclick = e => {
      this.mediaRecorder.stop();
      this.startBtn.hidden = false;
      this.stopBtn.hidden = true;
    };

    this.startBtn.onclick = e => {
      this.mediaRecorder.start();
      this.startBtn.hidden = true;
      this.stopBtn.hidden = false;
    };

    // Get videosource ordered list with windows and screen onclick etc.
    this.videoSelectBtn.onclick = this.getVideoSources;
    document.onreadystatechange = this.getVideoSources;

    return this;
  }

  // Get the available video sources
  public getVideoSources = async () =>
  {
    var selectedSource: boolean = false;

    const inputSources = await desktopCapturer.getSources({
      types: ['window']
    });

    inputSources.map(source => {
      var substring: string = source.name.substr(0);
      console.log("source: " + substring + " length: " + substring.length);
      if(substring == "RuneScape" && substring.length == 9){
        selectedSource = true;
        return this.selectSource(source);
      }else{
        console.log("Invalid Source");
      }
    });
  }

  // Change the videoSource window to record
  public selectSource = async (source) =>
  {

    this.videoSelectBtn.innerText = source.name;

    var constraints: any = {
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: 'desktop',
          chromeMediaSourceId: source.id
        }
      }
    };

    // Create a Stream
    var stream = await navigator.mediaDevices.getUserMedia(constraints)
    .then((feed) => {
      // Set buttons hidden
      this.startBtn.hidden = false;
      this.videoSelectBtn.hidden = false;

      // Preview the source in a video element
      if(this.videoElement != undefined){

        this.videoElement.srcObject = feed;

        this.videoElement.onloadedmetadata = (e) => {
          this.videoElement.play();
          this.videoElement.controls = false;
        };
      }else if(this.canvasElement != undefined){

        console.error("Cannot add MediaStream to canvas yet...");
        throw new Error("Cannot add MediaStream to canvas yet...");

      }else{

        console.error("Cannot find element to stream media to...");
        throw new Error("Cannot find element to stream media to...");
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
      console.error("Error Caught: " + e.toString());
      return;
    });

  }

  // Captures all recorded chunks
  private handleDataAvailable = (e) =>
  {
    // Push data to array
    this.recordedChunks.push(e.data);
  }

  // Saves the video file on stop
  private handleStop = async (e) =>
  {
    const blob = new Blob(this.recordedChunks, {
      type: 'video/webm;codecs=vp9,opus'
    });

    const buffer = Buffer.from(await blob.arrayBuffer());

    const { filePath } = await dialog.showSaveDialog({
      buttonLabel: 'Save',
      defaultPath: `${this.videoSelectBtn.innerText.toString()}-${Date.now()}.webm`
    });

    if (filePath) {
      // writeFile(filePath, buffer, () => console.log('video saved successfully (' + filePath.toString() + ')!'));
    }
    this.videoSelectBtn.hidden = false;

  }

}

const captureWindow = new CaptureWindow();