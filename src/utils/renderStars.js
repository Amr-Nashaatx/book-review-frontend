export const renderStars = (rating) => {
  const fullStar = "★";
  const halfStar = "½";
  const emptyStar = "☆";
  const maxRating = 5;

  // Round the rating to the nearest half-star (e.g., 4.3 -> 4.5, 4.1 -> 4.0)
  const roundedRating = Math.round(rating * 2) / 2;

  let starString = "";

  for (let i = 1; i <= maxRating; i++) {
    if (roundedRating >= i) {
      // Full star (e.g., for rating 4.5, i=1, 2, 3, 4 are full stars)
      starString += fullStar;
    } else if (roundedRating >= i - 0.5) {
      // Half star (e.g., for rating 4.5, i=5 is a half star)
      starString += halfStar;
    } else {
      // Empty star
      starString += emptyStar;
    }
  }

  return starString;
};
