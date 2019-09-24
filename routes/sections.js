const { Router } = require('express')
const models = require('../models')

const router = Router()

// any extra routes
router.get('/', async (req, res) => {
    const result = await models.sectionsAndHeaders.find({})
    res.status(200).send(result)
})

// get specific item by id
router.get('/:id', async (req, res) => {
    const result = await models.sectionsAndHeaders.findOne({_id: req.params.id})
    res.status(200).send(result)
})

// creates new data
router.post('/', async (req, res) => {
    const data = await models.sectionsAndHeaders.insert(req.body)
    res.status(201).send(data)
})

router.put('/:id', async (req, res) => {
    const data = req.body
    const updatedData = await models.sectionsAndHeaders.findOneAndUpdate({_id: req.params.id}, { $set: { "sectionId": data.sectionId, "sectionHeader": data.sectionHeader, "sectionBody1": data.sectionBody1, "sectionBody2": data.sectionBody2, "sectionBody3": data.sectionBody3}  }, req.body)
    res.status(200).send(updatedData)
})

// deletes items at their :id
router.delete('/:id', async (req, res) => {
    const result = await models.sectionsAndHeaders.findOneAndDelete({_id: req.params.id})
    res.status(200).send(result)
    })

module.exports = router