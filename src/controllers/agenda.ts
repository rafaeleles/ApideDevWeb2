import express, { Request, Response } from "express";
import getMongoConn from "../db/connection";
import { MongoClient } from "mongodb";
import cors from "cors";
import Cadastro from "../models/agenda";

const port = 3000;
const app = express();

app.use(cors());

// SELECIONAR

export const getAgendas = async (req: Request, res: Response) => {
    let conn: MongoClient | null = null;

    try {
        conn = await getMongoConn();
        const db = conn.db();
        const agendasCollection = db.collection('agendas');

        const docs = await agendasCollection.find({}).toArray();

        res.status(200).json(docs);
    } catch (err) {
        res.status(500).json({
            message: (err as Error).message,
        });
    } finally {
        conn?.close();
    }
};

//SELEIONAR POR ID 

export const getAgenda = async (req: Request, res: Response) => {
    const { id } = req.params;
    let conn: MongoClient | null = null;

    try {
        conn = await getMongoConn();
        const db = conn.db();
        const agendasCollection = db.collection('agendas');

        const agenda = await agendasCollection.findOne({ _id: id });

        if (!agenda) {
            res.status(404).json({ message: 'Agenda não encontrada' });
        } else {
            res.status(200).json(agenda);
        }
    } catch (err) {
        res.status(500).json({
            message: (err as Error).message,
        });
    } finally {
        conn?.close();
    }
};

// ADICIONAR

export const postAgenda = (req: Request, res: Response) => {

app.post("/agendas", async (req: Request, res: Response) => {
    const { body } = req;
    let conn: MongoClient | null = null;
    
    try {
        conn = await getMongoConn();
        const db = conn.db();
        const agendasCollection = db.collection("agendas");
        
        const result = await agendasCollection.insertOne(body);
        
        res.status(201).json(result.insertedId); 
    } catch (err) {
        res.status(500).json({
            message: (err as Error).message
        });
    } finally {
        conn?.close();
    }
});
};

// ATUALIZAR

export const updateAgenda = (req: Request, res: Response) => {

app.put("/agendas/:id", async (req: Request, res: Response) => {
    const { body } = req;
    const { id } = req.params;
    let conn: MongoClient | null = null;

    try {
        conn = await getMongoConn();
        const db = conn.db();
        const agendasCollection = db.collection("agendas");

        const result = await agendasCollection.findOneAndUpdate(
            { _id: id },
            { $set: body },
            { returnDocument: "after" }
        );

        if (result.value) {
            res.status(200).json(result.value);
        } else {
            res.status(404).json({
                message: "Registro não encontrado"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: (err as Error).message
        });
    } finally {
        conn?.close();
    }
});
};

// E DELETAR

export const deleteAgenda = (req: Request, res: Response) => {


app.delete("/agendas/:id", async (req: Request, res: Response) => {
    const { id } = req.params;
    let conn: MongoClient | null = null;

    try {
        conn = await getMongoConn();
        const db = conn.db();
        const agendasCollection = db.collection("agendas");

        const result = await agendasCollection.findOneAndDelete({ _id: id });

        if (result.value) {
            res.status(204).end();
        } else {
            res.status(404).json({
                message: "Registro não encontrado"
            });
        }
    } catch (err) {
        res.status(500).json({
            message: (err as Error).message
        });
    } finally {
        conn?.close();
    }
});
};

app.listen(port, () => {
    console.log(`Servidor sendo executado na porta ${port}`);
});
