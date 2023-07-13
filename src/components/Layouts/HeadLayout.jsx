import React from 'react';
import { Outlet, NavLink, ScrollRestoration } from "react-router-dom"
import Footer from './Footer/Footer.jsx'
import { useSelector } from 'react-redux';
// import Breadcrumbs from "../components/Breadcrumbs"
import './head-layout.scss'

export default function RootLayout() {
    const { status } = useSelector(state => state.user);
    // let contr = true;
    return (
        <div className='head_layout'>
            <ScrollRestoration />
            <header>
        <nav>
          <h1>toBiker</h1>
          <NavLink to="/">Home</NavLink>
          <NavLink to="Cases">Сообщить о краже</NavLink>
          {!status  && <NavLink to="AuthForm">Войти</NavLink>}
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
