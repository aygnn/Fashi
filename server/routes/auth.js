import { Router } from 'express'
 import {login,postUser,getUsers} from '../controllers/auth.js'



const router = new Router()

// Register
// http://localhost:6060/products/auth/register
router.post('/auth', postUser)


// Login
// http://localhost:6060/products/auth/login
router.post('/login', login)




// Get Me
// http://localhost:6060/products/auth/me
router.get('/auth',getUsers)
// router.get('/getusers', getUsers);

export default router



