import React, { Component } from "react";

class UpdatePageText extends Component {
  state = {
    sectionHeader: this.props.pageTextInfo.sectionHeader,
    sectionBody1: this.props.pageTextInfo.sectionBody1,
    sectionBody2: this.props.pageTextInfo.sectionBody2,
    sectionBody3: this.props.pageTextInfo.sectionBody3,
    sectionId: this.props.pageTextInfo.sectionId
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    console.log('well shit')
    await this.createSectionId();
    fetch(`/api/sections/${this.props.pageTextInfo._id}`, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(this.state)
    })
      .then(() => alert("Updated Successfully"))
      .then(() => this.props.closeUpdate())
      .catch(err => console.log(err));
  };

  createSectionId = () => {
    this.setState({ sectionId: this.state.sectionHeader.replace(/\s+/g, "") });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className={this.props.formClass}>
        <h2>Update Page Text</h2>
        <div className="form-group">
          <label
            htmlFor="commentNameUpdate"
            className="d-flex align-text-left update-form-label"
          >
            Update Section Title
          </label>
          <input
            type="text"
            value={this.state.sectionHeader}
            name="sectionHeader"
            placeholder="Update Section Header"
            onChange={this.handleChange}
            aria-describedby="update-sectionHeader-desc"
          />
          <small
            id="update-sectionHeader-desc"
            className="form-text text-muted"
          >
            Updating Section Header will also update corresponding bullet point
          </small>
          <br />
          <label
            htmlFor="sectionParagraphs"
            className="d-flex align-text-left update-form-label"
          >
            Update Paragraph(s)
          </label>
          <textarea
            type="text"
            id="sectionParagraphs"
            className="form-control"
            value={this.state.sectionBody1}
            name="sectionBody1"
            placeholder="This Paragraph Is Required"
            onChange={this.handleChange}
            aria-describedby="update-sectionBody1-desc"
            required
          />
          <small id="update-sectionBody1-desc" className="form-text text-muted">
            Update Paragraph Text
          </small>
          <textarea
            type="text"
            id="sectionParagraphs"
            className="form-control"
            value={this.state.sectionBody2}
            name="sectionBody2"
            placeholder="Add Second Paragraph"
            onChange={this.handleChange}
            aria-describedby="update-sectionBody2-desc"
          />
          <small id="update-sectionBody2-desc" className="form-text text-muted">
            Update Paragraph Text
          </small>
          <textarea
            type="text"
            id="sectionParagraphs"
            className="form-control"
            value={this.state.sectionBody3}
            name="sectionBody3"
            placeholder="Add Third Paragraph"
            onChange={this.handleChange}
            aria-describedby="update-sectionBody3-desc"
          />
          <small id="update-sectionBody3-desc" className="form-text text-muted">
            Update Paragraph Text
          </small>
        </div>
        <input type="submit" value="Update" />
      </form>
    );
  }
}

export default UpdatePageText;
