import React, { Component } from "react";

class EditModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: this.props.editValue.name,
      ingredientsValue: this.props.editValue.ingredients,
      directionsValue: this.props.editValue.directions
    };
  }
  sendBackData = evt => {
    evt.preventDefault();
    this.props.editRecipe({
      recipeId: this.props.editValue.recipeId,
      name: this.state.nameValue,
      ingredients: this.state.ingredientsValue,
      directions: this.state.directionsValue
    });
  };
  handleNameChange = event => {
    this.setState({ nameValue: event.target.value });
  };
  handleIngredientsChange = event => {
    this.setState({ ingredientsValue: event.target.value });
  };
  handleDirectionsChange = event => {
    this.setState({ directionsValue: event.target.value });
  };
  exit = () => {
    this.props.exitDisplay(false);
  };
  render() {
    return (
      <div className="modal edit-modal-container">
      <span onClick={this.exit}>x</span>
      <div className="modal-header">
        <h3>Edit {this.props.editValue.name}</h3>
        <p>Add a comma to separate recipe ingredients and recipe directions</p>
      </div>
        <div className="modal-content">
          <textarea
            type="text"
            rows="2"
            placeholder="recipe name"
            value={this.state.nameValue}
            onChange={this.handleNameChange}
          />
          <textarea
            type="text"
            rows="5"
            placeholder="recipe ingredients"
            value={this.state.ingredientsValue}
            onChange={this.handleIngredientsChange}
          />
          <textarea
            type="text"
            rows="5"
            placeholder="recipe directions"
            value={this.state.directionsValue}
            onChange={this.handleDirectionsChange}
          />
          <input type="submit" defaultValue="save" onClick={this.sendBackData} />
        </div>
      </div>
    );
  }
}
export default EditModal;
