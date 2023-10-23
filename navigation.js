// Navigation.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import SignUp from './screens/signup';
import Home from './screens/home';
import Group from './screens/group';
import Meal from './screens/meal';

const Stack = createStackNavigator();

const Navigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="signup" component={SignUp} options={{ headerShown: true }} />
                <Stack.Screen name="Home" component={Home} options={{ headerShown: true }} />
                <Stack.Screen name="Group" component={Group} options={{ headerShown: false }} />

                {/* Nav to meal screen not working */}
                <Stack.Screen name="Meal" component={Meal} options={{ headerShown: true }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Navigation;
