import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import connectingToDb from '../middlewares/connectingToDb';
import { CtrlEmployees } from '../controllers/CtrlEmployees';
const ctrl = new CtrlEmployees();

router.get('/', connectingToDb, controllerWrapper(ctrl.getAllEmployees));
router.get('/:id', connectingToDb, controllerWrapper(ctrl.getEmployeeById));

export default router;
