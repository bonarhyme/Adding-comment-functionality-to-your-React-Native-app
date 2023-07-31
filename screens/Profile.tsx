import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Button from '../components/Button';

type Props = {};

const Profile = (props: Props) => {
    const handleLogout = () => {
        signOut(auth);
    };
    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>
                    Hello,  {auth?.currentUser?.email}
                </Text>
            </View>

            <View style={styles.buttonContainer}>
                <Button title='Logout' variant='red' onPress={handleLogout} />
            </View>
        </View>
    );
};

export default Profile;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,

    },
    contentContainer: {
        flex: 1,
    },
    title: {
        fontSize: 20,
    },
    buttonContainer: {
        height: 50
    }
});