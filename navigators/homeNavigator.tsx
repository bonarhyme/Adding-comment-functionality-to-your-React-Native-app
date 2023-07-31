import React from 'react';
import { NavigationProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';;
import Home from '../screens/Home';
import SinglePost from '../screens/SinglePost';

export type HomeScreenNamesTypes = ["Home Landing", "Single Post"];

export type RootStackParamList = Record<HomeScreenNamesTypes[number], { id?: string; }>;

const HomeStack = createStackNavigator<RootStackParamList>();
export type HomeStackNavigationType = NavigationProp<RootStackParamList>;

type Props = {
};

const HomeNavigator = ({ }: Props) => {
    return (
        <HomeStack.Navigator screenOptions={{ headerBackTitle: "" }}>
            <HomeStack.Screen name="Home Landing" component={Home} options={{ title: 'Forum' }} />
            <HomeStack.Screen name="Single Post" component={SinglePost} />
        </HomeStack.Navigator>
    );
};

export default HomeNavigator;