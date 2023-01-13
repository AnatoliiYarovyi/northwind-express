import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import connectingToDb from '../middlewares/connectingToDb';
import { CtrlOrders } from '../controllers/CtrlOrders';
const ctrl = new CtrlOrders();

router.get('/', connectingToDb, controllerWrapper(ctrl.getAllOrders));
router.get('/rowCount', connectingToDb, controllerWrapper(ctrl.getRowCount));
router.get('/:id', connectingToDb, controllerWrapper(ctrl.getOrderById));

export default router;
