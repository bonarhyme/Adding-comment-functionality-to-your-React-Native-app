import { Entypo } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, NavigationProp } from "@react-navigation/native";
import { StyleSheet } from "react-native";
import CreatePost from "../screens/CreatePost";
import Profile from "../screens/Profile";
import HomeNavigator from "./homeNavigator";


export type AppScreenNamesTypes = ["Home", "Create Post", "Profile"];

export type RootStackParamList = Record<AppScreenNamesTypes[number], any>;
const Tab = createBottomTabNavigator<RootStackParamList>();

export type AppTabNavigationType = NavigationProp<RootStackParamList>;


export const AppTabNavigation = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={({ route }) => ({
                    tabBarHideOnKeyboard: true,
                    tabBarStyle: styles.tabBarStyle,
                    tabBarLabelStyle: styles.tabLabelStyle,
                    tabBarActiveTintColor: "#FF5E00",
                    tabBarInactiveTintColor: "#6D3805",
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === "Home") {
                            iconName = <Entypo name="home" size={20} color={focused ? "#FF5E00" : "#6D3805"} />;
                        }

                        if (route.name === "Create Post") {
                            iconName = <Entypo name="edit" size={20} color={focused ? "#FF5E00" : "#6D3805"} />;
                        }

                        if (route.name === "Profile") {
                            iconName = <Entypo name="user" size={20} color={focused ? "#FF5E00" : "#6D3805"} />;
                        }

                        return iconName;
                    }
                })}
            >
                <Tab.Screen name="Home" component={HomeNavigator} options={{ headerShown: false }} />
                <Tab.Screen name="Create Post" component={CreatePost} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    tabImage: { width: 18, height: 18 },
    tabLabelStyle: {
        fontSize: 10,
        textTransform: 'capitalize',
        fontWeight: "500"
    },
    tabBarStyle: {
        borderColor: '#E9E9E9',
        paddingVertical: 10,
        paddingBottom: 20,
        height: 70,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
    }
});
