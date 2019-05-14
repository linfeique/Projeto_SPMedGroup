import {
    createAppContainer,
    createStackNavigator,
} from "react-navigation";

import Login from './pages/login';
import ListaMedicos from './pages/listaMedicos';
import ListaPacientes from './pages/listaPacientes';

const Stack = createStackNavigator({ Login, ListaMedicos, ListaPacientes })

export default createAppContainer(Stack);