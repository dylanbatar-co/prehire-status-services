import { Router } from 'express';
import { adapterRouterDownload } from '../adapters/express-adapter';
import { makeReportServices } from '../factories/report';

const router = Router();

router.get('/:owner', adapterRouterDownload(makeReportServices()));

export default router;
