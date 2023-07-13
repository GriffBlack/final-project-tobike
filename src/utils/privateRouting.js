import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = () => {
    const userAuth = true;
    return (
        userAuth ? <Outlet /> : <Navigate to="AuthForm" />
    )
}

export default PrivateRoute;