import React, { Component } from "react";
import UpdateRelatedArticles from "./UpdateRelatedArticles";

// add default picture if imageUrl is null
class ArticlesPresenter extends Component {
  constructor(props) {
    super(props);
    this.state = { isUpdating: false };
    // isAdmin, and readArticle are defined inside of render
  }

  handleDelete = async () => {
    await fetch(
      `/api/related-articles/${this.props.readArticle._id}`,
      {
        method: "DELETE"
      }
    )
      .then(() => alert("Deleted Successfully"))
      .catch(err => console.log(err));
  };

  toggleUpdate = () => {
    this.setState({ isUpdating: !this.state.isUpdating });
  };

  updateForm = () => (
    <div>
      <UpdateRelatedArticles
        readArticle={this.props.readArticle}
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
    //   imageUrl, articleTitle, articleDescription, articleLink are defined as the input value
    const readArticle = this.props.readArticle;
    const isAdmin = this.props.isAdmin;

    return (
      <>
        <div className="card mb-3 d-flex align-items-center container related-articles-card">
          <img
            className="card-img-top article-picture"
            src={readArticle.imageUrl}
            alt="Auto Shop"
          />
          <div className="card-body d-flex justify-content-center flex-column text-center">
            <h5 className="card-title">{readArticle.articleTitle}</h5>
            <p className="card-text">{readArticle.articleDescription}</p>
            <a
              href={readArticle.articleLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary text-white"
            >
              See Article
            </a>
          </div>
          {/* Update and Delete buttons if Admin is signed in */}
          {isAdmin ? (
            this.state.isUpdating ? (
              <this.updateForm />
            ) : (
              <this.buttons />
            )
          ) : null}
        </div>
      </>
    );
  }
}

export default ArticlesPresenter;
