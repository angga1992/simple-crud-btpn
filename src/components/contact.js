import React, { Component } from "react";
import TutorialDataService from "../services/data-services";
import { Link } from "react-router-dom";
export default class Tutorial extends Component {
  constructor(props) {
    super(props);
    this.onChangefirstName = this.onChangefirstName.bind(this);
    this.onChangelastName = this.onChangelastName.bind(this);
    this.onChangeAge = this.onChangeAge.bind(this);
    this.onChangePhoto = this.onChangePhoto.bind(this);
    this.getContact = this.getContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);

    this.state = {
      currentContact: {
        fistName: "",
        lastName: "",
        age: "",
        photo: ""
      }
    };
  }

  componentDidMount() {
    this.getContact(this.props.match.params.id);
  }

  onChangefirstName(e) {
    const firstName = e.target.value;

    this.setState(function(prevState) {
      return {
        currentContact: {
          ...prevState.currentContact,
          firstName: firstName
        }
      };
    });
  }

  onChangelastName(e) {
    const lastName = e.target.value;
    
    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        lastName: lastName
      }
    }));
  }

  onChangeAge(e) {
    const age = e.target.value;
    
    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        age: age
      }
    }));
  }

  onChangePhoto(e) {
    const photo = e.target.value;
    
    this.setState(prevState => ({
      currentContact: {
        ...prevState.currentContact,
        photo: photo
      }
    }));
  }

  getContact(id) {
    TutorialDataService.get(id)
      .then(response => {
        this.setState({
          currentContact: response.data.data
        });
        // console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateContact() {
    let payload = {
        firstName: this.state.currentContact.firstName,
        lastName: this.state.currentContact.lastName,
        age: this.state.currentContact.age,
        photo: this.state.currentContact.photo
    }
    TutorialDataService.update(
      this.state.currentContact.id,
      payload
    )
    .then(response => {
        this.setState({
          message: "The contact was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteContact() {    
    TutorialDataService.delete(this.state.currentContact.id)
      .then(response => {
        this.props.history.push('/contacts')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentContact } = this.state;

    return (
      <div>
        {currentContact ? (
          <div className="edit-form">
            <h4>Edit Contact</h4>
            <form>
              <div className="form-group">
                <label htmlFor="firstName">firstName</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={currentContact.firstName}
                  onChange={this.onChangefirstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">lastName</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={currentContact.lastName}
                  onChange={this.onChangelastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="age">age</label>
                <input
                  type="text"
                  className="form-control"
                  id="age"
                  value={currentContact.age}
                  onChange={this.onChangeAge}
                />
              </div>
              <div className="form-group">
                <div className="content-photo">
                    <img className="image-contact" src={currentContact.photo} />
                </div>
                <input
                  type="text"
                  className="form-control"
                  id="photo"
                  value={currentContact.photo}
                  onChange={this.onChangePhoto}
                />
              </div>
            </form>

            <div className="content-action">
                <div className="button add-contact">
                    <Link className="link-add" to={"/add"}>
                        Add
                    </Link>
                </div>
                <button
                className="button remove-contact"
                onClick={this.deleteContact}
                >
                Delete
                </button>

                <button
                type="submit"
                className="button edit-contact"
                onClick={this.updateContact}
                >
                Update
                </button>
            </div>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a contact...</p>
          </div>
        )}
      </div>
    );
  }
}