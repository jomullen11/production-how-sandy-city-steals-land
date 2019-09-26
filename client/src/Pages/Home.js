import React, { useState, useEffect } from "react";
import ArticlePresenter from "../Components/ArticlePresenter";
import BulletPoints from "../Components/BulletPoints";
import PageTextDisplay from "../Components/PageTextDisplay";
import CommentsPresenter from "../Components/CommentsPresenter";
import PageInput from "../Components/PageInput";
import Comments from "../Components/CommentBox";

const Home = props => {
  const [bulletPoints, setBulletPoints] = useState("");
  const [pageTextDisplay, setPageTextDisplay] = useState([]);
  const [commentRead, setCommentRead] = useState([]);
  const [pageInputDisplay, setPageInputDisplay] = useState(false)

  // Both are defined in App
  const isAdmin = props.isAdmin;
  const email = props.email;

  // Getting and presenting the Section Headers as BulletPoints
  const getBulletPoints = props => {
    fetch(`/api/sections`)
      .then(response => response.json())
      .then(data =>
        data.map(element => (
          <BulletPoints
            bulletPointRead={element}
            key={element._id}
            isAdmin={isAdmin}
          />
        ))
      )
      .then(components => setBulletPoints(components))
      .catch(err => console.log(err));
  };

  // getting and presenting Section Header and Section Body
  const getPageTextInfo = () => {
    fetch(`/api/sections`)
      .then(response => response.json())
      .then(data =>
        data.map(element => (
          <PageTextDisplay
            pageTextInfo={element}
            key={element._id}
            isAdmin={isAdmin}
          />
        ))
        )
      .then(components => setPageTextDisplay(components))
      .catch(err => console.log(err));
  };

  const getComments = () => {
    fetch(`/api/comments`)
      .then(response => response.json())
      .then(data =>
        data.map(element => (
          <CommentsPresenter
            commentRead={element}
            key={element._id} /* refresh={this.getRead} */
            isAdmin={isAdmin}
            email={email}
          />
        ))
      )
      .then(components => setCommentRead(components.reverse()))
      .catch(err => console.log(err));
  };

  const togglePageInput = () => {
    setPageInputDisplay(!pageInputDisplay)
  }

  const toggleInputButton = () => (
    <form className="form-group">
      <button type="button" className="btn btn-primary form-control"onClick={togglePageInput}>
        { pageInputDisplay ?
          "Close Page Input"
          :
          "Add New Article"
        }
      </button>
    </form>
  )

  const pageIsLoadingOutput = () => (
    <div className="text-center">
    <h3>This page is loading, please standby...</h3>
    {/* <br/> */}
    <small className="text-muted container">If you're the site admin, please sign in and add page content</small>

    </div>
  )

  useEffect(() => {
    getBulletPoints();
    getPageTextInfo();
    getComments();
  });

  return (
    <div className="container home-page">
      <h1 className="display6">How Sandy City Steals Land</h1>

      { isAdmin ?
        toggleInputButton()
        : null }
        { pageInputDisplay ?
        <PageInput isAdmin={isAdmin} />
        :
        null
      }
      {/* <PageInput isAdmin={isAdmin} /> */}
      { pageTextDisplay.length > 0 ?
      <ArticlePresenter
      bulletPoints={bulletPoints}
      pageTextDisplay={pageTextDisplay}
      />
      :
      pageIsLoadingOutput()
      }


      <hr />

      <Comments isAdmin={isAdmin} email={email} commentRead={commentRead} pageIsLoadingOutput={pageIsLoadingOutput}/>
    </div>
  );
};

export default Home;