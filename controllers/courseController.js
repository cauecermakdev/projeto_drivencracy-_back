import db from "../db.js"



export async function postCourse(req, res) {
    console.log("entrou Post Course");

    async function invalidUser(req){
        console.log("entrou Post Course");
        const course = req.body;
    
        const { authorization } = req.headers;
        const token = authorization?.replace('Bearer', '');
    
        if (!token) {
            return false;
        }
    
        const session = await db.collection("sessions").findOne({ token });
        if (!session) {
            return false;
        }
    
        const user = await db.collection("users").findOne({ _id: session.userId });
        if (!user) {
            return false;
        }
    }

    if(!invalidUser(req)){
        res.sendStatus(401);
    }

    try{
        await db.collection("courses").insertOne({course});
        res.sendStatus(201);
    }catch{
        res.sendStatus(401);
    }
}


export async function getCourses(req, res) {
    console.log("entra getCourse");
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer', '');
    //    console.log("authorization",authorization);

    if (!token) {
        return res.sendStatus(401);
    }

    const session = await db.collection("sessions").findOne({ token });
    //  console.log("session",session._id);

    if (!session) {
        res.sendStatus(401);
    }

    const course = await db.collection("courses").findOne({ _id: session.email });

    //    console.log("user",user);

    if (!course) {
        res.sendStatus(401);
    }


    /* delete user.password; */

    res.send(course);
}

export async function updateCourse(req, res) {
    const newUser = req.body;

    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer", "");

    if (!token) {
        res.sendStatus(401);
    }

    const session = await db.collection("sessions").findOne({ token: token });
    if (!session) {
        res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) {
        return res.sendStatus(401);
    }

    await db.collection("users").updateOne({
        _id: session.userId
    }, { $set: newUser })

    res.sendStatus(201);
}

export async function deleteCourse(req, res) {
    const { authorization } = req.headers;

    const token = authorization?.replace("Bearer", "");
    if (!token) {
        res.sendStatus(401);
    }

    const session = await db.collection("sessions").findOne({ token: token });
    if (!session) {
        res.sendStatus(401);
    }

    const user = await db.collection("users").findOne({ _id: session.userId });
    if (!user) {
        res.sendStatus(401);
    }

    await db.collection("users").deleteOne({ _id: session.userId })

    res.sendStatus(200);
}