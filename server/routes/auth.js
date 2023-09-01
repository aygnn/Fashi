import { Router } from 'express'
 import {login,postUser,getUsers,getUserById} from '../controllers/auth.js'



const router = new Router()

// Register
// http://localhost:6060/products/auth
router.post('/auth', postUser)


// Login
// http://localhost:6060/products/auth/login
router.post('/login', login)




// Get Me
// http://localhost:6060/products/auth/me
router.get('/auth',getUsers)

//get by id 

router.get('/auth/:id', getUserById);

export default router



