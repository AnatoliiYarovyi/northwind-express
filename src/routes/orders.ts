import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import connectingToDb from '../middlewares/connectingToDb';
import { CtrlOrders } from '../controllers/CtrlOrders';
const ctrl = new CtrlOrders();

router.get('/', connectingToDb, controllerWrapper(ctrl.getAllOrders));

export default router;
