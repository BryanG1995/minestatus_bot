import { Router } from 'express';
import { deactivate } from '../controllers/activate';

const router = Router();

router.get('/', deactivate);


export default router;