import { Router } from 'express';
import { getTV, getTVById } from '../controllers/tvController.js';

const router = Router();

router.get("/tv", getTV);
router.get("/tv/:id", getTVById);

export default router;
