import express from 'express';
const router = express.Router();

import controllerWrapper from '../middlewares/controllerWrapper';
import connectingToDb from '../middlewares/connectingToDb';
import { CtrlCustomers } from '../controllers/CtrlCustomers';
const ctrl = new CtrlCustomers();

router.get('/', connectingToDb, controllerWrapper(ctrl.getAllCustomers));
router.get('/rowCount', connectingToDb, controllerWrapper(ctrl.getRowCount));
router.get(
  '/search',
  connectingToDb,
  controllerWrapper(ctrl.getSearchCustomers),
);
router.get('/:id', connectingToDb, controllerWrapper(ctrl.getCustomerById));

export default router;
