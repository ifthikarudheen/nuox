import express from 'express';
import shareController from '../controllers/shareController.js';
const router = express.Router();
router.get('/', shareController.getAllShareHolders);
router.post('/', shareController.addShareHolder);
router.post('/shares', shareController.addShare)
router.get('/search', shareController.searchShareholder);
router.get('/list/:id', shareController.getSharebyId);
router.put('/:id', shareController .addPayment);
export default router;