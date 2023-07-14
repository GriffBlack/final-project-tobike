import React from 'react';
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
// const setInitialValues = (values) => {
//     values.map((elem) => {
//         // Object.entries(elem).map((key, value) => [key, value])
//         // console.log(elem);
//         return elem.name;
//         // return elem.name + ': "",';
//     }).reducer((acc, arr) => return acc:);
// }

export default function AuthForm() {
    const { status, error, user } = useSelector(state => state.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logginHandler = async (data) => {
        // console.log(data);
        dispatch(fetchAuth(data));
        // console.log(auth);
        navigate('/');
        
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
            {/* {console.log(authInner.map((elem) => {
                    return elem.name + ': "",';
            }))}
            {console.log(authInner)} */}
            {/* <Formik
                initialValues=
                {{
                    email: '',
                    password: '',
                }}
                onSubmit={logginHandler}
                validationSchema={registrationValidationSchema}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isValid,
                    dirty,
                }) => (
                    <Form className='formAuth'>
                        {authInner.map((elem) => (
                            <div className="formWrapper" key={elem.id}>
                                <label htmlFor={elem.name}>{elem.label}</label>
                                <Field
                                    type={elem.type}
                                    name={elem.name}
                                    className='formInput'
                                    // onBlur={handleBlur}
                                    onChange={handleChange}
                                    // values={`${elem.name}`}
                                ></Field>
                                {touched[`${elem.name}`] && errors[`${elem.name}`] && (
                                    <p className="error-message">{errors[`${elem.name}`]}</p>
                                )}
                            </div>
                        ))}
                        <button disabled={!isValid || !dirty}>Войти</button>
                    </Form>
                )}
            </Formik> */}
            {/* {user && console.log(user)} */}
            {error && <p className="process-message">{error}</p>}
        </div>
    )
}