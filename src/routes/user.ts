import { Router } from 'express';
import { createUser, getUser } from '../controllers/user.controllers';

const router = Router();

router.get('/', getUser);
router.post('/', createUser);


export default router;