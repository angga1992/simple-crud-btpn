import React, { Component } from "react";
import dataService from "../services/data-services";

export default class AddContact extends Component {
  constructor(props) {
    super(props);
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangephoto = this.onChangephoto.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.saveContact = this.saveContact.bind(this);
    this.newContact = this.newContact.bind(this);

    this.state = {
      id: null,
      firstName: "",
      lastName: "", 
      age: null,
      photo: "",
      imagePreviewUrl: ""
    };
  }

  onChangefirstName(e) {
    this.setState({
      firstName: e.target.value
    });
  }

  onChangelastName(e) {
    this.setState({
      lastName: e.target.value
    });
  }
  
  onChangeAge(e) {
    this.setState({
      age: e.target.value
    });
  }

  onChangephoto = e => {
    e.preventDefault()

    let file = e.target.files[0]
    let reader = new FileReader()
    reader.onloadend = () => {
      this.setState({
        photo: reader.result,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  saveContact() {
    var data = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      photo: this.state.photo
    };

    dataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          firstName: response.data.firstName,
          lastName: response.data.description,
          age: response.data.age,
          photo: response.data.photo,
        });
        // console.log(response.data);
        alert('contact saved')
        this.props.history.push('/')
      })
      .catch(e => {
        console.log(e);
      });
  }

  newContact() {
    this.setState({
      id: null,
      firstName: "",
      lastName: "",
      age: "",
      photo: ""
    });
  }

  render() {
    let {imagePreviewUrl} = this.state;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    }
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newContact}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">firstName</label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                required
                value={this.state.firstName}
                onChange={this.onChangefirstName}
                name="firstName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">lastName</label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                required
                value={this.state.lastName}
                onChange={this.onChangelastName}
                name="lastName"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Age</label>
              <input
                type="text"
                className="form-control"
                id="age"
                required
                value={this.state.age}
                onChange={this.onChangeAge}
                name="age"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">photo</label>
              <input
                type="file"
                className="form-control"
                id="photo"
                required
                onChange={this.onChangephoto}
                // onChange={(e) => this.onChangephoto(e.target.files[0])}
                name="file"
              />
            </div>
            <div className="previewImage">
              {$imagePreview}
            </div>
            <div className="add-contact-action">
                <button onClick={this.saveContact} className="button add-contact">
                Submit
                </button>
            </div>

          </div>
        )}
      </div>
    );
  }
}