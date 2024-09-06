import { Response, Request } from "express";
import path from 'path'
import { Type, Note } from "../modal/note";

export const RunServer = async (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, 'server.html'))
}


// add note 

export const AddNotes = async (req: Request, res: Response) => {
    try {
        const data: Type = req.body
        const note = new Note({ title: data.title, content: data.content, date: data.date })
        const newNote = await note.save()
        res.status(201).json({ msg: 'Successfully Added' ,newNote})
    } catch (err) {
        res.json(501).json({ msg: err })
    }
}

// get notes

export const GetNotes = async (req: Request, res: Response) => {
    try {
        const notes = await Note.find({})
        res.status(200).json({ msg: 'Successfully fetched', notes})
    } catch (err) {
        res.json(501).json({ msg: err })
    }
}

// delet note

export const EditNote = async (req:Request, res:Response )=>{
    try{
       
        const data: Type = req.body
        const editedNote =  await Note.findByIdAndUpdate({_id:data._id}, {
            $set:{
                title:data.title,
                content:data.content
            },
        },{ new: true }) 

        res.status(200).json({msg:'Successfully Edited', editedNote})
    
    }catch(err){
        res.json(501).json({msg:err})
    }
}

// delet note

export const DeleteNote = async (req:Request, res:Response )=>{
    try{
       
        const id = req.query._id
        await Note.deleteOne({_id:id})
        res.status(200).json({msg:'Successfully delete'})

    }catch(err){
        res.json(501).json({msg:err})
    }
}