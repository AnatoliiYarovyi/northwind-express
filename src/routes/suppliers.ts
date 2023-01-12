import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import connectingToDb from '../middlewares/connectingToDb';
import { CtrlSuppliers } from '../controllers/CtrlSuppliers';
const ctrl = new CtrlSuppliers();

router.get('/', connectingToDb, controllerWrapper(ctrl.getAllSuppliers));
router.get('/:id', connectingToDb, controllerWrapper(ctrl.getSupplierById));

export default router;
