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

  return exec('/home/yizhou/CS160/modified_eyeLike/build/bin/./eyeLike');


}

function temPath() {
  console.log(os.tmpdir());
}

extractFrame();
