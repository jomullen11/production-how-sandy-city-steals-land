const { Router } = require('express')
const models = require('../models')

const router = Router()

// any extra routes
router.get('/', async (req, res) => {
    const result = await models.comments.find({})
    res.status(200).send(result)
})

// get specific item by id
router.get('/:id', async (req, res) => {
    const result = await models.comments.findOne({_id: req.params.id})
    res.status(200).send(result)
})

// creates new data
router.post('/', async (req, res) => {
    const data = await models.comments.insert(req.body)
    res.status(201).send(data)
})

// udatates every entry
router.put('/:id', async (req, res) => {
    const data = req.body
    // make sure to set which items you're updating
    const updatedData = await models.comments.findOneAndUpdate({_id: req.params.id}, { $set: { "name": data.name, "comment": data.comment}  }, req.body)
    res.status(200).send(updatedData)
})

// deletes items at their :id
router.delete('/:id', async (req, res) => {
    const result = await models.comments.findOneAndDelete({_id: req.params.id})
    res.status(200).send(result)
    }
)

module.exports = router