import {model, Schema} from "mongoose";

interface Type {
    _id?:Object
    title:string;
    content:string;
    date:Date
}

const noteSchema = new Schema<Type>({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:new Date()
    }
})

const Note = model<Type>('Note', noteSchema)
export {
   Type,
   Note
}