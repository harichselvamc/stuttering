// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
// import './TipsResources.css';  // Custom CSS for styling the puzzle cards and navbar
// import { Container, Card, Row, Col, Button, Spinner, Navbar, Nav } from 'react-bootstrap';

// function TipsResources() {
//   const [quotes, setQuotes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [flippedCards, setFlippedCards] = useState({});  // Track which cards are flipped
//   const navigate = useNavigate();  // Hook to navigate

//   // Function to fetch 10 Ron Swanson quotes
//   const fetchQuotes = async () => {
//     try {
//       const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes/10');
//       const data = await response.json();
//       setQuotes(data);
//       setLoading(false);
//     } catch (error) {
//       console.error("Error fetching quotes:", error);
//       setLoading(false);
//     }
//   };

//   // Fetch quotes when the component mounts
//   useEffect(() => {
//     fetchQuotes();
//   }, []);

//   // Handle flipping the card
//   const handleCardFlip = (index) => {
//     setFlippedCards((prevFlippedCards) => ({
//       ...prevFlippedCards,
//       [index]: !prevFlippedCards[index],  // Toggle the flipped state
//     }));
//   };

//   return (
//     <div>
//       {/* Navbar for navigation */}
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Navbar.Brand href="#">Tips & Resources</Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ml-auto">
//             <Nav.Link href="/breathing">Breathing Exercise</Nav.Link>
//             <Nav.Link href="/speech">Speech Practice</Nav.Link>
//             <Nav.Link href="/resources">Tips & Resources</Nav.Link>
//             <Nav.Link href="/user">Home</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Navbar>

//       <Container className="my-5">
//         {loading ? (
//           <div className="text-center">
//             <Spinner animation="border" role="status">
//               <span className="visually-hidden">Loading...</span>
//             </Spinner>
//           </div>
//         ) : (
//           <Row>
//             {/* Map over the quotes and display each in a puzzle-like flipping card */}
//             {quotes.map((quote, index) => (
//               <Col md={6} lg={4} key={index} className="mb-4">
//                 <div
//                   className={`quote-card-container ${flippedCards[index] ? 'flipped' : ''}`}
//                   onClick={() => handleCardFlip(index)}
//                 >
//                   <div className="quote-card">
//                     <div className="quote-card-front">
//                       <h5 className="quote-title">Click to Reveal Quote</h5>
//                     </div>
//                     <div className="quote-card-back">
//                       <Card.Text className="quote-text">"{quote}"</Card.Text>
//                     </div>
//                   </div>
//                 </div>
//               </Col>
//             ))}
//           </Row>
//         )}

        
//       </Container>
//     </div>
//   );
// }

// export default TipsResources;


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './TipsResources.css';
import { Container, Card, Row, Col, Button, Spinner, Navbar, Nav } from 'react-bootstrap';

function TipsResources() {
  const [quotes, setQuotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPlaylistIndex, setCurrentPlaylistIndex] = useState(null);  // Index of the card clicked for playlist
  const navigate = useNavigate(); 

  const playlists = [
    "https://www.youtube.com/embed/videoseries?list=PL1IW-5upaaNeo2pGxtU3MIxNvTxVxcb8K",
    "https://www.youtube.com/embed/videoseries?list=PL1IW-5upaaNcrvYknpewLClKepxlnWKbX",
    "https://www.youtube.com/embed/videoseries?list=PL1IW-5upaaNdI_gsVLjVlRaH9AdUDOjXr",
    "https://www.youtube.com/embed/videoseries?list=PL1IW-5upaaNe65beBjBn9kgukQ28vhki1",
    "https://www.youtube.com/embed/videoseries?list=PL1IW-5upaaNdu0fMIpR_FMM8iZKq9FoIx"
  ];

  const fetchQuotes = async () => {
    try {
      const response = await fetch('https://ron-swanson-quotes.herokuapp.com/v2/quotes/10');
      const data = await response.json();
      setQuotes(data.slice(0, playlists.length));  // Ensure the quotes match the number of playlists
      setLoading(false);
    } catch (error) {
      console.error("Error fetching quotes:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  const handleCardClick = (index) => {
    setCurrentPlaylistIndex(index);
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand href="#">Tips & Resources</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/breathing">Breathing Exercise</Nav.Link>
            <Nav.Link href="/speech">Speech Practice</Nav.Link>
            <Nav.Link href="/resources">Tips & Resources</Nav.Link>
            <Nav.Link href="/user">Home</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="my-5">
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <Row>
            {quotes.map((quote, index) => (
              <Col md={6} lg={4} key={index} className="mb-4">
                <Card onClick={() => handleCardClick(index)} className="h-100">
                  <Card.Body>
                    <Card.Title>Quote #{index + 1}</Card.Title>
                    <Card.Text>{quote}</Card.Text>
                  </Card.Body>
                  {currentPlaylistIndex === index && (
                    <div className="embed-responsive embed-responsive-16by9 mt-3">
                      <iframe
                        className="embed-responsive-item"
                        src={playlists[index]}
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </Container>
    </div>
  );
}

export default TipsResources;
