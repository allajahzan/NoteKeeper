import Navbar from "./components/navbar/navbar"
import Card from "./components/card/card"
import add_icon from './assets/add_icon.svg'
import IconButton from "./components/iconButton/iconButton"
import './components/card/card.css'
import loadingIcon from './assets/loading.svg'
import { lazy, useEffect, useState } from "react"
import './App.css'

// lazy load
const AddNote = lazy(() => import('./components/addNote/addNote'));
const EditNote = lazy(() => import('./components/editNote/editNote'));

export interface Type {
    _id?: Object;
    title: string;
    content: string;
    date?: Date
}

function App(): JSX.Element {

    // change rotation degree

    let [degree, setDegree] = useState<number>(0)
    let [editBar, setEditbar] = useState<boolean>(false)

    // handle rotatin CB
    let handleRotation = () => {
        if (degree === -225)
            setDegree(0)
        else
            setDegree(degree - 225)
    }

    // handle editBar
    let handleEditBar = () => {
        setEditbar(!editBar)
    }

    //add notes - function and state
    let [notes, addNotes] = useState<Type[]>([])
    let [loading, setLoading] = useState<boolean>(true)
    let [showContent, changeShowContent] = useState<boolean>(false)

    // after mount / unmount =========================

    // get notes from DB

    useEffect(() => {
        fetch('https://mynoteskeeper-server.vercel.app/getNote')
            .then(async (res) => {
                return await res.json()
            })
            .then((data) => {
                addNotes(data.notes.reverse())
                setTimeout(() => {
                    setLoading(false)
                }, 2800);
            })
            .catch((err) => {
                console.log(err)
            })
        setTimeout(() => {
            changeShowContent(true)
        }, 2000);
    }, [])


    // add note to DB 

    let addNoteFunction = (note: Type) => {

        fetch('https://mynoteskeeper-server.vercel.app/addNote', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
            .then(async (res) => {
                return await res.json()
            })
            .then((data) => {
                addNotes((prev) => {
                    return [data.newNote, ...prev]
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    // delete note

    let deleteNoteFunction = (_id: object) => {
        fetch(`https://mynoteskeeper-server.vercel.app/deleteNote?_id=${_id}`, {
            method: 'DELETE',
        })
            .then(async (res) => {
                return await res.json()
            })
            .then(() => {
                addNotes((prev) => {
                    return prev.filter((item) => {
                        return item._id !== _id
                    })
                })
            })
            .catch((err) => {
                console.log(err)
            })
    }


    let [noteToEdit, setNoteToEdit] = useState<Type | null>(null)

    // find which note to edit
    let findNoteToEdit = (id: Object) => {
        let findItem = notes.find((item) => item._id === id)
        setNoteToEdit(findItem as Type)
    }

    // edit note 

    let editNoteFunction = (note: Type) => {

        fetch('https://mynoteskeeper-server.vercel.app/editNote', {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(note)
        })
            .then(async (res) => {
                const data = await res.json()
                return data.editedNote
            })
            .then((data:Type) => {
                let updatedNotes= notes.map((item)=>
                    item._id === note._id ? {...item, title:data.title, content:data.content} : item
                )
                addNotes(updatedNotes)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    // cards
    let cards = (item: Type, index: number) => {
        return <Card date={item.date as Date} title={item.title} text={item.content} key={index} _id={item._id as Object} deleteNoteFunction={deleteNoteFunction} setEditbar={setEditbar} editBar={editBar} findNoteToEdit={findNoteToEdit} />
    }

    return (<>

        {/* show page loader*/}
        {!showContent &&
            <div className="w-[100vw] h-[100vh] flex flex-col justify-center items-center bg-amber-400">
                <img className="w-28 pb-5" src={loadingIcon} alt="" />
                <p style={{
                    color: 'white'
                }} className="text-lg font-bold">Note Keeper</p>
            </div>
        }

        {/* show navbar after page loader */}
        {showContent && <Navbar />}

        {/* show add button after pager loader*/}
        {showContent && <IconButton degree={degree} handleRotation={handleRotation} icon={add_icon} className='fixed z-30 right-6 top-2.5' title={degree === -225 ? 'Close' : 'Add Note'} />}

        {/* show skeletons after page loader before loading notes */}
        {loading && showContent && <div className="w-full pt-24 py-8 px-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {notes.map((data, index) => {
                return (<div key={index + data.title} style={{ paddingTop: '2.5rem' }} className="border container border-gray-100 rounded-lg p-8 pb-2 lg:pb-0  relative">
                    <div className="animate-pulse flex">
                       
                        <div className="flex-1">
                            <div className="space-y-7">
                                <div className="grid gap-6 grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                                    <div className="h-2 bg-gray-300 rounded"></div>
                                    <div className="h-2 bg-gray-300 rounded col-span-1"></div>
                                </div>
                                <div className="h-2 bg-gray-300  rounded"></div>
                                <div className="h-2 bg-transparent rounded"></div>
                                <div className="h-2 bg-transparent  rounded "></div>
                                <div className="flex justify-between mt-0 relative bottom-1 lg:bottom-3">
                                    <div className="rounded-full bg-gray-300 h-8 w-8"></div>
                                    <div className="rounded-full bg-gray-300 h-8 w-8"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>)
            })}
        </div>}

        {/* notes are not added - after page loader*/}
        {!notes.length && showContent &&
            <div className="w-[100vw] h-[100vh] absolute top-0 flex flex-col justify-center items-center">
                <p style={{
                    color: '#f5ba13'
                }} className="text-lg font-bold">No notes are added</p>
            </div>
        }

        {/* show notes after loading the full data */}
        {!loading && notes.length &&
            <div className="w-full pt-24 py-8 px-8 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3  lg:grid-cols-3">
                {notes.map(cards)}
            </div>
        }


        <AddNote degree={degree} addNoteFunction={addNoteFunction} handleRotation={handleRotation} />
        <EditNote editBar={editBar} handleEditBar={handleEditBar} noteToEdit={noteToEdit} editNoteFunction={editNoteFunction} />


    </>)
}

export default App