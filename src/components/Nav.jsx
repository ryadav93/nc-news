import { Link } from "react-router-dom";


const Nav = () => {
    return (
        <nav className='Nav'>
            <Link to='/' className='Nav__link'>
                Home
            </Link>
            <Link to='/articles' className='Nav__link'>
                Articles
            </Link>
            <Link to='/topics' className='Nav__link'>
                Topics
            </Link>
            <Link to='/users' className='Nav__link'>
                Login
            </Link>
        </nav>
    )
}




export default Nav