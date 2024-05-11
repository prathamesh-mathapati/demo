import React, { useState } from "react";
import "./style.scss";

let SpeechRecognition =
  window.SpeechRecognition ||
  window.webkitSpeechRecognition ||
  window.speechSynthesis;

let mic = new SpeechRecognition();

mic.continuous = true;
mic.interimResults = true;
mic.lang = "en-US";
mic.crossBrowser = true;

const SpeechToText = () => {
  const [transcript, setTranscript] = useState("");

  const startRecording = () => {
    // mic.onresult = (event) => {
    //   const speechToText = event.results[0][0].transcript;
    //   setTranscript(speechToText);
    // };
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(transcript);
      console.log(transcript);
    };
    // mic.start();
  };
  const stopRecording = () => {
    mic.stop();
  };

  return (
    <div className="button-container">
      <button className="button" onClick={startRecording}>
        Start Listening
      </button>
      <button className="button" onClick={stopRecording}>
        Stop Listening
      </button>
      <p>{transcript}</p>
    </div>
  );
};

export default SpeechToText;
