"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteNote = exports.EditNote = exports.GetNotes = exports.AddNotes = exports.RunServer = void 0;
const path_1 = __importDefault(require("path"));
const note_1 = require("../modal/note");
const RunServer = async (req, res) => {
    res.sendFile(path_1.default.join(__dirname, 'server.html'));
};
exports.RunServer = RunServer;
// add note 
const AddNotes = async (req, res) => {
    try {
        const data = req.body;
        const note = new note_1.Note({ title: data.title, content: data.content, date: data.date });
        const newNote = await note.save();
        res.status(201).json({ msg: 'Successfully Added', newNote });
    }
    catch (err) {
        res.json(501).json({ msg: err });
    }
};
exports.AddNotes = AddNotes;
// get notes
const GetNotes = async (req, res) => {
    try {
        const notes = await note_1.Note.find({});
        res.status(200).json({ msg: 'Successfully fetched', notes });
    }
    catch (err) {
        res.json(501).json({ msg: err });
    }
};
exports.GetNotes = GetNotes;
// delet note
const EditNote = async (req, res) => {
    try {
        const data = req.body;
        const editedNote = await note_1.Note.findByIdAndUpdate({ _id: data._id }, {
            $set: {
                title: data.title,
                content: data.content
            },
        }, { new: true });
        res.status(200).json({ msg: 'Successfully Edited', editedNote });
    }
    catch (err) {
        res.json(501).json({ msg: err });
    }
};
exports.EditNote = EditNote;
// delet note
const DeleteNote = async (req, res) => {
    try {
        const id = req.query._id;
        await note_1.Note.deleteOne({ _id: id });
        res.status(200).json({ msg: 'Successfully delete' });
    }
    catch (err) {
        res.json(501).json({ msg: err });
    }
};
exports.DeleteNote = DeleteNote;
