import { Link } from 'react-router-dom';

export default function NavMenu() {

    return (
        <div>
            <Link to="/user/login">Login</Link>
            <Link to="/user/signUp">Sign up</Link>
            <Link to="/messages">Go to chat app</Link>
        </div>
    );
}