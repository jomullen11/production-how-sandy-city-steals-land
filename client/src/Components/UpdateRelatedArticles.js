import React from 'react'
import { useInput } from './hooks-input'

const UpdateArticle = (props) => {
    const readArticle = props.readArticle
    const closeUpdate = props.closeUpdate
    const {value: imageUrl, bind: bindImageUrl, reset: resetImageUrl} = useInput(readArticle.imageUrl)
    const {value: articleTitle, bind: bindArticleTitle, reset: resetArticleTitle} = useInput(readArticle.articleTitle)
    const {value: articleDescription, bind: bindArticleDescription, reset: resetArticleDescription} = useInput(readArticle.articleDescription)
    const {value: articleLink, bind: bindArticleLink, reset: resetArticleLink} = useInput(readArticle.articleLink)

    const articleBody = {imageUrl, articleTitle, articleDescription, articleLink}

    const handleSubmit = (event) => {
        event.preventDefault()
        fetch(`/api/related-articles/${readArticle._id}`, {
            method: 'PUT',
            headers: {'content-type' : 'application/json'},
            body: JSON.stringify(articleBody)
        }).then(() => alert('Updated Successfuly'))
        .then(() => closeUpdate())
        .catch(err => console.log(err))
        resetImageUrl()
        resetArticleTitle()
        resetArticleDescription()
        resetArticleLink()
    }

    return(
        <form onSubmit={handleSubmit}>
        <div className="form-group">
            <label htmlFor="articleLinkInput" className="d-flex align-text-left update-form-label">Update Article Link</label>
            <input type="url" className="form-control" id="articleLinkInput" value={articleLink} {...bindArticleLink} aria-describedby="articleLinkDesc" placeholder="Article URL" required/>
            <small id="articleLinkDesc" className="form-text text-muted">Copy and paste the article url here</small>
        </div>
        <div className="form-group">
            <label htmlFor="articleTitleInput" className="d-flex align-text-left update-form-label">Update Article Title</label>
            <input type="text" className="form-control" id="articleTitleInput" value={articleTitle} {...bindArticleTitle} aria-describedby="articleTitleDesc" placeholder="Article Title" required/>
            <small id="articleTitleDesc" className="form-text text-muted">Please insert the name of the article.</small>
        </div>
        <div className="form-group">
            <label htmlFor="articleDescriptionInput" className="d-flex align-text-left update-form-label">Update Article Description</label>
            <textarea type="text" className="form-control" id="articleDescriptionInput" value={articleDescription} {...bindArticleDescription} aria-describedby="articleDescDesc" placeholder="Enter Article Description" />
            <small id="articleDescDesc" className="form-text text-muted">Please copy and paste the article description. This is not required</small>
        </div>
        <div className="form-group">
            <label htmlFor="imageUrlInput" className="d-flex align-text-left update-form-label">Update Image Url</label>
            <input type="url" className="form-control" id="imageUrlInput" value={imageUrl} {...bindImageUrl} aria-describedby="imageUrlDesc" placeholder="Image URL"/>
            <small id="imageUrlDesc" className="form-text text-muted">Go to the article, right click with your cursor on the picture, and select copy image address</small>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
    </form>
    )
}

export default UpdateArticle