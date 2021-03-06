import React, { useState, useEffect } from "react";
import ArticlePresenter from "../Components/ArticlesPresenter";
import RelatedArticlesInput from '../Components/RelatedArticlesInput'

const RelatedArticles = props => {
  const [readArticle, setReadArticle] = useState("");
  const [articleInputDisplay, setArticleInputDisplay] = useState(false)

  const isAdmin = props.isAdmin;
  const email = props.email;

  const getArticles = () => {
    fetch(`/api/related-articles`)
      .then(res => res.json())
      .then(data =>
        data.map(element => (
          <ArticlePresenter
            readArticle={element}
            key={element._id}
            isAdmin={isAdmin}
            email={email}
          />
        ))
      )
      .then(components => setReadArticle(components))
      .catch(err => console.log(err))
  };

  const toggleInputButton = () => (
    <form className="form-group">
      <button type="button" className="btn btn-primary form-control"onClick={toggleArticleInput}>
        { articleInputDisplay ?
          "Close Article Input"
          :
          "Add New Article"
        }
      </button>
    </form>
  )

  const toggleArticleInput = () => {
    setArticleInputDisplay(!articleInputDisplay)
  }

  const pageIsLoadingOutput = () => (
    <div className="text-center">
    <h3>This page is loading, please standby...</h3>
    {/* <br/> */}
    <small className="text-muted container">If you're the site admin, please sign in and add page content</small>

    </div>
  )

  useEffect(() => {
    getArticles()
  })

  return (
    <div className="d-flex flex-column related-articles-page">
      <h1 className="display-3">Related Articles</h1>
      { isAdmin ?
      toggleInputButton()
      : null }
      { articleInputDisplay ?
      <RelatedArticlesInput />
      :
      null
    }

    { readArticle.length > 0 ?
      readArticle
      :
      pageIsLoadingOutput()
    }

    </div>
  );
};

export default RelatedArticles;
