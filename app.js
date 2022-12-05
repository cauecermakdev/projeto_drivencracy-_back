import express from 'express';
import router from './routes/index.js';

const app = express();
app.use(express.json());

app.use(router);

/* app.listen(5000,()=>{
    console.log("server is listening on port 5000");
})
 */

app.listen(process.env.PORT, () => {
    console.log("Server running on port " + process.env.PORT);
});