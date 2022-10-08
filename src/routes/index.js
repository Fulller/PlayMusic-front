import { Home, Register, Login } from '../pages';
import MainLayout from '../layouts/MainLayout';

let Route = [
    {
        path: '/',
        element: (
            <MainLayout>
                <Home></Home>
            </MainLayout>
        ),
    },
    {
        path: '/home',
        element: (
            <MainLayout>
                <Home></Home>
            </MainLayout>
        ),
    },
    {
        path: '/register',
        element: <Register></Register>,
    },
    {
        path: '/login',
        element: <Login></Login>,
    },
];
export default Route;
