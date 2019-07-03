import React, { Component } from "react";
import Alert from "react-s-alert";
import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBFormInline,
  MDBAlert
} from "mdbreact";
import { Redirect } from "react-router";
import Spinner from "react-bootstrap/Spinner";
import firebase from "./fireBase";
import FileUploader from "react-firebase-file-uploader";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import "./NewRecipeForm.css";
class NewRecipeForm extends Component {
  constructor() {
    super();
    let endOfProcess = false;
    this.state = {
      recipeName: "",
      ingredients: "",
      radio: "easy",
      firstStep: "",
      secondStep: "",
      thirdStep: "",
      recipeInstructions: "",
      category: "",
      imgUrl: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUploadSuccess = this.handleUploadSuccess.bind(this);
    this.handleUploadError = this.handleUploadError.bind(this);
    this.handleUploadStart = this.handleUploadStart.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
  }
  onClick = nr => () => {
    this.setState({
      radio: nr
    });
  };

  async handleSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    if (this.state.isUploading) {
      return;
    }

    await this.setState({ isUploading: null });
    firebase
      .database()
      .ref("recipes/" + this.state.category + "/" + this.state.recipeName)
      .set(this.state);
    this.endOfProcess = true;
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  handleUploadStart() {
    this.setState({ isUploading: true });
  }
  handleUploadError(error) {
    console.error(error);
  }
  handleProgress = progress =>
    this.setState({
      progress: progress + "%.."
    });
  handleUploadError(error) {
    alert("Upload Error: " + error);
  }
  handleUploadSuccess(filename) {
    this.setState({ isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ imgUrl: url, progress: [] }));
  }
  handleCloseAll(e) {
    e.preventDefault();
    Alert.closeAll();
  }
  render() {
    let style = {};
    let className = "main-div-form";
    if (window.innerWidth < 500) {
      style.width = "90%";
      className = "phone-display";
    }
    let selectImg = false;
    if (this.state.imgUrl != "") selectImg = true;
    return (
      <div className={className}>
        <MDBContainer>
          <MDBRow>
            <MDBCol>
              <form onSubmit={this.handleSubmit}>
                <p className="h4 text-center mb-4" style={{ color: "gray" }}>
                  Enter Your Recipe
                </p>
                <label className="grey-text">Recipe Name</label>
                <input
                  required
                  type="text"
                  name="recipeName"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.recipeName}
                />
                <br />
                <select
                  required
                  name="category"
                  className="browser-default custom-select"
                  onChange={this.handleChange}
                >
                  <option>Category</option>
                  <option value="fish">fish</option>
                  <option value="asian">asian</option>
                  <option value="deserts">deserts</option>
                  <option value="italic">italic</option>
                </select>
                <label className="grey-text">ingredients</label>
                <input
                  placeholder="enter ingredients separate by space"
                  required
                  type="text"
                  name="ingredients"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.ingredients}
                />
                {/* <br />

                <label className="grey-text">first step</label>
                <input
                  required
                  type="text"
                  name="firstStep"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.firstStep}
                />
                <br />
                <label className="grey-text">second step</label>
                <input
                  required
                  type="text"
                  name="secondStep"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.secondStep}
                />
                <br />
                <label className="grey-text">third step</label>
                <input
                  required
                  type="text"
                  name="thirdStep"
                  className="form-control"
                  onChange={this.handleChange}
                  value={this.state.thirdStep}
                />
                <br /> */}
                <label className="grey-text" style={{ textAlign: "center" }}>
                  Recipe Difficult
                </label>
                <MDBFormInline className="mt-5">
                  <MDBInput
                    onClick={this.onClick("easy")}
                    checked={this.state.radio === "easy" ? true : false}
                    label="easy"
                    type="radio"
                  />
                  <MDBInput
                    onClick={this.onClick("medium")}
                    checked={this.state.radio === "medium" ? true : false}
                    label="medium"
                    type="radio"
                  />
                  <MDBInput
                    onClick={this.onClick("difficult")}
                    checked={this.state.radio === "difficult" ? true : false}
                    label="difficult"
                    type="radio"
                  />
                  <MDBInput
                    onClick={this.onClick("very difficult")}
                    checked={
                      this.state.radio === "very difficult" ? true : false
                    }
                    label="very difficult"
                    type="radio"
                  />
                </MDBFormInline>
                <MDBInput
                  required
                  type="textarea"
                  label="Recipe Instructions"
                  rows="4"
                  icon="pencil-alt"
                  name="recipeInstructions"
                  onChange={this.handleChange}
                  value={this.state.recipeInstructions}
                  style={{ color: "white" }}
                />
                <label className="grey-text">Upload Recipe Image</label>
                <br />
                {/* <label>
                  {this.state.isUploading ? (
                    <Spinner animation="grow">
                      <span className="sr-only">Loading...</span>
                    </Spinner>
                  ) : (
                    <img
                      // alt="Image"
                      style={{ width: 55, height: 55 }}
                      src={this.state.imgUrl}
                    />
                  )} */}

                <label>
                  {selectImg ? (
                    <div className="imgusercWebForm">
                      <img
                        className="imgWebForm"
                        alt="החלף תמונה"
                        src={this.state.imgUrl}
                      />
                      <div className="useretWebForm">
                        {this.state.progress}שנה תמונה
                        {this.state.isUploading ? (
                          <Spinner animation="grow">
                            <span className="sr-only">Loading...</span>
                          </Spinner>
                        ) : (
                          " "
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="pinkBtnWebForm">
                      IMAGE {this.state.progress}
                      {this.state.isUploading ? (
                        <Spinner animation="grow">
                          <span className="sr-only">Loading...</span>
                        </Spinner>
                      ) : (
                        " "
                      )}
                    </div>
                  )}

                  <FileUploader
                    hidden
                    accept="image/*"
                    randomizeFilename
                    storageRef={firebase.storage().ref("images")}
                    onUploadError={this.handleUploadError}
                    onUploadSuccess={this.handleUploadSuccess}
                    onUploadStart={this.handleUploadStart}
                    onProgress={this.handleProgress}
                  />
                </label>

                <br />
                <div className="text-center mt-4">
                  <MDBBtn color="secondary" outline type="submit">
                    Send
                    <MDBIcon far icon="paper-plane" className="ml-2" />
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        {this.endOfProcess ? <Redirect to="/" /> : null}
      </div>
    );
  }
}
export default NewRecipeForm;
