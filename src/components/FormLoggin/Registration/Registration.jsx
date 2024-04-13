import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchRegistration } from '../../../redux/slices/authSlice.js';
import * as yup from 'yup';

import FormInput from '../../FormInput/FormInput.jsx';


const registrationInner = [
  { id: 1, label: 'Имя', name: 'firstName', type: 'text' },
  { id: 2, label: 'Фамилия', name: 'lastName', type: 'text' },
  { id: 3, label: 'Email', name: 'email', type: 'text' },
  { id: 4, label: 'Пароль', name: 'password', type: 'password' },
  { id: 5, label: 'Повторите пароль', name: 'confirmPassword', type: 'password' },
  { id: 6, label: 'Client ID', name: 'clientId', type: 'text' },
];
// const setInitialValues = (values) => {
//     values.map((elem) => {
//         return elem.name;
//     });
// }

const registrationValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    clientId: '',
};

const registrationValidationSchema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string()
        .email('Не корректный E-mail')
        .required('Заполните поле'),
    password: yup.string()
        .min(8, 'Минимум 8 символов')
        .required('Заполните поле'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password')], 'Пароли не совпадают')
        .required('Заполните поле'),
    clientId: yup.string()
        .required('Заполните поле'),
});
export default function Registration({children}) {
    const [message, setMessage] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const onRegisterHandler = async (values) => {
      dispatch(fetchRegistration(values))
        .then((data) => {
          if ('error' in data) {
            setMessage('Пользователь уже зарегистрирован');
          } else {
            setMessage('Вы успешно зарегистрированы');
            navigate('/AuthForm');
          }
        })
        .catch(() => {
          setMessage('Ошибка работы сервера');
        });
    };
    // console.log(setInitialValues(registrationInner));
    return (
    //   <div className="reg">rert</div>
      <div className="registration">
            <h2>Регистрация</h2>
            <FormInput
                logginHandler={onRegisterHandler}
                registrationValidationSchema={registrationValidationSchema}
                authInner={registrationInner}
                initialValues={registrationValues}
                btnName='Зарегистрироваться'
            />
              {/* <div> */}
      {/* <Formik
        initialValues={registrationValues}
        onSubmit={onRegisterHandler}
        validationSchema={registrationValidationSchema}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid,
          dirty,
        }) => (
          <Form className='form'>
            <div className='formName'>formName</div>
            {registrationInner.map((el) => (
<div className='formInputWrapper' key={el.id}>
      <label htmlFor={el.name}>{el.label}:</label>
                    <Field
        type={el.type}
        onBlur={handleBlur}
        onChange={handleChange}
        name={el.name}
        value={!values[`${el.name}`] ? '' : values[`${el.name}`]}
        className='formInput'
      />
      {touched[`${el.name}`] && errors[`${el.name}`] && (
        <p className="error-message">{errors[`${el.name}`]}</p>
      )}
    </div>
            ))}
                            {children}
                            <div>
                <button disabled={!isValid || !dirty} type="submit" className="Зарегистрироваться">
      "Зарегистрироваться"
    </button></div>
          </Form>
        )}
      </Formik>
      {message && <p className="process-message">{message}</p>}
    </div> */}
          
          
          
          
          {/* <section>
        <Form
          fields={registrationFields}
          formValues={registrationFormValues}
          validationSchema={registrationValidationSchema}
          onSubmit={onRegisterHandler}
          submitName="Зарегистрироваться"
          formName="Регистрация"
          message={message}
        />
    </section> */}
    </div>
  )
}