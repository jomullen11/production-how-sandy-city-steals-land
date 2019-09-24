//this file presents commetns to CommentBox
import React, { Component } from "react";
import UpdateComment from "./UpdateComment";

class CommentsPresenter extends Component {
  constructor(props) {
    super(props);
    this.state = { isUpdating: false };
  }
  // isAdmin, email, and commentRead are defined inside of render

  handleDelete = async () => {
    await fetch(`/api/comments/${this.props.commentRead._id}`, {
      method: "DELETE"
    })
      .then(() => alert("Deleted Successfully"))
      .catch(err => console.log(err));
  };

  toggleUpdate = () => {
    this.setState({ isUpdating: !this.state.isUpdating });
  };

  updateForm = () => (
    <div>
      <UpdateComment
        read={this.props.commentRead}
        closeUpdate={this.toggleUpdate}
      />
      <input type="button" value="Cancel" onClick={this.toggleUpdate} />
    </div>
  );

  buttons = () => (
    <div className="d-flex justify-content-around">
      <input
        type="button"
        className="btn btn-outline-info"
        value="Update"
        onClick={this.toggleUpdate}
      />
      <button
        type="button"
        className="btn btn-danger"
        onClick={this.handleDelete}
      >
        Delete
      </button>
    </div>
  );
  render() {
    const commentRead = this.props.commentRead;
    const isAdmin = this.props.isAdmin;
    const email = this.props.email;
    return (
      <div>
        <fieldset className="mb-3">
          <ul>
            <p className="comment-body mb-1 mt-3">{commentRead.comment}</p>
            <h4 className="comment-name display-5"> - {commentRead.name}</h4>
            <small className="form-text text-muted">{commentRead.date}</small>
          </ul>
          {/* Update and Delete buttons if isAdmin is true or if same user is signed in */}
          {isAdmin || email === commentRead.email ? (
            this.state.isUpdating ? (
              <this.updateForm />
            ) : (
              <this.buttons />
            )
          ) : null}
        </fieldset>
      </div>
    );
  }
}

export default CommentsPresenter;
