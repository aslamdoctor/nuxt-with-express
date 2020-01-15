const { Router } = require('express')

const router = Router()

// Initialize Controller
const todosController = require('../controllers/todosController')

// Get All
router.get('/todos', todosController.list)

// Get One
router.get('/todos/:id', todosController.show)

// Create
router.post('/todos', todosController.create)

// Update
router.put('/todos/:id', todosController.update)

// Delete
router.delete('/todos/:id', todosController.delete)

module.exports = router
