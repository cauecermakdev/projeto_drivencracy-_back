import db from "../db.js"
import { ObjectId } from "mongodb";
import dayjs from 'dayjs'

async function enqueteExiste(title){
    console.log("entra function enqueteExsite ")
    console.log("title",title);
    //formato da enquete
    /*
    {
	    _id: ObjectId("54759eb3c090d83494e2d222"),
	    title: 'Qual a sua linguagem de programação favorita?', 
	    expireAt: "2022-02-28 01:00"
    }
    */

    //enquete existe ?
    const enquete = await db.collection("polls").find({title:title});
    console.log("tem enquet?",enquete);
    //console.log("aqui")

    if(enquete.length > 0){
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
    console.log("enquete.title",enquete.title)

    const enqueteExist = await db.collection("polls").find({title:enquete.title}).toArray();    
    console.log("enqueteExist",enqueteExist);

    if(enqueteExist.length > 0){
        console.log("enquete ja existe");
        res.status(401).send("enquete ja existe");
        return;
    } 

    
    if(!enquete.expireAt){
        enquete.expireAt = dayjs().add(30,'day').format("YYYY-MM-DD HH:mm");        
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
    //Validacao
    //Quando insiro um id errado na rota do thunderClient
    //http://localhost:5000/poll/638bd4e80750130c9af7c001/choice
    
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

 export async function getResult(req, res) {
    console.log("entra na GETRESULT")
    const {id} = req.params;
    console.log(id);

    const enqueteExiste = await db.collection("polls").find({_id:ObjectId(id)}).toArray();
    
    if(enqueteExiste.length === 0 ){
        res.status(404).send("Enquete não encontrada");
        return;
    }
    
    //Recebo o id da enquete
    //Pegar a opcoes de voto da enquete e coloco num array
    //Crio outro array pra somar os votos e armazenar a soma

    const numOpcoesVotoEnquete = await db.collection("choiceVote").find({pollId:id}).toArray();

    const arrayIdOpcoesVoto = [];
    const arraySomaOpcoesVoto= [];

    
    let maiorVoto = 0;
    let idMaiorVotoOpcaoVoto = 0;

    for(let i = 0;i < numOpcoesVotoEnquete.length;i++){
        const  idOpcaoVoto = numOpcoesVotoEnquete[i]._id;

        console.log("idOpcaoVoto",idOpcaoVoto);

        arrayIdOpcoesVoto.push(idOpcaoVoto);

        const votosOpcaoVoto = await db.collection("votes").find({choiceId:idOpcaoVoto}).toArray();
        const numVotosOpcaoVoto = votosOpcaoVoto.length;
        arraySomaOpcoesVoto.push(numVotosOpcaoVoto);

        if( numVotosOpcaoVoto > maiorVoto ){
            maiorVoto = numVotosOpcaoVoto;
            idMaiorVotoOpcaoVoto = idOpcaoVoto;
        }
        
        console.log("num maiorvoto", maiorVoto);
        console.log("idMaiorVoto", idMaiorVotoOpcaoVoto);

    }

    const enquete = await db.collection("polls").findOne({_id:ObjectId(id)})
    console.log("enquete", enquete);

    const OpcaoVotoMaisVotada = await db.collection("choiceVote").findOne({_id:idMaiorVotoOpcaoVoto});
    console.log("OpcaoVotoMaisVotada",OpcaoVotoMaisVotada);

    const objetoMaisVotada = {
        _id:id,
        title:enquete.title,
        expireAt:enquete.expireAt,
        result:{
            title:OpcaoVotoMaisVotada.title,
            votes:maiorVoto,
        }
    }   


    res.send(objetoMaisVotada);

}