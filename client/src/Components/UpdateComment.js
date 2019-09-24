import React, { Component } from "react";

class UpdateComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.read.name,
      comment: this.props.read.comment
    };
  }
  // state = {
  //   name: this.props.read.name,
  //   comment: this.props.read.comment
  // };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  // fix updating with empty state
  handleSubmit = async event => {
    event.preventDefault();
    await fetch(`/api/comments/${this.props.read._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(this.state)
    })
      .then(() => alert("Updated Succesfully"))
      .then(() => this.props.closeUpdate())
      .catch(err => console.log(err));
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label htmlFor="commentUpdateName">Update Name</label>
          <input
            type="text"
            id="commentUpdateName"
            className="form-control"
            value={this.state.name}
            name="name"
            placeholder="Update Name"
            onChange={this.handleChange}
            aria-describedby="commentUpdateNameDesc"
          />
          <small id="commentUpdateNameDesc" className="form-text text-muted">
            Your name is not required.
          </small>
        </div>
        <div className="form-group">
          <label htmlFor="updateCommentInput">Update Comment</label>
          <input
            type="text"
            id="updateCommentInput"
            className="form-control"
            value={this.state.comment}
            name="comment"
            placeholder="Update Name"
            onChange={this.handleChange}
            aria-describedby="commentUpdateCommentDesc"
          />
          <small id="commentUpdateCommentDesc" className="form-text text-muted">
            Please update your comment.
          </small>
        </div>
        <input type="submit" className="btn btn-primary" />
      </form>
    );
  }
}

export default UpdateComment;
