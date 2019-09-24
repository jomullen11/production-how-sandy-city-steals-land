import React from "react";

const Article = props => {
  // Both are defined in Home
  const bulletPoints = props.bulletPoints;
  const pageTextDisplay = props.pageTextDisplay;

  return (
    <>
      <fieldset className="mb-3 form-group">
        <legend>Overview</legend>
        <ul>{bulletPoints}</ul>
      </fieldset>

      {pageTextDisplay}
    </>
  );
};

export default Article;
