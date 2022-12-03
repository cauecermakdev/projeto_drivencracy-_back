import db from "../db.js"
import { ObjectId } from "mongodb";

async function enqueteExiste(title){
    console.log("entra function enqueteExsite ")
    console.log(title);
    //formato da enquete
    /*
    {
	    _id: ObjectId("54759eb3c090d83494e2d222"),
	    title: 'Qual a sua linguagem de programação favorita?', 
	    expireAt: "2022-02-28 01:00"
    }
    */

    //enquete existe ?
    const enquete = await db.collection("poll").find({title:title});
    //console.log(enquete.toArray());
    //console.log("aqui")

    if(enquete){
     console.log("enquete existe");
     return true;
    }else{
        console.log("enquete nao existe");
        return false;
    }

}

export async function pollPost(req, res) {
    console.log("entra no pollPost");

    const enquete  = req.body;
    

/*     if(enqueteExiste(enquete.title)){
        console.log("entra no if")
        return;
    } */

    console.log("passa function enqueteexiste");
    

    if(enquete.expireAt === ""){
        enquete.expireAt = dayjs().add(30,'day').format();        
    }

    try{
        const enqueteCriada = await db.collection("polls").insertOne({...enquete});
        const enqueteCriadaFormatada = await db.collection("polls").find({_id:enqueteCriada.insertedId}).toArray();
        //preciso inserir _id: ObjectId(?)? Nao precisa,so importando ja insere ObjectId
        res.status(201).send(enqueteCriadaFormatada);
    }catch{
        res.status(400).send("enquete não foi inserida no db");
    }
    
}

 export async function pollGet(req, res) {
    try{
     const todasEnquetes = await db.collection("polls").find({}).toArray();
     res.status(200).send(todasEnquetes);
    }catch{
        res.status(400).send("deu ruim no get das enquetes");
    }
} 


export async function pollGetIdChoice(req,res){
    //quando insiro um id errado na rota do thunderClient
    //http://localhost:5000/poll/638bd4e80750130c9af7c001/choice
    //
    console.log("entra pollgetIdChoice");
    const {id} = req.params;
    console.log("pollGetIdChoice",id);

    console.log("antes");
    const enqueteExiste = await db.collection("polls").find({_id:ObjectId(id)}).toArray();
    
    console.log("enqueteExiste",enqueteExiste.length);

    if(enqueteExiste.length === 0 ){
        res.status(404).send("Enquete não encontrada");
        return;
    }

    try {
        const listaOpcoesDeVoto = await db.collection("choiceVote").find({pollId:id}).toArray();
        res.status(201).send(listaOpcoesDeVoto);
        return;
    }catch{
        res.status(404).send("Não foi possível dar get")
        return;
    } 

}

/* export async function getResult(req, res) {
    return;
}
 */
