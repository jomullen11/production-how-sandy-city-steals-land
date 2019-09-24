import React, { useEffect } from "react";
import { useInput } from "./hooks-input";

const WriteComment = props => {
  const { value: name, bind: bindNameInput, reset: resetNameInput } = useInput(
    ""
  );
  const {
    value: comment,
    bind: bindCommentInput,
    reset: resetCommentInput
  } = useInput("");
  const email = props.email;
  const date = Date(Date.now());

  const commentBody = { name, comment, email, date };

  // Detecting which browser is being used for the sign in browserRefreshWarning in nullEmailDisplay
  var is_chrome = navigator.userAgent.indexOf("Chrome") > -1;
  var is_safari = navigator.userAgent.indexOf("Safari") > -1;
  if (is_chrome && is_safari) {
    is_safari = false;
  }

  const handleSubmit = async event => {
    event.preventDefault();
    console.log(commentBody);
    await fetch(`/api/comments`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(commentBody)
    })
      .then(() => resetNameInput())
      .then(() => resetCommentInput())
      //   .then(() => resetEmailInput())
      .then(() => alert("Thanks for Your Comment"))
      .catch(err => console.log(err));
  };

  const CommentInput = () => (
    <fieldset id="commentFieldset">
      <legend htmlFor="commentFieldset">Write a comment!</legend>
      <form className={props.formClass} onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name-input">Name</label>
          <input
            id="name-input"
            type="text"
            value={name}
            className="form-control"
            placeholder="Ex. John Doe"
            {...bindNameInput}
            aria-describedby="name-input-desc"
          />
          <small id="name-input-desc" className="form-text text-muted">
            Name is not required.
          </small>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            type="text"
            className="form-control"
            placeholder="Please Leave a Comment"
            value={comment}
            {...bindCommentInput}
            aria-describedby="comment-input-desc"
          />
          <small id="comment-input-desc" className="form-text text-muted">
            Thank you for leaving a comment.
          </small>{" "}
        </div>
        <div className="form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="dataPermissionCheckBox"
            required
          />
          <label className="form-check-label" htmlFor="dataPermissionCheckBox">
            By using this form you agree with the storage and handling of your
            data by this website
          </label>
        </div>
        <br />
        <input
          type="submit"
          className="btn btn-primary"
          value="Submit"
          aria-describedby="comment-submit-desc"
        />
      </form>
    </fieldset>
  );

  const nullEmailDisplay = () => {
    const browserRefreshWarning = () => {
      if (is_safari) {
        return (
          <div>
            {email === null ? (
              <p>For Safari: Please refresh browser after signing in</p>
            ) : null}
          </div>
        );
      }
    };
    document.getElementById("sign-in");
    return (
      <>
        <fieldset>
          <legend>Please sign in to leave a comment</legend>
          <div class="g-signin2" id="sign-in" data-onsuccess="onSignIn"></div>
          {browserRefreshWarning()}
        </fieldset>
      </>
    );
  };

  useEffect(() => {
    nullEmailDisplay();
  });
  return <>{email === null ? nullEmailDisplay() : CommentInput()}</>;
};

export default WriteComment;
