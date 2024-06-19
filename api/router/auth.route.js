import express from 'express';
import { google } from '../controllers/auth.controller.js'
const router=express.Router();
router.post('/signUp',google);
export default router;