import {Router} from "express"
import {choicePost,choiceVotePost} from '../controllers/choiceController.js'
import {schemaValidationMiddlewareChoice} from '../middlewares/schemaValidationMiddlewareChoice.js'

const choiceRouter = Router();
choiceRouter.post('/choice', schemaValidationMiddlewareChoice, choicePost);//opcao de voto
choiceRouter.post('/choice/:id/vote', choiceVotePost);
//falta schema do voto


/* 
choiceRouter.post('/choice', validateChoice, postChoice);
choiceRouter.post('/choice/:id/vote', validateVote, postVote);
choiceRouter.get('/choice', fetchChoices); 
*/

/* 
voteRouter.post('/choice/:id/vote', validateVote, postVote);
voteRouter.get('/pool/:id/result', getResult); 
*/


//together routers
/* 
choiceRouter.post('/poll', pollPost);
choiceRouter.get('/poll', pollGet);
choiceRouter.get('/poll/:id/choice', pollGetChoice);
choiceRouter.get('/poll/:id/result', pollResults);
choiceRouter.post('/choice', choicePost);
choiceRouter.post('/choice/:id/vote', choicevotePost);
*/

export default choiceRouter;