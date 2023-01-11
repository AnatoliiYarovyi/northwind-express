import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import connectingToDb from '../middlewares/connectingToDb';
import { CtrlSuppliers } from '../controllers/CtrlSuppliers';
const ctrl = new CtrlSuppliers();

router.get('/', connectingToDb, controllerWrapper(ctrl.getAllSuppliers));

export default router;
