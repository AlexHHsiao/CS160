const os = require('os');
const fs = require('fs');
const spawn = require('child-process-promise').spawn;
const gcs = require('@google-cloud/storage')();
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

function extractFrame() {

  console.log(parseInt('301/1'));
  // const promise = spawn('ffprobe', ['-v', 'error', '-of', 'flat=s=_', '-select_streams',
  //   'v:0', '-show_entries', 'stream=height,width', '/Users/fox/Downloads/test.mp4']);

  // ffmpeg -i test.mp4 2>&1 | sed -n "s/.*, \(.*\) fp.*/\1/p"

  const promise = spawn(ffprobePath, ['-v', 'error', '-select_streams', 'v:0', '-show_entries',
    'stream=avg_frame_rate', '-of', 'default=noprint_wrappers=1:nokey=1', '/Users/fox/Downloads/test.mp4']);

  //const promise = spawn('ffmpeg', ['-i', '/Users/fox/Downloads/test.mp4']);

  const childProcess = promise.childProcess;

  console.log('[spawn] childProcess.pid: ', childProcess.pid);
  childProcess.stdout.on('data', function (data) {
    console.log('[spawn] stdout: ', data.toString());
  });
  childProcess.stderr.on('data', function (data) {
    console.log('[spawn] stderr: ', data.toString());
  });

  promise.then(function () {
    console.log('[spawn] done!');
  })
    .catch(function (err) {
      console.error('[spawn] ERROR: ', err);
    });

}

extractFrame();
