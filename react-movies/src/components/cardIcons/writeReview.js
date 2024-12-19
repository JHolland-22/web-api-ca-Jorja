import React from "react";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { Link } from "react-router-dom";

const WriteReviewIcon = ({ movie }) => {
  return (
    // Link component from react-router-dom to navigate to the review form
    <Link
      to={`/reviews/form`} // Navigate to the review form page
      state={{
        movieId: movie.id, // Pass the movie ID to the review form as state
      }}
    >
      {/* RateReviewIcon component to represent the "Write Review" action */}
      <RateReviewIcon color="primary" fontSize="large" />
    </Link>
  );
};

export default WriteReviewIcon;
