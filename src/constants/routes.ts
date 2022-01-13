import SignUp from 'screens/SignUp';
import Login from 'screens/Login';

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
  }
];
