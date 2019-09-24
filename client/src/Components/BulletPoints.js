import React from "react";

const BulletPoints = props => {
  const bulletPointRead = props.bulletPointRead;

  return (
    <>
      <li>
        {" "}
        <a className="bullet-points" href={"#" + bulletPointRead.sectionId}>
          {bulletPointRead.sectionHeader}
        </a>
      </li>
    </>
  );
};

export default BulletPoints;
