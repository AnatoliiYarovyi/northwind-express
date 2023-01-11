import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import connectingToDb from '../middlewares/connectingToDb';
import { CtrlCustomers } from '../controllers/CtrlCustomers';
const ctrl = new CtrlCustomers();

router.get('/', connectingToDb, controllerWrapper(ctrl.getAllCustomers));

export default router;
