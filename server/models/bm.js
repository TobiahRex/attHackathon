'use strict';

const express = require('express');
const router = express.Router();
const watson = require('watson-developer-cloud');
const fs = require('fs');
const path = require('path');

const Message = require('./message');

var speech_to_text = watson.speech_to_text({
  url: "https://stream.watsonplatform.net/speech-to-text/api",
  username: '59381f31-9e8e-46f6-b660-8aa0c710011e',
  password: '606uZwzdlfgA',
  version: 'v1'
});


function speechToText(human, cb) {

  let file = path.join(__dirname, `../../audio-files/${human}`);

  var params = {
    audio: fs.createReadStream(file),
    content_type: 'audio/flac',
    timestamps: true,
    word_alternatives_threshold: 0.9,
    continuous: true
  };

  speech_to_text.recognize(params, function(error, transcript) {
    if (error) return cb(error);

    Message.toString(transcript.results[0].alternatives[0].transcript, (err, yoda) => {
      if(err) return cb(err);
      return cb(null, yoda);
    });
  });
}





module.exports = speechToText;
