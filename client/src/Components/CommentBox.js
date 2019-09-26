import React from "react";
import WriteComment from "../Components/Write-comment";

const CommentBox = props => {
  // email is set in App
  const email = props.email;
  // commentRead is set in Home
  const commentRead = props.commentRead;

  const noCommentOutput = () => (
    <div className="text-center">
      <h3>There are no comments yet</h3>
      <h2>Be the first to leave a comment!</h2>

    </div>
  )
  const commentDisplay = () => (
    <div>
      { commentRead > 0 ?
        commentRead
        :
        noCommentOutput()
    }
    </div>
  )

  return (
    <>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item">
          <a
            className="nav-link active"
            id="read-tab"
            data-toggle="tab"
            href="#read"
            role="tab"
            aria-controls="read"
            // aria-selected="false"
          >
            Comments
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="read-and-write-tab"
            data-toggle="tab"
            href="#read-and-write"
            role="tab"
            aria-controls="read-and-write"
            // aria-selected="true"
          >
            Read Comments
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            id="write-tab"
            data-toggle="tab"
            href="#write"
            role="tab"
            aria-controls="write"
            // aria-selected="false"
          >
            Write a Comment
          </a>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        <div
          className="tab-pane fade"
          id="read-and-write"
          role="tabpanel"
          aria-labelledby="read-and-write-tab"
        >
          {commentDisplay()}
        </div>
        <div
          className="tab-pane fade show active"
          id="read"
          role="tabpanel"
          aria-labelledby="read-tab"
        >
          {
            <WriteComment
              formClass="write-comment container d-flex flex-column"
              email={email}
            />
          }{" "}
          <br />
          {commentDisplay()}
        </div>
        <div
          className="tab-pane fade"
          id="write"
          role="tabpanel"
          aria-labelledby="write-tab"
        >
          {
            <WriteComment
              formClass="write-comment container d-flex flex-column"
              email={email}
            />
          }
        </div>
      </div>
    </>
  );
};

export default CommentBox;
