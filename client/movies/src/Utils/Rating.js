import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import PopupMessage from "../Utils/PopupMessage";

export default function Rating({ selectedMovieRating }) {
  const [stars, setStars] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const starNumbers = Array(10).fill(0);

  function handleStarClick(number) {
    setStars(number);
  }

  function handleSubmitRating() {
    if (stars > 0) {
      setShowPopup(true);  
    } else {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 1500);
    }
  }

  return (
    <>
      <h3>
        Actual Rating&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        {starNumbers.map((number, index) => (
          <FaStar
          key={index}
          size={28}
          color={selectedMovieRating >= index + 1 ? "orange" : "gray"}
          />
          ))}
      </h3>
      {!showPopup ? (
        <h3 className="rate-movie-please">Rate Movie Please&nbsp;&nbsp;
          {starNumbers.map((number, index) => (
            <FaStar
            key={index}
            size={28}
            color={stars > index ? "orange" : "gray"}
            onClick={() => handleStarClick(index + 1)}
            />
            ))}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <button className="submit-rating" onClick={() => handleSubmitRating()}>
            Submit Your Rating
          </button>
        </h3>
      ) : (<PopupMessage stars={stars} />)}
    </>
  );
}
