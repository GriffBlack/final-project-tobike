import { Formik, Form, Field } from 'formik'

import css from './form-input.module.scss';

export default function FormInput({
    logginHandler,
    registrationValidationSchema,
    authInner,
    btnName,
    initialValues,
}) {
    return (
            <Formik
                initialValues={initialValues}
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
                    <Form className={css.form}>
                        {authInner.map((elem) => (
                            <div className={css.formWrapper} key={elem.id}>
                                <label htmlFor={elem.name}>{elem.label}</label>
                                <Field
                                    type={elem.type}
                                    name={elem.name}
                                    className={css.formName}
                                    // onBlur={handleBlur}
                                    onChange={handleChange}
                                    // values={`${elem.name}`}
                                    ></Field>
                                {touched[`${elem.name}`] && errors[`${elem.name}`] &&
                                (
                                    <p className={css.errorMessage}>{errors[`${elem.name}`]}</p>
                                )}
                            </div>
                        ))}
                        <button className={css.btnInput} disabled={!isValid || !dirty}>{btnName}</button>
                    </Form>
                )}
            </Formik>
        )
    }