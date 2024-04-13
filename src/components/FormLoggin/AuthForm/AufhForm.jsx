import React, {useState} from 'react';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { getToken } from '../../../services/token'

import FormInput from '../../FormInput/FormInput.jsx';
import { useDispatch, useSelector } from 'react-redux';
import {fetchAuth} from '../../../redux/slices/authSlice'
const authInner = [
    { id: 1, label: 'Email', name: 'email', type: 'text'},
    { id: 2, label: 'Пароль', name: 'password', type: 'password'},
]
 
const authValues = {
    email: '',
    password: ''
};
const authValidationSchema = yup.object().shape({
    email: yup.string()
        .email('Не корректный E-mail')
        .required('Заполните поле'),
    password: yup.string()
        .required('Заполните поле'),
});

export default function AuthForm() {
    const [message, setMessage] = useState(null);
    const { status, error, user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logginHandler = async (data) => {
        dispatch(fetchAuth(data))
            .then((data) => {
            if ('error' in data) {
            setMessage('Введены неверные данные');
            } else {
            setMessage('Вы авторизованы');
            navigate('/');
            }
        })
        .catch(() => {
            setMessage('Ошибка работы сервера');
        });

}
    return (
        <div className="auth-form">
            <h2>Войдите</h2>
            <FormInput
                initialValues={authValues}
                logginHandler={logginHandler}
                registrationValidationSchema={authValidationSchema}
                authInner={authInner}
                btnName='Войти'
            />
            {error && <p className="processMessage">{message}</p>} 
        </div>
    )
}