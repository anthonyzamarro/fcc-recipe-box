import React, { Component } from "react";
import ReactDOM from "react-dom";
import Content from "./components/content.js";
import ContentRecipe from "./components/contentRecipe.js";
import Sidebar from "./components/sidebar.js";
import SidebarItem from "./components/sidebarItem.js";
import AddRecipe from "./components/addRecipe.js";
import AddModal from "./components/addModal.js";
import DeleteRecipe from "./components/deleteRecipe.js";
import EditRecipe from "./components/editRecipe.js";
import EditModal from "./components/editModal.js";
import "./recipe.scss";
import "./modal.scss";
import "./button.scss";
import "./styles.scss";
import "./mobile.scss";

const defaultRecipes = [
	{
	    recipeId: (Math.random() * 100).toFixed(3).toString(),
	    name: "pizza",
	    ingredients: "dough, cheese, pizza sauce",
	    directions:
	      "preheat oven to 350, roll out dough, add sauce, add cheese, bake for 25 minutes"
	 },
	 {
	    recipeId: (Math.random() * 100).toFixed(3).toString(),
	    name: "scrambeled eggs",
	    ingredients: "eggs, salt, pepper, butter, (cheese)",
	    directions:
	      `cook butter on medium heat in skillet,
	      add beaten eggs,
	      add salt and pepper,
	      cook until eggs become soft,
	      optionally add cheese`
	 },
	 {
	    recipeId: (Math.random() * 100).toFixed(3).toString(),
	    name: "peanut butter and jelly",
	    ingredients: "two slices of bread, crunchy peanut butter, jelly",
	    directions:
	     `spread even amounts of peanut butter and jelly on one slice of bread,
	     place other slice on top of slice with spread`
	 },
	 {
	    recipeId: (Math.random() * 100).toFixed(3).toString(),
	    name: "tuna fish",
	    ingredients: "can of tuna fish, two slices of bread, mayonnaise",
	    directions:
	     `mix tuna and mayonnaise in a bowl,
	     spread mix on one slice of bread,
	     top with other slice of bread`
	 },
	 {
	    recipeId: (Math.random() * 100).toFixed(3).toString(),
	    name: "popcorn",
	    ingredients: "popcorn kernals, canola oil, salt",
	    directions:
	     `in a pot, add oil to high heat,
	     after one minute, add a 1/3 cup of kernals,
	     shake pot so kernals don't burn,
	     when you hear popping has finished remove from heat and pour into large serving bowl,
	     add salt`
	 }
	 ]

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentRecipe: 'Click or add a recipe!',
      recipeToEdit: null,
      addModal: false,
      editModal: false,
      recipeArray: [],
      editValue: ""
    };
  }
  componentDidMount() {
    // If localStorage is empty, then add a recipe by default
    if (
      localStorage.hasOwnProperty("localStorageRecipes") &&
      JSON.parse(localStorage["localStorageRecipes"]).length > 0
    ) {
      this.setState({
        recipeArray: JSON.parse(localStorage["localStorageRecipes"])
      });
    } else {
      this.setState({
        recipeArray: defaultRecipes
      });
      localStorage.setItem('localStorageRecipes', JSON.stringify(defaultRecipes));
    }
  }
  // Format input into list items
  listFormat = text => {
    return text.split(",").map((t, i) => {
      return <li key={i}>{t}</li>;
    });
  };
  displayRecipe = recipeInfo => {
    if (recipeInfo == null) {
      this.setState({
        currentRecipe: null
      });
    } else {
      this.recipeContent = (
        <div className="recipe-display-container">
          <div className="recipe">
            <span className="recipe-label">Name:</span>
            <span className="recipe-name">{recipeInfo.name}</span>
          </div>
          <div className="recipe recipe-ingredients">
            <div className="recipe-label">Ingredients:</div>
            <div className="recipe-directions">
              <ul className="recipe-list">
                {this.listFormat(recipeInfo.ingredients)}
              </ul>
            </div>
          </div>
          <div className="recipe">
            <div className="recipe-label">Directions:</div>
            <div className="recipe-directions">
              <ul className="recipe-list">
                {this.listFormat(recipeInfo.directions)}
              </ul>
            </div>
          </div>
          	<div className="btn-container">
	          {
	            <EditRecipe
	              editDisplay={e => this.editRecipeDisplay(recipeInfo)}
	            />
	          }
	          {<DeleteRecipe del={this.deleteRecipe} currRec={recipeInfo} />}
	        </div>
        </div>
      );
      this.setState({
        currentRecipe: this.recipeContent
      });
    }
  };
  addRecipeDisplay = () => {
    this.setState({
      addModal: !this.state.addModal
    });
  };
  saveNewRecipe = dataFromChild => {
    this.setState({
      recipeArray: this.state.recipeArray.concat([dataFromChild]),
      addModal: false
    });
    if (localStorage["localStorageRecipes"]) {
      let parsed = JSON.parse(localStorage["localStorageRecipes"]);
      // console.log(dataFromChild, localStorage);
      localStorage.setItem(
        "localStorageRecipes",
        JSON.stringify(parsed.concat([dataFromChild]))
      );
    } else {
      localStorage.setItem(
        "localStorageRecipes",
        JSON.stringify(this.state.recipeArray.concat([dataFromChild]))
      );
    }
  };
  deleteRecipe = dataFromChild => {
    let parsedLocalStorage = JSON.parse(localStorage["localStorageRecipes"]);
    // Copy recipe array, find recipe index in array, and splice it out
    let recipeArrayCopy = this.state.recipeArray.slice();
    let indexOfData = recipeArrayCopy.indexOf(dataFromChild);
    recipeArrayCopy.splice(indexOfData, 1);
    this.setState({
      recipeArray: recipeArrayCopy
    });
    let filteredLocalStorage = parsedLocalStorage.filter(item => {
      if (item.recipeId !== dataFromChild.recipeId) {
        return item;
      }
    });
    localStorage.setItem(
      "localStorageRecipes",
      JSON.stringify(filteredLocalStorage)
    );
    // Reset content area
    this.displayRecipe(null);
  };
  editRecipeDisplay = recipeInfo => {
    // Show editModal and pass recipeInfo to be updated
    this.setState({
      editModal: !this.state.editModal,
      recipeToEdit: recipeInfo
    });
  };
  editCurrentRecipe = dataFromChild => {
    // Hide editModal
    this.setState({
      editModal: false
    });
    // Update currently displayed recipe
    this.displayRecipe(dataFromChild);
    let recipeArrayCopy = this.state.recipeArray.slice();
    console.log(localStorage, recipeArrayCopy);
    let editRecipeArray = recipeArrayCopy.filter(recipe => {
      if (recipe.recipeId === dataFromChild.recipeId) {
        recipe.name = dataFromChild.name;
        recipe.ingredients = dataFromChild.ingredients;
        recipe.directions = dataFromChild.directions;
        return recipe;
      }
    });
    let parsedLocalStorage = JSON.parse(localStorage["localStorageRecipes"]);
    let filterSameRecipe = parsedLocalStorage.filter(recipe => {
      if (recipe.recipeId !== dataFromChild.recipeId) return recipe;
    });
    let updateRecipeArray = filterSameRecipe.concat(editRecipeArray);
    localStorage.setItem(
      "localStorageRecipes",
      JSON.stringify(updateRecipeArray)
    );
    console.log(updateRecipeArray, localStorage);
  };
  exitEditDisplay = e => {
    this.setState({
      editModal: e
    });
  };
  exitAddDisplay = e => {
    this.setState({
      addModal: e
    });
  };
  renderListItems = () => {
    return this.state.recipeArray.map((r, i) => {
      return (
        <li key={r.recipeId}>
          <button
            onClick={() => this.displayRecipe(r)}
            className="btn btn-sidebar"
          >
            {r.name}
          </button>
        </li>
      );
    });
  };

  render() {
    return (
      <div className="main">
      <header>
        <h1>Recipe Box</h1>
        <AddRecipe addNewRecipe={e => this.addRecipeDisplay(e)} />
      </header>
        <div className="container">
          <Sidebar>
            <SidebarItem
              sidebarItemClicked={this.displayRecipe}
              recipeItem={this.renderListItems()}
            />
          </Sidebar>
          <Content>
            <ContentRecipe recipe={this.state.currentRecipe} />
          </Content>
        </div>
        {this.state.addModal && (
          <AddModal
            exitDisplay={this.exitAddDisplay}
            saveRecipe={this.saveNewRecipe}
          />
        )}
        {this.state.editModal && (
          <EditModal
            exitDisplay={this.exitEditDisplay}
            editRecipe={this.editCurrentRecipe}
            editValue={this.state.recipeToEdit}
          />
        )}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Main />, rootElement);

/*
get KEY for recipes
https://developer.edamam.com/edamam-docs-recipe-api
*/
