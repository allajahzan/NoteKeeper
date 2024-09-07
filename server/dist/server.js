"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const note_1 = __importDefault(require("./router/note"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
// configure dotenv
dotenv_1.default.config();
// create app
const app = (0, express_1.default)();
// cors
app.use((0, cors_1.default)());
// static files
app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// use route
app.use('/', note_1.default);
mongoose_1.default.connect('mongodb+srv://allajahzan:Allajpk%40291407@notekeeper.ulp5p.mongodb.net/?retryWrites=true&w=majority&appName=NoteKeeper')
    .then(() => {
    console.log('Connected to DB');
})
    .catch((err) => {
    console.log(err);
});
// setup server
app.listen(3000, () => {
    console.log("Server is running on port 3000 http://localhost:3000");
});
