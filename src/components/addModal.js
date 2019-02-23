import React, { Component } from "react";

class AddModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameValue: "",
      ingredientsValue: "",
      directionsValue: ""
    };
    this.sendBackData = this.sendBackData.bind(this);
  }
  sendBackData = evt => {
    evt.preventDefault();
    this.props.saveRecipe({
      recipeId: (Math.random() * 100).toFixed(3),
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
      <div className="modal add-modal-container">
        <span onClick={this.exit}>x</span>
        <div className="modal-header">
          <h3>Add New Recipe</h3>
          <p>
            Add a comma to separate recipe ingredients and recipe directions
          </p>
        </div>
        <div className="modal-content">
          <textarea
            type="text"
            placeholder="recipe name"
            rows="2"
            value={this.state.nameValue}
            onChange={this.handleNameChange}
          />
          <textarea
            type="text"
            placeholder="recipe ingredients"
            rows="5"
            value={this.state.ingredientsValue}
            onChange={this.handleIngredientsChange}
          />
          <textarea
            type="text"
            placeholder="recipe directions"
            rows="5"
            value={this.state.directionsValue}
            onChange={this.handleDirectionsChange}
          />
          <input
            type="submit"
            defaultValue="save"
            onClick={this.sendBackData}
          />
        </div>
      </div>
    );
  }
}
export default AddModal;
