import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import PageNotFound from './components/PageNotFound';
import Password from './components/Password';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';
import UserName from './components/UserName';

//Authorizatin Middleware
import { AuthorizeUser, ProtectRoute } from './middleware/auth';


// root routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <UserName></UserName>
    },
    {
        path: '/register',
        element: <Register></Register>
    },
    {
        path: '/password',
        element: <ProtectRoute><Password/></ProtectRoute>
    },
    {
        path: '/profile',
        element: <AuthorizeUser><Profile/></AuthorizeUser>
    },
    {
        path: '/recovery',
        element: <Recovery></Recovery>
    },
    {
        path: '/reset',
        element: <Reset></Reset>
    },
    {
        path: '*',
        element: <PageNotFound></PageNotFound>
    },
])

function App() {
    return (
        <main>
            <RouterProvider router={router}></RouterProvider>
        </main>
    );
}

export default App;