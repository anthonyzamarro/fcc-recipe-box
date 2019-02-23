import React, { Component } from "react";

class EditRecipe extends Component {
  sendBackData = evt => {
    evt.preventDefault();
    this.props.edit(this.props.currRec);
  };
  render() {
    return (
      <button onClick={this.props.editDisplay} className="btn btn-edit">
        Edit
      </button>
    );
  }
}
export default EditRecipe;
