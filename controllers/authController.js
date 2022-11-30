import bcrypt from 'bcrypt';
import {v4 as uuid} from 'uuid'
import db from '../db.js'

export async function signUp(req,res){
    const user = req.body;
    const passwordHash = bcrypt.hashSync(user.password,10);
    

    await db.collection('users').insertOne({...user,password:passwordHash})

    res.sendStatus(201);
    console.log("Cadastrado!");
}

export async function signIn(req,res){
    const {email, password} = req.body;

    const user = await db.collection("users").find({email}).toArray();

    if(user && bcrypt.compareSync(password,user[0].password)){

        //console.log("user[0]._id",user[0]._id);

        const token = uuid();
        await db.collection("sessions").insertOne({

            userId: user[0]._id,
            token
        })

        res.send(token);
        console.log("logado!");
    }else{
        res.sendStatus(401);
    }

}