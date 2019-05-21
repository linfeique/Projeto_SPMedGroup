import {
    createAppContainer,
    createStackNavigator,
    createSwitchNavigator,
    createBottomTabNavigator
} from "react-navigation";

import Login from './pages/login';
import ListaMedicos from './pages/listaMedicos';
import ListaPacientes from './pages/listaPacientes';

const Stack = createStackNavigator({ Login })

const MainNavigator = createBottomTabNavigator(
    {
        ListaMedicos,
        ListaPacientes
    },

    {
        initialRouteName: "ListaMedicos",
        swipeEnabled: true,
        tabBarOptions: {
            showLabel: true,
            showIcon: false,
            inactiveBackgroundColor: "#dd99ff",
            activeBackgroundColor: "#B727FF",
            activeTintColor: "#FFFFFF",
            inactiveTintColor: "#FFFFFF",
            style: {
                height: 50
            }
        }
    }
);

export default createAppContainer(
    createSwitchNavigator(
        {
            Stack,
            MainNavigator
        },

        {
            initialRouteName: "MainNavigator"
        }
    )
);