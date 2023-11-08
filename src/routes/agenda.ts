// routes/agenda.ts
import { Router } from 'express';
import * as agendaController from '../controllers/agenda';

const router = Router();

router.get('/', agendaController.getAgendas);
router.get('/:id', agendaController.getAgenda);
router.delete('/:id', agendaController.deleteAgenda);
router.post('/', agendaController.postAgenda);
router.put('/:id', agendaController.updateAgenda);

export default router;
