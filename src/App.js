import React, {
    useEffect,
    lazy,
    Suspense
} from 'react';
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
} from "react-router-dom";
import { Provider } from 'react-redux';
import { BeatLoader } from 'react-spinners';

import store from './redux/store';
import { getToken } from './services/token';
import { fetchAccec } from './redux/slices/authSlice';

import HeadLayout from './components/Layouts/HeadLayout.jsx';
import FormLayout from './components/Layouts/FormLayout.jsx';
// import Home from './components/Home/Home.jsx';
// import FormLoggin from './components/FormLoggin/FormLoggin.jsx';
// import AuthForm from './components/FormLoggin/AuthForm/AufhForm.jsx';
// import Registration from './components/FormLoggin/Registration/Registration.jsx';
// import Officers from './components/Officers/Officers.jsx';
// import Cases from './components/Cases/Cases.jsx';
// import NotFound from './components/NotFound.jsx';
// import OfficerInner from './components/OfficerInner/OficerInner.jsx';
// import Details from './components/Details/Details.jsx';

import './App.css';

const Home = lazy(() => import('./components/Home/Home.jsx'));
const Officers = lazy(() => import('./components/Officers/Officers.jsx'));
const AuthForm = lazy(() => import('./components/FormLoggin/AuthForm/AufhForm.jsx'));
const Registration = lazy(() => import('./components/FormLoggin/Registration/Registration.jsx'));
const Cases = lazy(() => import('./components/Cases/Cases.jsx'));
const NotFound = lazy(() => import('./components/NotFound.jsx'));
const OfficerInner = lazy(() => import('./components/OfficerInner/OficerInner.jsx'));
const Details = lazy(() => import('./components/Details/Details.jsx'));

// if (getToken()) {
//     // console.log(store.dispatch);
//     //state проверяй
//     store.dispatch(fetchAccec());
//     console.log("store")
// };

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<HeadLayout />}>
            {/* <Suspense fallback={<BeatLoader color="var(--primary)" />}> */}
            <Route index element={<Home />}></Route>
            <Route path='officers' element={
                <Suspense fallback={<BeatLoader color="var(--primary)" />}>
                    <Officers />
                </Suspense>}>
            </Route >
            <Route path={`/officers/:id`} type='officers' element={<Details />}></Route>
            <Route path='authForm' element={<FormLayout />}>
                <Route index element={<AuthForm />}></Route>
                <Route path='registration' element={<Registration />}></Route>

                {/* <Route path='UserForm' element={<UserForm />}></Route> */}
            </Route>
            <Route path='cases' element={
                <Suspense fallback={<BeatLoader color="var(--primary)" />}>
                    <Cases />
                </Suspense>
            }>

            </Route>
            <Route path="*" element={<NotFound />} />
            {/* </Suspense> */}

        </Route >
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
