"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAgenda = exports.updateAgenda = exports.postAgenda = exports.getAgenda = exports.getAgendas = void 0;
const express_1 = __importDefault(require("express"));
const connection_1 = __importDefault(require("../db/connection"));
const cors_1 = __importDefault(require("cors"));
const port = 3000;
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// SELECIONAR
const getAgendas = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        conn = yield (0, connection_1.default)();
        const db = conn.db();
        const agendasCollection = db.collection('agendas');
        const docs = yield agendasCollection.find({}).toArray();
        res.status(200).json(docs);
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
});
exports.getAgendas = getAgendas;
//SELEIONAR POR ID 
const getAgenda = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let conn = null;
    try {
        conn = yield (0, connection_1.default)();
        const db = conn.db();
        const agendasCollection = db.collection('agendas');
        const agenda = yield agendasCollection.findOne({ _id: id });
        if (!agenda) {
            res.status(404).json({ message: 'Agenda não encontrada' });
        }
        else {
            res.status(200).json(agenda);
        }
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
        });
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
});
exports.getAgenda = getAgenda;
// ADICIONAR
const postAgenda = (req, res) => {
    app.post("/agendas", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = req;
        let conn = null;
        try {
            conn = yield (0, connection_1.default)();
            const db = conn.db();
            const agendasCollection = db.collection("agendas");
            const result = yield agendasCollection.insertOne(body);
            res.status(201).json(result.insertedId);
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
        finally {
            conn === null || conn === void 0 ? void 0 : conn.close();
        }
    }));
};
exports.postAgenda = postAgenda;
// ATUALIZAR
const updateAgenda = (req, res) => {
    app.put("/agendas/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { body } = req;
        const { id } = req.params;
        let conn = null;
        try {
            conn = yield (0, connection_1.default)();
            const db = conn.db();
            const agendasCollection = db.collection("agendas");
            const result = yield agendasCollection.findOneAndUpdate({ _id: id }, { $set: body }, { returnDocument: "after" });
            if (result.value) {
                res.status(200).json(result.value);
            }
            else {
                res.status(404).json({
                    message: "Registro não encontrado"
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
        finally {
            conn === null || conn === void 0 ? void 0 : conn.close();
        }
    }));
};
exports.updateAgenda = updateAgenda;
// E DELETAR
const deleteAgenda = (req, res) => {
    app.delete("/agendas/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { id } = req.params;
        let conn = null;
        try {
            conn = yield (0, connection_1.default)();
            const db = conn.db();
            const agendasCollection = db.collection("agendas");
            const result = yield agendasCollection.findOneAndDelete({ _id: id });
            if (result.value) {
                res.status(204).end();
            }
            else {
                res.status(404).json({
                    message: "Registro não encontrado"
                });
            }
        }
        catch (err) {
            res.status(500).json({
                message: err.message
            });
        }
        finally {
            conn === null || conn === void 0 ? void 0 : conn.close();
        }
    }));
};
exports.deleteAgenda = deleteAgenda;
app.listen(port, () => {
    console.log(`Servidor sendo executado na porta ${port}`);
});
