import React, { Component } from "react";
import "./Recipe.css";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import { BrowserRouter as Router, Link } from "react-router-dom";
class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = { hovered: false };
  }
  array = Object.values(this.props.recipe).map(recipe => {
    let path = "RecipePage/" + recipe.category + "/" + recipe.recipeName;
    return (
      // { md="4"}
      <div>
        <MDBCol>
          <Link to={path}>
            <div className="recipe-div">
              <img
                src={recipe.imgUrl}
                className="img-fluid"
                alt={recipe.recipeName}
              />
              <div className="centered">{recipe.recipeName}</div>
            </div>
          </Link>
          <hr />
        </MDBCol>
      </div>
    );
  });
  render() {
    return (
      <MDBContainer>
        <div className="img-fluid">{this.array}</div>{" "}
      </MDBContainer>
    );
  }
}
export default Recipe;
{
  /* <MDBRow md="4">{array}</MDBRow>; */
}
