import express from 'express'

import AuthController from '../controller/User'

const router = express.Router() 

router.route('/').post(AuthController.token)

export default router 