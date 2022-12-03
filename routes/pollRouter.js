import {Router} from "express"
import {pollPost,pollGet,pollGetIdChoice} from '../controllers/pollController.js'
import {schemaValidationMiddlewarePoll} from '../middlewares/schemaValidationMiddlewarePoll.js'

const pollRouter = Router();
pollRouter.post("/poll", schemaValidationMiddlewarePoll, pollPost);
pollRouter.get('/poll', pollGet);

pollRouter.get("/poll/:id/choice", pollGetIdChoice);
//pollRouter.get('/poll/:id/result', getResult);

export default pollRouter;

