import React from 'react';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Welcome from '../screens/Welcome';

export type AuthScreenNamesTypes = ["Welcome", "Login", "Signup"];

export type AuthStackParamList = Record<AuthScreenNamesTypes[number], undefined>;

const AuthStack = createStackNavigator<AuthStackParamList>();
export type AuthStackNavigationType = NavigationProp<AuthStackParamList>;

type Props = {};

const AuthNavigator = ({ }: Props) => {
    return (
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen name="Welcome" component={Welcome} />
                <AuthStack.Screen name="Login" component={Login} />
                <AuthStack.Screen name="Signup" component={Signup} />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigator;