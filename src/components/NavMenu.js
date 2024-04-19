import { Link } from 'react-router-dom';

export default function NavMenu() {

    return (
        <div className='nav-menu'>
            <p>A real time chat application with MongoDB</p>
            <Link to="/user/login">Login</Link>
            <Link to="/user/signUp">Sign up</Link>
            <Link to="/messages">Go to chat app</Link>
        </div>
    );
}