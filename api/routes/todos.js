const config = require('../config')
const { Router } = require('express')

const router = Router()

// Initialize Controller
const todosController = require('../controllers/todosController')

// Get All
router.get('/todos', todosController.list)

// Get One
router.get('/todos/:id', todosController.show)

// Create
router.post('/todos', config.isAuthenticated, todosController.create)

// Update
router.put('/todos/:id', config.isAuthenticated, todosController.update)

// Delete
router.delete('/todos/:id', config.isAuthenticated, todosController.delete)

module.exports = router
