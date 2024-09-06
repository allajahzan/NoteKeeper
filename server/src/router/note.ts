import { RunServer , AddNotes, GetNotes, EditNote, DeleteNote} from "../controller/note";
import { Router } from "express";
const router = Router()

router.get('/',RunServer)

// add note
router.post('/addNote', AddNotes)

// get note
router.get('/getNote', GetNotes)

// edit note
router.patch('/editNote', EditNote)

// delete note
router.delete('/deleteNote', DeleteNote)

export default router