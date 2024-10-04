import express, { Router } from 'express';
import report from './report';

const router: Router = express.Router();

router.use('/report', report);

export default router;