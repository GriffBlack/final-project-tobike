import { Outlet } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import css from './form-layout.module.scss'

export default function FormLayout() {
    return (
        <div className={css.form_layout}>
                <nav>
                    <NavLink to="">Войти</NavLink>
                    <NavLink to="Registration">Зарегистрироваться</NavLink>
                </nav>
                <Outlet />
        </div>
    )
}