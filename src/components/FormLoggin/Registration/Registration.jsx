import React from 'react';
import {Formik, Form, Field } from 'formik';
import { fetchRegistration } from '../../../redux/slices/userSlise';
import * as yup from 'yup';

const registrationInner = [
  { id: 1, label: 'Имя', name: 'firstName', type: 'text' },
  { id: 2, label: 'Фамилия', name: 'lastName', type: 'text' },
  { id: 3, label: 'Email', name: 'email', type: 'text' },
  { id: 4, label: 'Пароль', name: 'password', type: 'password' },
  { id: 5, label: 'Client ID', name: 'clientId', type: 'text' },
];

const registrationFormValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  clientId: '',
};

const registrationValidationSchema = yup.object().shape({
  firstName: yup.string(),
  lastName: yup.string(),
  email: yup.string().email('Не корректный E-mail').required('Заполните поле'),
  password: yup.string().min(8, 'Минимум 8 символов').required('Заполните поле'),
  clientId: yup.string().required('Заполните поле'),
});

  const onRegisterHandler = async (values) => {
    dispatch(fetchRegistration(values))
      .then((data) => {
        if ('error' in data) {
          setMessage('Пользователь уже зарегистрирован');
        } else {
          setMessage('Вы успешно зарегистрированы');
          navigate('/login');
        }
      })
      .catch(() => {
        setMessage('Ошибка работы сервера');
      });
  };
export default function Registration() {
  return (
      <div className="registration">
          <h2>Registration</h2>  
              <div>
      <Formik
        initialValues={registrationFormValues}
        onSubmit={(values) => {
          onSubmit(values);
        }}
        validationSchema={validationSchema}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isValid = isValided,
          dirty = isDirty,
        }) => (
          <Form className='form'>
            <div className='formName'>{formName}</div>
            {registrationInner.map((el) => (
<div className={styles.formInputWrapper}>
      <label htmlFor={el.name}>{el.label}:</label>
      <Field
        type={el.type}
        onBlur={el.onBlur}
        onChange={el.onChange}
        name={el.name}
        value={!values[`${el.name}`] ? '' : values[`${el.name}`]}
        className={styles.formInput}
      />
      {touched[`${el.name}`] && errors[`${el.name}`] && (
        <p className="error-message">{errors[`${el.name}`]}</p>
      )}
    </div>
            ))}
            {children}
                <button disabled={!isValid && !dirty} type="submit" className={styles.formSubmit}>
      {el.name}
    </button>
          </Form>
        )}
      </Formik>
      {message && <p className="process-message">{message}</p>}
    </div>
          
          
          
          
          <section>
        <Form
          fields={registrationFields}
          formValues={registrationFormValues}
          validationSchema={registrationValidationSchema}
          onSubmit={onRegisterHandler}
          submitName="Зарегистрироваться"
          formName="Регистрация"
          message={message}
        />
    </section>
    </div>
  )
}