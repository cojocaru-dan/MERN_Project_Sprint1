import { useState } from "react";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [newUserName, setNewUserName] = useState(null);
  const [newUserReview, setNewUserReview] = useState(null);

  function postReview() {
    if (reviews.find(rev => rev.username === newUserName && rev.userReview === newUserReview) === undefined) {
      setReviews([{username: newUserName, userReview: newUserReview}, ...reviews]);
    }
  }

  return (
    <div className="reviews">
      <h3>Leave a review: </h3><br/>
      <label>Username: </label>
      <input className="username-input" onChange={(e) => setNewUserName(e.target.value)}/><br/><br/>
      <label>Username Review: </label>
      <textarea className="username-review" onChange={(e) => setNewUserReview(e.target.value)}></textarea>&nbsp;&nbsp;&nbsp;&nbsp;
      <button onClick={postReview}>Post Review</button>
      <h3>Reviews</h3>
      {reviews.map((review, idx) => (
        <div key={idx} className="review">
          <h3>{review.username}</h3>
          <h4>{review.userReview}</h4>
        </div>
      ))}
    </div>
  )
}
