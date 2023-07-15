import React from 'react';
import { Outlet, NavLink } from "react-router-dom"
import Footer from './Footer/Footer.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../../service/token.js';
import './head-layout.scss'
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/user/userSlice.js';


export default function RootLayout() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const onLogout = () => {
        removeToken();
        dispatch(logout(user));
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
