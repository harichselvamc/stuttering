// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
// // import './SpeechPractice.css';  // Import the custom CSS for styling
// // import { Container, Button, Card, Navbar, Nav } from 'react-bootstrap';
// // import { FaMicrophone, FaStop } from 'react-icons/fa';  // Import icons for mic and stop

// // function SpeechPractice() {
// //   const [audioUrl, setAudioUrl] = useState(null);
// //   const [mediaRecorder, setMediaRecorder] = useState(null);
// //   const [isRecording, setIsRecording] = useState(false);
// //   const [poetry, setPoetry] = useState([]);  // Store the poetry lines from the API
// //   const [currentIndex, setCurrentIndex] = useState(0);  // Track the current poetry index

// //   const navigate = useNavigate();  // Hook to navigate

// //   // Fetch data from the Poetry API
// //   useEffect(() => {
// //     fetch('https://poetrydb.org/linecount/5')
// //       .then(response => response.json())
// //       .then(data => setPoetry(data))
// //       .catch(error => console.error('Error fetching poetry:', error));
// //   }, []);

// //   const startRecording = () => {
// //     navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
// //       const recorder = new MediaRecorder(stream);
// //       recorder.ondataavailable = (e) => {
// //         const url = URL.createObjectURL(e.data);
// //         setAudioUrl(url);
// //       };
// //       recorder.start();
// //       setMediaRecorder(recorder);
// //       setIsRecording(true);
// //     });
// //   };

// //   const stopRecording = () => {
// //     mediaRecorder.stop();
// //     setIsRecording(false);
// //   };

// //   const showNextPoetry = () => {
// //     setCurrentIndex((prevIndex) => (prevIndex + 1) % poetry.length);
// //   };

// //   return (
// //     <div>
// //       {/* Navbar for Navigation */}
// //       <Navbar bg="dark" variant="dark" expand="lg">
// //         <Navbar.Brand href="#">Speech Practice</Navbar.Brand>
// //         <Navbar.Toggle aria-controls="basic-navbar-nav" />
// //         <Navbar.Collapse id="basic-navbar-nav">
// //           <Nav className="ml-auto">
// //             <Nav.Link href="/breathing">Breathing Exercise</Nav.Link>
// //             <Nav.Link href="/speech">Speech Practice</Nav.Link>
// //             <Nav.Link href="/tips">Tips & Resources</Nav.Link>
// //             <Nav.Link href="/user">Home</Nav.Link>
          

          
// //           </Nav>
// //         </Navbar.Collapse>
// //       </Navbar>

// //       <Container className="speech-container text-center my-5">
// //         <Card className="speech-card">
// //           <Card.Body>
// //             <Card.Title className="speech-title">Mimic and Record</Card.Title>

// //             {/* Display current poetry line */}
// //             {poetry.length > 0 && (
// //               <Card.Text className="poetry-text">
// //                 {poetry[currentIndex].lines.join(' ')}
// //               </Card.Text>
// //             )}

// //             {/* Button to fetch next poetry */}
// //             <Button variant="info" className="mt-3" onClick={showNextPoetry}>
// //               Show Next Text
// //             </Button>

// //             {/* Recording buttons */}
// //             <Button 
// //               variant={isRecording ? 'danger' : 'success'} 
// //               className="mic-btn mt-3"
// //               onClick={isRecording ? stopRecording : startRecording}
// //             >
// //               {isRecording ? <FaStop /> : <FaMicrophone />}
// //               {isRecording ? ' Stop Recording' : ' Start Recording'}
// //             </Button>

// //             {/* Audio playback and delete recording */}
// //             {audioUrl && (
// //               <div className="mt-4">
// //                 <audio controls src={audioUrl} className="w-100 speech-audio"></audio>
// //                 <Button variant="warning" className="mt-2" onClick={() => setAudioUrl(null)}>
// //                   Delete Recording
// //                 </Button>
// //               </div>
// //             )}
// //           </Card.Body>
// //         </Card>

        
// //       </Container>
// //     </div>
// //   );
// // }

// // export default SpeechPractice;

// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import './SpeechPractice.css';
// import { Container, Button, Card, Navbar, Nav, Alert } from 'react-bootstrap';
// import { FaMicrophone, FaStop } from 'react-icons/fa';

// function SpeechPractice() {
//   const [audioUrl, setAudioUrl] = useState(null);
//   const [isRecording, setIsRecording] = useState(false);
//   const [poetry, setPoetry] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [transcript, setTranscript] = useState('');
//   const [comparisonResult, setComparisonResult] = useState('');

//   const navigate = useNavigate();
//   const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
//   const recognition = new speechRecognition();
//   recognition.continuous = true;
//   recognition.lang = 'en-US';

//   useEffect(() => {
//     fetch('https://poetrydb.org/linecount/5')
//       .then(response => response.json())
//       .then(data => setPoetry(data))
//       .catch(error => console.error('Error fetching poetry:', error));
//   }, []);

//   const startRecording = () => {
//     recognition.start();
//     setIsRecording(true);
//     recognition.onresult = (event) => {
//       const currentTranscript = Array.from(event.results)
//         .map(result => result[0].transcript)
//         .join('');
//       setTranscript(currentTranscript);
//       compareText(currentTranscript, poetry[currentIndex].lines.join(' '));
//     };
//   };

