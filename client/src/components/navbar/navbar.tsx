import './navbar.css'

function Navbar(): JSX.Element {
  return (<>
    <div className="nav w-full px-8 py-5 shadow-md fixed z-10">
      <h2 className='font-bold text-xl text-white'>Note Keeper</h2>
    </div>
  </>)
}

export default Navbar