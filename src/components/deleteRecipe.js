import React, { Component } from "react";

class DeleteItem extends Component {
  sendBackData = evt => {
    evt.preventDefault();
    this.props.del(this.props.currRec);
  };
  render() {
    return (
      <button onClick={this.sendBackData} className="btn btn-delete">
        X
      </button>
    );
  }
}
export default DeleteItem;
