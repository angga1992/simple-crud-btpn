import React, { Component } from "react";
import contactDataService from "../services/data-services";
import { Link } from "react-router-dom";

export default class contactsList extends Component {
  constructor(props) {
    super(props);
    this.retrievecontacts = this.retrievecontacts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveContact = this.setActiveContact.bind(this);
    this.removeById = this.removeById.bind(this);

    this.state = {
      contacts: [],
      currentContact: null,
      currentIndex: -1
    };
  }

  componentDidMount() {
    this.retrievecontacts();
  }

//   onChangeSearchTitle(e) {
//     const searchTitle = e.target.value;

//     this.setState({
//       searchTitle: searchTitle
//     });
//   }

  retrievecontacts() {
    contactDataService.getAll()
      .then(response => {
        this.setState({
          contacts: response.data.data
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrievecontacts();
    this.setState({
      currentContact: null,
      currentIndex: -1
    });
  }

  setActiveContact(contact, index) {
    this.setState({
      currentContact: contact,
      currentIndex: index
    });
  }

  removeById(id) {
    contactDataService.delete(id)
      .then(response => {
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

render() {
    const { contacts, currentContact, currentIndex } = this.state;

    return (
      <div className="list row gx-5">
        <div className="col-md-6">
          <h4>contacts List</h4>

          <ul className="list-group">
            {contacts &&
              contacts.map((contact, index) => (
                <li>
                  <span
                    className={
                        "list-group-item pointer-contact" +
                        (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveContact(contact, index)}
                    key={index}
                  >
                    {contact.firstName}
                  </span>
                  <button
                    className="button remove-contact sizes"
                    onClick={this.removeById(contact.id)}
                  >
                    Delete
                  </button>
                  <button className="button edit-contact sizes">
                    <Link className="link-add"
                        to={"/contact/" + contact.id}
                    >
                        Edit
                    </Link>
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentContact ? (
            <div>
              <div>
                {currentContact.photo !== 'N/A' ? (
                    <img height="200px" width="200px" src={currentContact.photo} />
                ) : (
                    <div className="emptyPhoto"></div>
                )}
              </div>
              <div>
                <label>
                  <strong>Name</strong>
                </label>{" "}
                {currentContact.firstName} {' '}
                {currentContact.lastName}
              </div>
              <div>
                <label>
                  <strong>Age:</strong>
                </label>{" "}
                {currentContact.age}
              </div>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a contact...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}