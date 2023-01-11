import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import connectingToDb from '../middlewares/connectingToDb';
import { Suppliers } from '../controllers/suppliers';
const ctrl = new Suppliers();

router.get('/', connectingToDb, controllerWrapper(ctrl.getName));

export default router;
