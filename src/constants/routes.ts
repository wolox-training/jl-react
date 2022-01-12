import SignUp from 'screens/SignUp';
import Login from 'screens/Login';
import Home from 'screens/Home';

export const ROUTES = [
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/sign_up',
    name: 'signUp',
    component: SignUp
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  }
];
