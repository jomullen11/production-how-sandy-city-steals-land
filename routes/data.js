const { Router } = require('express')
const models = require('../models')

const router = Router()

// any extra routes
router.get('/', async (req, res) => {
    const result = await models.data.find({})
    res.status(200).send(result)
    // res.status(200).send(JSON.stringify({hello: "world"}))
})

// get specific item by id
router.get('/:id', async (req, res) => {
    const result = await models.data.findOne({_id: req.params.id})
    res.status(200).send(result)
})

// creates new data
router.post('/', async (req, res) => {
    const data = await models.data.insert(req.body)
    res.status(201).send(data)
})

// udatates every entry
router.put('/:id', async (req, res) => {
    const data = req.body
    // make sure to set which items you're updating
    const updatedData = await models.data.findOneAndUpdate({_id: req.params.id}, { $set: { "whatsLeft": data.whatsLeft }  }, req.body)
    res.status(200).send(updatedData)
})

// deletes items at their :id
router.delete('/:id', async (req, res) => {
    const result = await models.data.findOneAndDelete({_id: req.params.id})
    res.status(200).send(result)
    }
)

module.exports = router