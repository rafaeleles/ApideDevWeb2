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
const connection_1 = __importDefault(require("../db/connection"));
const agendas = [
    { professor: "Professor A", disciplina: "Matemática", turma: "Turma 1", numeroDias: 5 },
    { professor: "Professor B", disciplina: "Ciências", turma: "Turma 2", numeroDias: 4 },
];
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    let conn = null;
    try {
        conn = yield (0, connection_1.default)();
        const db = conn.db();
        const agendasCollection = db.collection("agendas");
        yield agendasCollection.deleteMany({});
        for (let agenda of agendas) {
            yield agendasCollection.insertOne(agenda);
        }
        const docs = yield agendasCollection.find().toArray();
        console.log(docs);
    }
    catch (err) {
        console.log(err.message);
    }
    finally {
        conn === null || conn === void 0 ? void 0 : conn.close();
    }
});
main();
