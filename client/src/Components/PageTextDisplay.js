import React, { Component } from "react";
import UpdatePageText from "./UpdatePageText";

// const PageTextDisplay = props => {
//   const [isUpdating, setIsUpdating] = useState(false);
//   const isAdmin = props.isAdmin;
// const pageTextInfo = props.pageTextInfo

class PageTextPresenter extends Component {
  constructor(props) {
    super(props);
    this.state = { isUpdating: false };
  }

  handleDelete = () => {
    fetch(`/api/sections/${this.props.pageTextInfo._id}`, {
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
      <UpdatePageText
        pageTextInfo={this.props.pageTextInfo}
        closeUpdate={this.toggleUpdate}
      />
      <input type="button" value="Cancel" onClick={this.toggleUpdate} />
    </div>
  );

  buttons = () => (
    <div>
      <input
        type="button"
        className="btn btn-outline-info"
        value="Update"
        onClick={this.toggleUpdate}
      />
      <input
        type="button"
        className="btn btn-danger"
        value="Delete"
        onClick={this.handleDelete}
      />
    </div>
  );

  render() {
    const pageTextInfo = this.props.pageTextInfo;
    const isAdmin = this.props.isAdmin;

    return (
      <>
        <h3 id={pageTextInfo.sectionId} className="section-header">
          {pageTextInfo.sectionHeader}
        </h3>

        {pageTextInfo.sectionBody1 ? (
          <p className="section-body first-line-border">
            {pageTextInfo.sectionBody1}
          </p>
        ) : null}
        {pageTextInfo.sectionBody2 ? (
          <p className="section-body first-line-border">
            {pageTextInfo.sectionBody2}
          </p>
        ) : null}
        {pageTextInfo.sectionBody3 ? (
          <p className="section-body first-line-border">
            {pageTextInfo.sectionBody3}
          </p>
        ) : null}
        {isAdmin ? (
          this.state.isUpdating ? (
            <this.updateForm />
          ) : (
            <this.buttons />
          )
        ) : null}
      </>
    );
  }
}

export default PageTextPresenter;
