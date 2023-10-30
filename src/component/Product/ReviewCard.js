import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
    size: "medium",
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.reviewerName}</p>
      <Rating {...options} name="unique-name" />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;