//   const stopRecording = () => {
//     recognition.stop();
//     setIsRecording(false);
//   };

//   const showNextPoetry = () => {
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % poetry.length);
//   };

//   const compareText = (spokenText, writtenText) => {
//     const wordsSpoken = spokenText.toLowerCase().split(' ');
//     const wordsWritten = writtenText.toLowerCase().split(' ');
//     const comparison = wordsWritten.map(word => wordsSpoken.includes(word) ? word : `<span style="color: red;">${word}</span>`);
//     setComparisonResult(comparison.join(' '));
//   };

//   return (
//     <div>
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Navbar.Brand href="#">Speech Practice</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto">
//             <Nav.Link href="/breathing">Breathing Exercise</Nav.Link>
//             <Nav.Link href="/speech">Speech Practice</Nav.Link>
//             <Nav.Link href="/tips">Tips & Resources</Nav.Link>
//             <Nav.Link href="/user">Home</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>

//       <Container className="speech-container text-center my-5">
//         <Card className="speech-card">
//           <Card.Body>
//             <Card.Title className="speech-title">Mimic and Record</Card.Title>
//             {poetry.length > 0 && (
//               <Card.Text className="poetry-text">
//                 {poetry[currentIndex].lines.join(' ')}
//               </Card.Text>
//             )}
//             <Button variant="info" className="mt-3" onClick={showNextPoetry}>
//               Show Next Text
//             </Button>
//             <Button 
//               variant={isRecording ? 'danger' : 'success'} 
//               className="mic-btn mt-3"
//               onClick={isRecording ? stopRecording : startRecording}
//             >
//               {isRecording ? <FaStop /> : <FaMicrophone />}
//               {isRecording ? ' Stop Recording' : ' Start Recording'}
//             </Button>
//             {transcript && (
//               <Alert variant="secondary" className="mt-3">
//                 <div dangerouslySetInnerHTML={{ __html: comparisonResult }} />
//               </Alert>
//             )}
//           </Card.Body>
//         </Card>
//       </Container>
//     </div>
//   );
// }

// export default SpeechPractice;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './SpeechPractice.css';
import { Container, Button, Card, Navbar, Nav, Alert } from 'react-bootstrap';
import { FaMicrophone, FaStop, FaVolumeUp } from 'react-icons/fa';

function SpeechPractice() {
  const [audioUrl, setAudioUrl] = useState(null);
  const [isRecording, setIsRecording] = useState(false);
  const [poetry, setPoetry] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [transcript, setTranscript] = useState('');
  const [comparisonResult, setComparisonResult] = useState('');

  const navigate = useNavigate();
  const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new speechRecognition();
  recognition.continuous = true;
  recognition.lang = 'en-US';

  useEffect(() => {
    fetch('https://poetrydb.org/linecount/5')
      .then(response => response.json())
      .then(data => setPoetry(data))
      .catch(error => console.error('Error fetching poetry:', error));
  }, []);

  const startRecording = () => {
    recognition.start();
    setIsRecording(true);
    recognition.onresult = (event) => {
      const currentTranscript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');
      setTranscript(currentTranscript);
      compareText(currentTranscript, poetry[currentIndex].lines.join(' '));
    };
  };

  const stopRecording = () => {
    recognition.stop();
    setIsRecording(false);
  };

  const showNextPoetry = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % poetry.length);
  };

  const compareText = (spokenText, writtenText) => {
    const wordsSpoken = spokenText.toLowerCase().split(' ');
    const wordsWritten = writtenText.toLowerCase().split(' ');
    const comparison = wordsWritten.map(word => wordsSpoken.includes(word) ? word : `<span style="color: red;">${word}</span>`);
    setComparisonResult(comparison.join(' '));
  };

  // Function to speak the poetry text
  const speakPoetry = () => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(poetry[currentIndex].lines.join(' '));
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Text-to-speech is not supported in this browser.');
    }
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#">Speech Practice</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/breathing">Breathing Exercise</Nav.Link>
            <Nav.Link href="/speech">Speech Practice</Nav.Link>
            <Nav.Link href="/tips">Tips & Resources</Nav.Link>
            <Nav.Link href="/user">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="speech-container text-center my-5">
        <Card className="speech-card">
          <Card.Body>
            <Card.Title className="speech-title">Mimic and Record</Card.Title>
            {poetry.length > 0 && (
              <Card.Text className="poetry-text">
                {poetry[currentIndex].lines.join(' ')}
              </Card.Text>
            )}
            <Button variant="info" className="mt-3" onClick={showNextPoetry}>
              Show Next Text
            </Button>
            <Button 
              variant={isRecording ? 'danger' : 'success'} 
              className="mic-btn mt-3"
              onClick={isRecording ? stopRecording : startRecording}
            >
              {isRecording ? <FaStop /> : <FaMicrophone />}
              {isRecording ? ' Stop Recording' : ' Start Recording'}
            </Button>
            <Button 
              variant="primary" 
              className="mt-3 ml-3" 
              onClick={speakPoetry}
            >
              <FaVolumeUp /> Listen to Poetry
            </Button>
            {transcript && (
              <Alert variant="secondary" className="mt-3">
                <div dangerouslySetInnerHTML={{ __html: comparisonResult }} />
              </Alert>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default SpeechPractice;
