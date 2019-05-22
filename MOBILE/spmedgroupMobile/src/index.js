import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator
} from "react-navigation";

import Login from './pages/login';
import ListaMedicos from './pages/listaMedicos';
import ListaPacientes from './pages/listaPacientes';
import ListaAdm from './pages/listaAdm';

const Stack = createStackNavigator({ Login, ListaMedicos, ListaPacientes, ListaAdm })

export default createAppContainer(Stack);