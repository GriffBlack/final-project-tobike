import React from 'react';
import { Outlet, NavLink, ScrollRestoration } from "react-router-dom"
import Footer from './Footer/Footer.jsx'
import { useDispatch, useSelector } from 'react-redux';
import { removeToken } from '../../services/token.js';
// import Breadcrumbs from "../components/Breadcrumbs"
import './head-layout.scss'
import { useNavigate } from 'react-router-dom';
import { authClient } from '../../services/client.js';
import { fetchAccec } from '../../redux/slices/authSlice.js';

export default function RootLayout() {
    const user = useSelector(state => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    console.log(user);
    const onLogout = () => {
        removeToken();
        navigate('/');
        console.log(12)
        dispatch(fetchAccec());
        console.log(user.status)
  };
    // let contr = true;
    return (
        <div className='head_layout'>
            <ScrollRestoration />
            <header>
        <nav>
            <h1>toBiker</h1>
            <NavLink to="/">Home</NavLink>
            {user.status && <NavLink to="Officers">Сотрудники</NavLink>}       
            <NavLink to="Cases">Сообщить о краже</NavLink>
            {!user.status ? <NavLink to="AuthForm">Войти</NavLink> : <button className='logout' onClick={onLogout}>Выйти</button>}
        </nav>
      </header>
          <main>
              <div className="wrapper">
                  <Outlet />
              </div>
        </main>
        <Footer />
    </div>
  )
}
