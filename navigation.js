// Navigation.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import SignUp from './screens/signup';
import Home from './screens/home';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="signup" component={SignUp} />
                <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
