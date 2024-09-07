"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const note_1 = require("../controller/note");
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', note_1.RunServer);
// add note
router.post('/addNote', note_1.AddNotes);
// get note
router.get('/getNote', note_1.GetNotes);
// edit note
router.patch('/editNote', note_1.EditNote);
// delete note
router.delete('/deleteNote', note_1.DeleteNote);
exports.default = router;
