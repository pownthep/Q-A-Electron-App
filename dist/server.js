"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const PORT = 8000;
const QUESTIONS = [
    'Q1',
    'Q2',
    'Q3',
    'Q4',
    'Q5',
    'Q6',
    'Q7'
];
const ANSWERS = [
    'A1',
    'A2',
    'A3',
    'A4',
    'A5',
    'A6',
    'A7'
];
app.get('/questions', (req, res) => {
    res.json(QUESTIONS);
});
app.get('/answer/:index', (req, res) => {
    const index = Number(req.params.index);
    if (isNaN(index)) {
        res.status(500).send('Index is a not number.');
    }
    res.json(ANSWERS[index]);
});
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
//# sourceMappingURL=server.js.map