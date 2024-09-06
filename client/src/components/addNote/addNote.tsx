import { useEffect, useState } from "react"
import '../navbar/navbar.css'
import { Type } from "../../App"

function AddNote({ degree, addNoteFunction, handleRotation }: { degree: number, addNoteFunction: (note: Type) => void, handleRotation: () => void }) {

    // style for slidebar
    let [style, setStyle] = useState<React.CSSProperties>({
        opacity: 0,
        transform: 'translateX(100%)',
        transition: 'all 0.2s ease-in-out',
    })

    // style for slidebar parent div
    let [style2, setStyle2] = useState<React.CSSProperties>({
        zIndex: -1,
        backgroundColor: "rgba(0, 0, 0, 0)"
    })

    // click event function
    let [action, setAction] = useState<() => void>(() => null )

    useEffect(() => {
        if (degree === -225) {
            // slide bar
            setStyle({
                opacity: 1,
                transform: 'translateX(0)',
                transition: 'all 0.2s ease-in-out',
            })
            // slide bar parent
            setStyle2({
                zIndex: 20,
                backgroundColor: "rgba(0, 0, 0, 0.2)",
                transition: "background-color 0.2s ease-in-out"
            })
            // change action
            setAction(() => handleRotation)
        } else {
            // slide bar
            setStyle({
                opacity: 0,
                transform: 'translateX(100%)',
                transition: 'all 0.2s ease-in-out',
            })
            // slide bar parent
            setStyle2({
                zIndex: -1,
                backgroundColor: "rgba(0, 0, 0, 0)",
            })
            // change action
            setAction(() => { return () => null })
        }
    }, [degree])


    // add notes
    let [titleInput, TitleInputChange] = useState<string>('')
    let [contentInput, ContentInputChange] = useState<string>('')


    let handleSubmit = (event: React.FormEvent) => {
        event.preventDefault()
        addNoteFunction({ title: titleInput, content: contentInput})
        TitleInputChange('')
        ContentInputChange('')
        handleRotation()
    }

    return (
        <>
            <div onClick={action} style={style2} className="flex justify-end w-[100vw] h-[100vh] fixed top-0 right-0 transition-all duration-300 bg-opacity-5 overflow-hidden">
                <div onClick={(event) => event.stopPropagation()} style={style} className="w-[300px] sm:w-[400px]">
                    <div className="flex flex-col relative h-[100vh] bg-white shadow-md dark:bg-gray-700">
                        <div className="nav flex items-center justify-between p-5 px-8  border-b ">
                            <h3 className="text-lg font-semibold text-white">
                                Add new note
                            </h3>
                        </div>

                        <form className="p-8 max-h-full flex-grow" onSubmit={handleSubmit}>
                            <div className="grid gap-4 mb-4 grid-cols-2">

                                <div className="col-span-2">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                                    <input type="text" value={titleInput} onChange={(event) => { TitleInputChange(event.target.value) }} className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Title" required />
                                </div>
                                <div className="col-span-2 flex-grow">
                                    <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content</label>
                                    <textarea required placeholder="Content" rows={10} value={contentInput} onChange={(event) => { ContentInputChange(event.target.value) }} className="w-full resize-none rounded-xl border-gray-300"></textarea>
                                </div>

                            </div>
                            <button type="submit" className="nav flex justify-center w-full text-white items-cente focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5">
                                <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                                Add new note
                            </button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default AddNote