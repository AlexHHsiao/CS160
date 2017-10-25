const os = require('os');
const fs = require('fs');
const spawn = require('child-process-promise').spawn;
const gcs = require('@google-cloud/storage')();

function extractFrame(fileName) {

  const sessionId = 'video-org';
  const fileName = fileName;

  const sourceBucketName = 'sjsu-cs-160.appspot.com';
  const sourceBucket = gcs.bucket(sourceBucketName);
  const tempDir = os.tmpdir();

  sourceBucket.file(sessionId + '/' + fileName).download({
      destination: tempDir + '/' + fileName
    }
  ).then(() => {
    console.log('extract frames');
    console.log(tempDir + '/' + fileName);
    spawn('ffmpeg', ['-i', tempDir + '/' + fileName, tempDir + '/' + 'frame%04d.png']);
  });
}
