import { Outlet } from 'react-router-dom'
import { useParams, NavLink, useLocation } from 'react-router-dom'
import css from './form-layout.module.scss'

export default function FormLayout() {
    const params = useLocation();
    return (
        <div className={css.form_layout}>
                <Outlet />
            <nav>
                {console.log(params.pathname)
                // console.log(14)
                }
                {params.pathname !== '/AuthForm'
                    ? <NavLink to="">Войти</NavLink>
                    : <NavLink to="Registration">Зарегистрироваться</NavLink>}
                    {/* <NavLink to="">Войти</NavLink>
                    <NavLink to="Registration">Зарегистрироваться</NavLink> */}
                </nav>
        </div>
    )
}