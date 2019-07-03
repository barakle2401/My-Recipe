import React, { Component } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "./MainPage.css";

function MainPage() {
  let style = {};
  if (window.innerWidth < 500) {
    style.width = "90%";
  }
  return (
    <div className="header">
      <div className="textBox">
        <div className="btns">
          <Link to="/NewRecipeForm">
            <button className="btn pinkBtn">NEW RECIPE</button>
          </Link>
          <Link to="/AllRecipes">
            <button className="btn greenBtn">ALL RECIPES</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
export default MainPage;
