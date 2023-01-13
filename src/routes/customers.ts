import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import connectingToDb from '../middlewares/connectingToDb';
import { CtrlCustomers } from '../controllers/CtrlCustomers';
const ctrl = new CtrlCustomers();

router.get('/', connectingToDb, controllerWrapper(ctrl.getAllCustomers));
router.get('/:id', connectingToDb, controllerWrapper(ctrl.getCustomerById));

export default router;
