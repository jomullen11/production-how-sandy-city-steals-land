require("dotenv").config();
// all other imports below here

const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const path = require("path")
const routes = require('../routes')
// routes exist at ./routes in this file. on npm start build is run, and from the dist file where the app runs, routes is located at ../routes

const app = express()

const port = process.env.PORT || 8000

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true}))
app.use(cors())

app.use('/api/sections', routes.sections)
app.use('/api/comments', routes.comments)
app.use('/api/related-articles', routes.relatedArticles)

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
    console.log(`App running on port ${port}`)
})