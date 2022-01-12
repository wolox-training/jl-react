import SignUp from 'screens/SignUp';
import Login from 'screens/Login';
import Home from 'screens/Home';

export const ROUTES = [
  {
    path: '/',
    name: 'login',
    component: Login,
    isPublic: true
  },
  {
    path: '/sign_up',
    name: 'signUp',
    component: SignUp,
    isPublic: true
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    isPublic: false
  }
];
