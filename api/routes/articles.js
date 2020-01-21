const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const articlesController = require('../controllers/articlesController')

// Get All
router.get('/articles', articlesController.list)

// Get One
router.get('/articles/:id', articlesController.show)

// Create
router.post('/articles', config.isAuthenticated, articlesController.create)

// Update
router.put('/articles/:id', config.isAuthenticated, articlesController.update)

// Delete
router.delete('/articles/:id', config.isAuthenticated, articlesController.delete)

module.exports = router
