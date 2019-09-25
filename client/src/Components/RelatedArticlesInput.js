import React from "react";
import { useInput } from "./hooks-input";

const ArticlesInput = () => {
  const {
    value: imageUrl,
    bind: bindImageUrl,
    reset: resetImageUrl
  } = useInput("");
  const {
    value: articleTitle,
    bind: bindArticleTitle,
    reset: resetArticleTitle
  } = useInput("");
  const {
    value: articleDescription,
    bind: bindArticleDescription,
    reset: resetArticleDescription
  } = useInput("");
  const {
    value: articleLink,
    bind: bindArticleLink,
    reset: resetArticleLink
  } = useInput("");

  const articleBody = {
    imageUrl,
    articleTitle,
    articleDescription,
    articleLink
  };

  const handleSubmit = async event => {
    event.preventDefault();
    await fetch(`/api/related-articles`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(articleBody)
    })
      .then(alert("Article Uploaded Successfully"))
      .catch(err => console.log(err));
    resetImageUrl();
    resetArticleTitle();
    resetArticleDescription();
    resetArticleLink();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlfor="articleLinkInput">Article Link</label>
          <input
            type="url"
            className="form-control"
            id="articleLinkInput"
            value={articleDescription}
            {...bindArticleLink}
            aria-describedby="articleLinkDesc"
            placeholder="Article URL"
          />
          <small id="articleLinkDesc" className="form-text text-muted">
            Copy and paste the article url here
          </small>
        </div>
        <div className="form-group">
          <label htmlfor="articleTitleInput">Article Title</label>
          <input
            type="text"
            className="form-control"
            id="articleTitleInput"
            value={articleTitle}
            {...bindArticleTitle}
            aria-describedby="articleTitleDesc"
            placeholder="Article Title"
            required
          />
          <small id="articleTitleDesc" className="form-text text-muted">
            Please insert the name of the article.
          </small>
        </div>
        <div className="form-group">
          <label htmlfor="articleDescriptionInput">Article Description</label>
          <textarea
            type="text"
            className="form-control"
            id="articleDescriptionInput"
            value={articleDescription}
            {...bindArticleDescription}
            aria-describedby="articleDescDesc"
            placeholder="Enter Article Description"
            required
          />
          <small id="articleDescDesc" className="form-text text-muted">
            Please copy and paste the article description.
          </small>
        </div>
        <div className="form-group">
          <label htmlfor="imageUrlInput">Image Url</label>
          <input
            type="url"
            className="form-control"
            id="imageUrlInput"
            value={imageUrl}
            {...bindImageUrl}
            aria-describedby="imageUrlDesc"
            placeholder="Image URL"
          />
          <small id="imageUrlDesc" className="form-text text-muted">
            Go to the article, right click with your cursor on the picture, and
            select copy image address
          </small>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
};

export default ArticlesInput;
