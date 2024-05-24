import { Router } from 'express';
import { activate, status} from '../controllers/activate';

const router = Router();

router.get('/', activate);
router.get('/status', status);



export default router;