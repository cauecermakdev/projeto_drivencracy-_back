import {Router} from "express"
import {choicePost,choiceVotePost} from '../controllers/choiceController.js'
import {schemaValidationMiddlewareChoice} from '../middlewares/schemaValidationMiddlewareChoice.js'

const choiceRouter = Router();
choiceRouter.post('/choice', schemaValidationMiddlewareChoice, choicePost);//opcao de voto
choiceRouter.post('/choice/:id/vote', choiceVotePost);

export default choiceRouter;