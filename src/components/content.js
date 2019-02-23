import React from "react";

function Content(props) {
  return (
    <div className="instructions-container">
  <div>{props.children}</div>
    </div>
  );
}
export default Content;
