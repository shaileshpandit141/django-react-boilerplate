import { useDispatch } from 'react-redux';
import { logout } from '../../authSlice';

export default function Logout() {
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
    };

    return <button onClick={handleLogout}>Logout</button>;
};

