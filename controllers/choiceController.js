import db from "../db.js"
import { ObjectId } from "mongodb";
import dayjs from 'dayjs'


async function enqueteExiste(pollIdDaEnquete){
    console.log("pollIdDaEnquete",pollIdDaEnquete);

    //formato da enquete
    /*
    {
	    _id: ObjectId("54759eb3c090d83494e2d222"),
	    title: 'Qual a sua linguagem de programação favorita?', 
	    expireAt: "2022-02-28 01:00"
    }
    */

    //enquete existe ?
    const enqueteExiste = await db.collection("polls").find({_id:ObjectId(pollIdDaEnquete)}).toArray();
    console.log("enqueteExiste:",enqueteExiste);

    if(enqueteExiste){
        console.log("existe")
     return true;
    }else{
        console.log("n existe")
        return false;
    }

}

async function titleRepetido(title){
    console.log(title);

    const opcoesVoto = await db.collection("choiceVote").find({title:title}).toArray();
    console.log("opcoes de voto",opcoesVoto.length);
    
    if(opcoesVoto.length > 0){
        console.log("retorna true")
        return true;
    }else{
        console.log("retorna false")
        return false;
    }
}

async function enqueteExpirada(idDaEnquete){
    console.log("enqueteExpirada");
    const enquete = await db.collection("polls").findOne({_id:ObjectId(idDaEnquete)});
    
    const expiraDataEnquete = new Date(enquete.expireAt);
    const hoje = new Date(dayjs().format("YYYY-MM-DD hh:mm"));    
    const enqueteExpirada = expiraDataEnquete.getTime() < hoje.getTime();  
    console.log(enqueteExpirada);
    return enqueteExpirada;
}

export async function choicePost(req, res) {
    const opcaoVoto = req.body;
    console.log(opcaoVoto);

    if(await enqueteExiste(opcaoVoto.pollId)){
        console.log("enquete existe, pode dar post choice")
    }else{
        res.status(401).send("enquete não existente");
        return;
    };

    if(await titleRepetido(opcaoVoto.title)){
        res.status(409).send("Opcao de voto não pode ter title repetido");
        return;
    }

    console.log(dayjs().add(30,'day').format());
    //dayjs().format("YYYY-MM-DD HH:mm")
    if(await enqueteExpirada(opcaoVoto.pollId)){
        res.status(403).send("enquete expirada");
        return;
    }

    try {
        console.log("entra notry")
        console.log("entra no try do choicePost")
        const choiceVoteCollection = await db.collection("choiceVote").insertOne({ ...opcaoVoto });
        console.log("choiceVoteCollection");
        console.log(choiceVoteCollection);
        const opcaoVotoInserida = await db.collection("choiceVote").findOne({ _id: ObjectId(choiceVoteCollection.insertedId) });
        res.status(201).send(opcaoVotoInserida);

    } catch {
        res.status(400).send("Opcao de voto não inserida.");
    }


}



export async function choiceVotePost(req,res){

    //nao recebe nada da requisicao body
   
    console.log("choiceVotePost");
    const {id} = req.params;
    console.log("choiceVotePost id",id);

    const opcaoVotoExiste = await db.collection("choiceVote").find({_id:ObjectId(id)}).toArray();
    console.log("opcaoVotoExiste",opcaoVotoExiste);
    
    console.log("opcaoVotoExiste.length",opcaoVotoExiste.length);

    if(opcaoVotoExiste.length === 0 ){
        res.status(404).send("Opcao de voto não existe");
        return;
    } 

/*     //verificar se a enquete da opcao de voto já está expirada
    if(await enqueteExpirada(opcaoVotoExiste.pollId)){
        res.status(403).send("enquete expirada");
        return;
    } */

    //o formato do body
    const objetoVotoPost = {
        createdAt: dayjs().format("YYYY-MM-DD hh:mm"),
        choiceId: ObjectId(id)
    }

    try {
        await db.collection("votes").insertOne(objetoVotoPost);
        res.status(201).send(objetoVotoPost);
        return;
    }catch{
        res.status(404).send("Não foi possível dar get")
        return;
    } 

}


