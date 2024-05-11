import React, { useState } from "react";
import "./style.scss";
import { ReactMic } from "react-mic";
import { Button, ProgressBar } from "react-bootstrap";
import { FaMicrophoneAlt } from "react-icons/fa";

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
  const [timerSeconds, setTimerSeconds] = React.useState(40);
  const [recordedSeconds, setRecordedSeconds] = React.useState(40);
  const [timerSecondsForprogress, setTimerSecondsForprogress] =
    React.useState(100);

  // Audio recorder States
  const [audioRecorder, setAudioRecorder] = React.useState("");
  const [statusAction, setActionStatus] = React.useState("Recording..");

  // Handle blob data
  const [blobURL, setBlobURL] = React.useState("");
  const [recordedBlobData, setRecordedBlobData] = React.useState("");
  const userDetails = JSON.parse(localStorage.getItem("userInfo"));

  let [pauseArry, setPauseArry] = useState([]);
  // For Handle timeOut alert modal
  const [showAlert, setShowAlert] = React.useState(false);

  const startRecording = () => {
    mic.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map((result) => result[0])
        .map((result) => result.transcript)
        .join("");
      setTranscript(transcript);
      console.log(transcript);
    };
    mic.start();
  };
  const stopRecording = () => {
    mic.stop();
  };
  const onData = () => {};
  const onStop = async (recordedBlob) => {
    let blob = await fetch(recordedBlob.blobURL).then((r) => r.blob());

    setRecordedBlobData(recordedBlob);
    // var blobUrl = URL.createObjectURL(blob);

    // var xhr = new XMLHttpRequest();
    // xhr.responseType = "blob";

    // xhr.onload = function () {
    //   var recoveredBlob = xhr.response;

    //   var reader = new FileReader();

    //   reader.onload = function () {
    //     var blobAsDataUrl = reader.result;
    //   };

    //   reader.readAsDataURL(recoveredBlob);
    // };

    // xhr.open("GET", blobUrl);
    // xhr.send();
    setBlobURL(blob);
    let startTime = recordedBlob.startTime;
    let stopTime = recordedBlob.stopTime;
    let dd = (stopTime - startTime) / 1000;
  
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
      <div className="read-aloud-question">
        <div
          className="answer-main-wrap"
          style={
            userDetails.type === "custom"
              ? { height: "180px" }
              : { height: "150px" }
          }
        >
          <>
            <div className="cards-body">
              <p>
                Current Status: <span>Answer {statusAction}.</span>
              </p>
              <div className="progrss-bar-mic-pm">
                {userDetails.type === "custom" && (
                  <div className="mic-icon-main">
                    {" "}
                    <FaMicrophoneAlt className="mic-icon" />
                  </div>
                )}

                {/* <ProgressBar className="Progress-bar" now={audioRecorder} /> */}
              </div>
              <div className="Recorded-Timer">
                {recordedSeconds > 9 ? recordedSeconds : "0" + recordedSeconds}{" "}
                Seconds Recorded.
              </div>
            </div>

          
            {userDetails.type === "custom" && (
              <Button
                className="skip-btn"
                variant="primary"
                // onClick={() => handleAnswerAnalysis("Next")}
              >
                <span>Stop</span>
              </Button>
            )}
          </>
        </div>
        {userDetails.type === "custom" && timerSecondsForprogress !== 0 ? (
          <div
            className="progress-bar-pm"
            style={{ width: "100%", background: "white", height: "5px" }}
          >
            <div
              style={{
                width: `${timerSecondsForprogress}%`,
                background: "#049b40",
                height: "5px",
              }}
              className={`${
                timerSecondsForprogress !== 100 && "transintion-time"
              }`}
            ></div>
          </div>
        ) : (
          ""
        )}

        <div className="question-container">
          <h3>
            Advertisements are a very powerful medium for any announcement or
            for any information that reaches the maximum number of people. Types
            of advertisements are classified and General. Classified
            advertisements are very much like notices, only the content
            different and no designs are allowed. It’s short and to the point.
            Advertisers only mention the main content, contact, address and
            telephone number to reach the customer.
          </h3>
          {/* { questionsData[selectedQautionIndex]?.questions} */}
        </div>
      </div>
    </div>
  );
};

export default SpeechToText;
