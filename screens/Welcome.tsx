import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { AuthStackNavigationType } from '../navigators/authNavigator';
import { useNavigation } from '@react-navigation/native';
import Button from '../components/Button';

type Props = {};

const Welcome = (props: Props) => {
    const navigation: AuthStackNavigationType = useNavigation();

    const goToSignUp = () => {
        navigation.navigate("Signup");
    };

    const goToLogin = () => {
        navigation.navigate("Login");
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Our Forum</Text>

            <View style={styles.buttonContainer}>
                <Button onPress={goToSignUp} title='Signup' variant='green' />
                <Button onPress={goToLogin} title='Login' />
            </View>

        </View>
    );
};

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    },
    title: {
        fontSize: 25,
        textAlign: "center",
        marginBottom: 30
    },
    buttonContainer: {
        width: "100%",
        maxWidth: 200,
        marginLeft: 'auto',
        marginRight: 'auto',
        gap: 20,
    },
});