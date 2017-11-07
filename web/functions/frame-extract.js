const os = require('os');
const fs = require('fs');
const spawn = require('child-process-promise').spawn;
const exec = require('child-process-promise').exec;
const gcs = require('@google-cloud/storage')();
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

//
// This file is only for testing purpose
//

function extractFrame() {

  console.log('read metadata of video');

  const temDir = '/home/alex/CS160/dlib-19.1/python_examples/video';
  const name = 'alex.hongquan.xiao@gmail.com.mp4';
  let fps;

  const promise = spawn(ffprobePath, ['-v', 'error', '-select_streams', 'v:0', '-show_entries',
    'stream=avg_frame_rate', '-of', 'default=noprint_wrappers=1:nokey=1', temDir + '/' + name]);
  const childProcess = promise.childProcess;

  childProcess.stdout.on('data', function (data) {
    console.log('[spawn] stdout: ', data.toString());
    const fpsArray = data.toString().split('/');
    fps = fpsArray[0] / fpsArray[1];
    console.log(fps);
  });
  childProcess.stderr.on('data', function (data) {
    console.log('[spawn] stderr: ', data.toString());
  });


}

function temPath() {
  console.log(os.tmpdir());
}

extractFrame();
