import React, { Component } from "react";
import firebase from "./fireBase";
import { GiChiliPepper } from "react-icons/gi";
import { FiBookOpen } from "react-icons/fi";
import { Image, Row, Col, Container } from "react-bootstrap";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "./RecipePage.css";
class RecipePage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  parseIngredients() {
    this.state.ingredients.split(" ");
    console.log(this.state);
  }
  componentDidMount() {
    this.getRecipeData();
    // if (this.state.ingredients != undefined) {
    //   this.parseIngredients();
    // }
  }
  getRecipeData = () => {
    let path = "/recipes/" + this.props.category + "/" + this.props.recipeName;
    firebase
      .database()
      .ref(path)
      .on("value", snapshot => {
        this.setState(snapshot.val());
      });
  };

  render() {
    let arrayOfIngredients, arrayOfInstructions;
    if (this.state.ingredients != undefined) {
      let ingredients = this.state.ingredients.split(" ");
      arrayOfIngredients = ingredients.map(ing => <li>{ing}</li>);
    }
    if (this.state.recipeInstructions != undefined) {
      let instructions = this.state.recipeInstructions.split("*");
      arrayOfInstructions = instructions.map(inst => <li>{inst}</li>);
    }

    return (
      <div className="main-div">
        {/* className="main-div" */}

        <Image src={this.state.imgUrl} className="image-div" />
        <p>recipe for :&nbsp; {this.state.recipeName} &nbsp;</p>
        <hr />

        <div>
          <GiChiliPepper style={{ float: "left" }} />
          <p>&nbsp; - Ingredients </p>
          <hr />
          <ul className="a">{arrayOfIngredients}</ul>
          <FiBookOpen style={{ float: "left" }} />
          <p>&nbsp; - Directions</p>
          <hr />
          <ul>{arrayOfInstructions}</ul>
        </div>
      </div>
    );
  }
}
export default RecipePage;
