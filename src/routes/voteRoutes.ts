import { Router } from 'express';
import { submitVote } from '../controllers/voteController';

const router = Router();
router.post('/', submitVote);

export default router;
