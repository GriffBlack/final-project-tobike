import React, {useEffect} from 'react';
import { Outlet, NavLink } from "react-router-dom"
import Footer from './Footer/Footer.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { removeToken, setToken, getToken } from '../../service/token.js';
// import Breadcrumbs from "../components/Breadcrumbs"
import './head-layout.scss'
import { useNavigate } from 'react-router-dom';
import { fetchAccec, logout } from '../../redux/user/userSlice.js';

//     if (getToken()) {
//     // console.log(store.dispatch);
// //state проверяй
//     store.dispatch(fetchAccec());
//     console.log("store")
// };

export default function RootLayout() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onLogout = () => {
        removeToken();
        console.log(12)
        dispatch(logout(user));
        // dispatch(logout);
        // user.status = 
        console.log(user.status)
        navigate('/');
    };
    return (
        <div className='head_layout'>
            <header>
                <nav>
                    <h1>toBiker</h1>
                    <NavLink to="/">Home</NavLink>
                    {user.status === "fulfilled" && <NavLink to="/officers">Сотрудники</NavLink>}       
                    {user.status === "fulfilled" && <NavLink to="/reports">Заявления</NavLink>}       
                    <NavLink to="/report">Сообщить о краже</NavLink>
                    {user.status !== "fulfilled" ? <NavLink to="/login">Войти</NavLink> : <NavLink onClick={onLogout} to="/login">Выйти</NavLink>}
                </nav>
            </header>
            <main>
                <div className="wrapper">
                    {user.status === 'loading' && <h2>Loading...</h2>}
        
                    {console.log(user.status)}
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}
