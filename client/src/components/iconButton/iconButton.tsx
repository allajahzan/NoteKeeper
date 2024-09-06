interface Icon {
    icon: string;
    className?: string;
    title?: string;
    deleteNoteFunction?: (_id: object) => void;
    handleRotation?: () => void;
    setEditbar?: React.Dispatch<React.SetStateAction<boolean>>;
    findNoteToEdit?: (id:Object) => void
    editBar?: boolean;
    degree?: number;
    _id?: Object
}

function IconButton({ icon, className, title, degree, _id, handleRotation, deleteNoteFunction, setEditbar, editBar, findNoteToEdit }: Icon) {

    // handle delete
    let handleDelete = () => {
        if (deleteNoteFunction && _id) {
            deleteNoteFunction(_id)
        }
    }

    // to get edit side bar
    let handleEdit = () => {
        if (setEditbar && _id && findNoteToEdit) {
            setEditbar(!editBar)
            findNoteToEdit(_id)
        }
    }

    let action = title === 'Delete' ? handleDelete : title === 'Edit' ? handleEdit : handleRotation

    return (
        <>
            <button
                style={{
                    transform: `rotate(${degree}deg)`,
                    transition: 'transform 0.3s ease-in-out',
                }}
                onClick={action} className={className} title={title}><img className='w-12' src={icon} alt="" /></button>
        </>
    )
}

export default IconButton