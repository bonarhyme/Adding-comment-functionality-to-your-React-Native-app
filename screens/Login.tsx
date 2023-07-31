import { ActivityIndicator, StyleSheet, Text, TextInput, View, } from 'react-native';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { auth } from '../firebase';
import { storeDataInStorage } from '../storage/localStorage';
import Input from '../components/Input';
import { useNavigation } from '@react-navigation/native';
import { AuthStackNavigationType } from '../navigators/authNavigator';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Message from '../components/Message';
import Button from '../components/Button';

type Props = {
    setIsLoggedIn?: Dispatch<SetStateAction<boolean>>;
};

const Login = ({ setIsLoggedIn }: Props) => {
    const navigation: AuthStackNavigationType = useNavigation();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const goToSignUp = () => {
        navigation.navigate("Signup");
    };

    const handleSignIn = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);

            setSuccess(true);
            await storeDataInStorage("USER_AUTH", result?.user);
        } catch (error: any) {
            setSuccess(false);
            setError(error?.message || "An error occured while signing up");
        }
        setLoading(false);
    };


    return (
        <View>
            <View style={styles.container}>
                {error ? <Message message={error} variant='red' /> : null}
                {loading ? <ActivityIndicator size='large' /> : null}
                <Input label='Email' value={email} onChangeText={(text) => setEmail(text)} />
                <Input label='Password' value={password} onChangeText={(text) => setPassword(text)} secureTextEntry />
                <Button title='Login' onPress={handleSignIn} />
                <Text style={styles.promptContainer}>Don't have an account? <Text style={styles.prompt} onPress={goToSignUp}>Signup</Text></Text>
            </View>
        </View>
    );
};

export default Login;

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        width: "100%",
        maxWidth: 350,
        marginLeft: "auto",
        marginRight: "auto"
    },
    promptContainer: {
        marginTop: 20
    },
    prompt: {
        color: "blue",
        textDecorationLine: "underline"
    }
});