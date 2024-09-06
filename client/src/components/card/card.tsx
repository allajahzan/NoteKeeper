import './card.css'
import edit_icon from '../../assets/edit_icon.svg'
import delte_icon from '../../assets/delet_icon.svg'
import IconButton from '../iconButton/iconButton'
import Heading1 from '../headings/heading1'

interface data {
    title: string;
    text: string;
    date: Date
    _id: Object,
    deleteNoteFunction: (_id: Object) => void;
    setEditbar?: React.Dispatch<React.SetStateAction<boolean>>;
    findNoteToEdit?: (id: Object) => void
    editBar?: boolean
}


function Card({ title, text, date, deleteNoteFunction, _id, setEditbar, editBar, findNoteToEdit }: data): JSX.Element {

    const formattedDate = new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });

    return (
        <>

            <div style={{ paddingBottom: '1.9rem', display: '' }} className="container rounded-lg py-8 px-8 relative">
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    <Heading1 className='h-10 text-lg text-ellipsis overflow-hidden' innerText={title} />
                    <Heading1 className='h-10 text-left lg:text-right text-gray-400' innerText={formattedDate} />
                </div>
                <p className='break-words overflow-auto'>{text}</p>
                <IconButton icon={delte_icon} deleteNoteFunction={deleteNoteFunction} className='w-6 absolute left-8 bottom-4' _id={_id} title='Delete' />
                <IconButton icon={edit_icon} className='w-6 absolute right-8 bottom-4' _id={_id} findNoteToEdit={findNoteToEdit} setEditbar={setEditbar} editBar={editBar} title='Edit' />
            </div>
        </>
    )
}

export default Card