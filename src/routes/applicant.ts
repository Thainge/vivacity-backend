import express from 'express';
import controller from '../controllers/applicant';
const router = express.Router();

router.get('/awesome/applicant/:id', controller.getApplicant);
router.post('/awesome/applicant', controller.CreateApplicant);
router.put('/awesome/applicant', controller.UpdateApplicant);
router.delete('/awesome/applicant/:id', controller.DeleteApplicant);

export = router;