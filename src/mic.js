import React from 'react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

const Dictaphone = (props) => {
  const { transcript,
    } = useSpeechRecognition()
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null
  }

  const sendData = (transcript) => {
      props.text(transcript);
        console.log('Got final result:', transcript);
        
}
const starting =() =>{
    console.log("yalaa")
    SpeechRecognition.startListening({continuous: false});
}
const stopping=() =>{
  console.log("done")
  SpeechRecognition.stopListening();
  sendData(transcript)
}
  return (
    <div>
      <span className="fa fa-microphone text-danger" onClick={starting} aria-hidden="false" aria-label="start speech"></span>
      <span className="fa fa-microphone" onClick={stopping} aria-hidden="false" aria-label="stop"></span> 
  
    </div>
  )
}
export default Dictaphone







