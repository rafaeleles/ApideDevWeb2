import { MongoClient } from "mongodb";
import getMongoConn from "./db/connection";
import Cadastro from "./models/agenda";

const agendas: Cadastro[] = [
    { professor: "Professor A", disciplina: "Matemática", turma: "Turma 1", numeroDias: 5 },
    { professor: "Professor B", disciplina: "Ciências", turma: "Turma 2", numeroDias: 4 },
];

const main = async () => {
    let conn: MongoClient | null = null;
    try {
        conn = await getMongoConn();
        const db = conn.db();
        const agendasCollection = db.collection("agendas");

        await agendasCollection.deleteMany({});

        for (let agenda of agendas) {
            await agendasCollection.insertOne(agenda);
        }

        const docs = await agendasCollection.find().toArray();
        console.log(docs);
    } catch (err) {
        console.log((err as Error).message);
    } finally {
        conn?.close();
    }
}

main();
