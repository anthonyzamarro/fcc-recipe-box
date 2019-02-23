import React from "react";

function AddItem(props) {
  return (
    <button onClick={props.addNewRecipe} className="btn btn-add">
      Add Recipe
    </button>
  );
}
export default AddItem;
