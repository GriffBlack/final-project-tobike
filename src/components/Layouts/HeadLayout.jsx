import React, {useEffect} from 'react';
import { Outlet, NavLink, ScrollRestoration } from "react-router-dom"
import Footer from './Footer/Footer.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { removeToken, setToken, getToken } from '../../services/token.js';
// import Breadcrumbs from "../components/Breadcrumbs"
import './head-layout.scss'
import { useNavigate } from 'react-router-dom';
import { fetchAccec, logout } from '../../redux/slices/authSlice.js';

//     if (getToken()) {
//     // console.log(store.dispatch);
// //state проверяй
//     store.dispatch(fetchAccec());
//     console.log("store")
// };

export default function RootLayout() {
    const user = useSelector(state => state.user);
//     if (getToken()) {
//     // console.log(store.dispatch);
// //state проверяй
//     store.dispatch(fetchAccec());
//     console.log("store")
// };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(user);
    const onLogout = () => {
        removeToken();
        console.log(12)
        dispatch(logout(user));
        // dispatch(logout);
        // user.status = 
        console.log(user.status)
        navigate('/');
    };
    useEffect(() => {
        if (getToken()) {
            dispatch(fetchAccec());
        }
    },[null]);
    // let contr = true;
    return (
        <div className='head_layout'>
            <ScrollRestoration />
            <header>
                <nav>
                    <h1>toBiker</h1>
                    <NavLink to="/">Home</NavLink>
                    {user.status === "resolved" && <NavLink to="officers">Сотрудники</NavLink>}
                    {user.status === "resolved" && <NavLink to="cases">Заявления</NavLink>}
                    {/* <NavLink to="officers">Сотрудники</NavLink>
                    <NavLink to="cases">Заявления</NavLink> */} 
                    <NavLink to="Cases">Сообщить о краже</NavLink>
                    {user.status !== "resolved" ? <NavLink to="AuthForm">Войти</NavLink> : <button className='logout' onClick={onLogout}>Выйти</button>}
                </nav>
            </header>
            <main>
                <div className="wrapper">
                    {user.status === 'loading' && <h2>Loading...</h2>}
                    <Outlet />
                </div>
            </main>
            <Footer />
        </div>
    )
}
