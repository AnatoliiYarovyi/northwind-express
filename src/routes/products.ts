import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import connectingToDb from '../middlewares/connectingToDb';
import { CtrlProducts } from '../controllers/CtrlProducts';
const ctrl = new CtrlProducts();

router.get('/', connectingToDb, controllerWrapper(ctrl.getAllProducts));

export default router;
