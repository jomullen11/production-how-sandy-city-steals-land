const monk = require('monk')

const DbUsername = process.env.DbUsername
const DbPassword = process.env.DbPassword
const SectionsDbName = process.env.SectionsDbName
const CommentDbName = process.env.CommentDbName
const RelatedArticlesDbName = process.env.RelatedArticlesDbName

const sectionsDbUrl = `mongodb://${DbUsername}:${DbPassword}@cluster0-shard-00-00-dvt9i.azure.mongodb.net:27017,cluster0-shard-00-01-dvt9i.azure.mongodb.net:27017,cluster0-shard-00-02-dvt9i.azure.mongodb.net:27017/${SectionsDbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
const commentsDbUrl = `mongodb://${DbUsername}:${DbPassword}@cluster0-shard-00-00-dvt9i.azure.mongodb.net:27017,cluster0-shard-00-01-dvt9i.azure.mongodb.net:27017,cluster0-shard-00-02-dvt9i.azure.mongodb.net:27017/${CommentDbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
const relatedArticlesDbUrl = `mongodb://${DbUsername}:${DbPassword}@cluster0-shard-00-00-dvt9i.azure.mongodb.net:27017,cluster0-shard-00-01-dvt9i.azure.mongodb.net:27017,cluster0-shard-00-02-dvt9i.azure.mongodb.net:27017/${RelatedArticlesDbName}?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority`
const sectionsDbRequest = monk(sectionsDbUrl)
const commentsDbRequset = monk(commentsDbUrl)
const relatedArticlesDbRequset = monk(relatedArticlesDbUrl)

// request by the Collection's Name
const sectionsAndHeaders = sectionsDbRequest.get('HeaderAndBody')
const comments = commentsDbRequset.get('Comments')
const relatedArticles = relatedArticlesDbRequset.get('Article-Data')

module.exports = {
    sectionsAndHeaders,
    comments,
    relatedArticles
};