const { Router } = require('express')

const router = Router()

// Initialize Controller
const articlesController = require('../controllers/articlesController')

// Get All
router.get('/articles', articlesController.list)

// Get One
router.get('/articles/:id', articlesController.show)

// Create
router.post('/articles', articlesController.create)

// Update
router.put('/articles/:id', articlesController.update)

// Delete
router.delete('/articles/:id', articlesController.delete)


module.exports = router
