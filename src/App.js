import React from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from "react-router-dom";
import { Provider } from 'react-redux';
import store from './redux/store';

import HeadLayout from './components/Layouts/HeadLayout.jsx';
import FormLayout from './components/Layouts/FormLayout.jsx';
import Home from './components/Home/Home.jsx';
import FormLoggin from './components/FormLoggin/FormLoggin.jsx';
import AuthForm from './components/FormLoggin/AuthForm/AufhForm.jsx';
import Registration from './components/FormLoggin/Registration/Registration.jsx';
import UserForm from './components/FormLoggin/UserForm/UserForm.jsx';
import Cases from './components/Cases/Cases.jsx';
import NotFound from './components/NotFound.jsx';

import './App.css';

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<HeadLayout/>}>
        <Route index element={<Home />}></Route> 
        <Route path='AuthForm' element={<FormLayout />}>
            <Route index element={<AuthForm />}></Route>
            <Route path='Registration' element={<Registration />}></Route>
            {/* <Route path='UserForm' element={<UserForm />}></Route> */}
        </Route>
        <Route path='Cases' element={<Cases />}></Route>
        <Route path="*" element={<NotFound />} />
        </Route>
    )
)

function App() {
    return (
        <Provider store={store}>

            <div className="App">
                <RouterProvider router={router} />
            </div>
        </Provider>
    );
}

export default App;
