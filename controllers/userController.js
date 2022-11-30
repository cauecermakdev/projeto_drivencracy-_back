import db from "../db.js"

export async function getUser(req,res){
    console.log("entra getUser");
    const {authorization} = req.headers;
    const token = authorization?.replace('Bearer','');
//    console.log("authorization",authorization);

    if(!token){
        return res.sendStatus(401);
    }

    const session = await db.collection("sessions").findOne({token});
  //  console.log("session",session._id);

    if(!session){
        res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({_id:session.userId});

//    console.log("user",user);
    
    if(!user){
        res.sendStatus(401);
    }

    
    delete user.password;
    
    res.send(user);
}

export async function updateUser(req,res){
    const newUser = req.body;

    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer","");

    if(!token){
        res.sendStatus(401);
    }

    const session = await db.collection("sessions").findOne({token:token});
    if(!session){
        res.sendStatus(401);
    }
    
    const user = await db.collection("users").findOne({_id:session.userId});
    if(!user){
        return res.sendStatus(401);
    }

    await db.collection("users").updateOne({
        _id: session.userId
    },{ $set: newUser})
    
    res.sendStatus(201);
}

export async function deleteUser(req,res){
    const {authorization} =  req.headers;

    const token = authorization?.replace("Bearer","");
    if(!token){
        res.sendStatus(401);
    }

    const session = await db.collection("sessions").findOne({token:token});
    if(!session){
        res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({_id:session.userId});
    if(!user){
        res.sendStatus(401);
    }

    await db.collection("users").deleteOne({_id:session.userId})

    res.sendStatus(200);
}