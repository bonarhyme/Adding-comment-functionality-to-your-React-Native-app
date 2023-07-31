import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Message from '../components/Message';
import Input from '../components/Input';
import Button from '../components/Button';
import { useNavigation } from '@react-navigation/native';
import { AppTabNavigationType } from '../navigators/appTabNavigator';

type Props = {};

const CreatePost = (props: Props) => {
    const navigation: AppTabNavigationType = useNavigation();

    const [title, setTitle] = useState<string>('');
    const [details, setDetails] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [data, setData] = useState<any>();

    const postsCollection = collection(db, 'posts');

    const handleSubmitPost = async () => {
        if (!details || !title) {
            return;
        }
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const postItem = {
                title,
                details,
                author: {
                    email: auth?.currentUser?.email,
                    id: auth?.currentUser?.uid,
                },
            };
            const response = await addDoc(postsCollection, postItem);

            setData(response?.id);
            setSuccess(true);
            setTitle('');
            setDetails('');
        } catch (error: any) {
            setSuccess(false);
            setError(error?.message || "An error occured while creating post");
        }
        setLoading(false);
    };

    useEffect(() => {
        let timeout: ReturnType<typeof setTimeout>;
        if (success) {
            timeout = setTimeout(() => {
                setSuccess(false);
                navigation.navigate('Home');
            }, 2000);
        }

        return () => clearTimeout(timeout);
    }, [success]);

    return (
        <View>
            <View style={styles.container}>
                {error ? <Message message={error} variant='red' /> : null}
                {success ? <Message message={"Post created successfully"} variant='green' /> : null}
                {loading ? <ActivityIndicator size='large' /> : null}
                <Input label='Title' value={title} onChangeText={(text) => setTitle(text)} />
                <Input label='Details' value={details} onChangeText={(text) => setDetails(text)} multiline numberOfLines={5} style={styles.textArea} />
                <Button title='Submit' onPress={handleSubmitPost} />
            </View>
        </View>
    );
};

export default CreatePost;

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
    },
    textArea: {
        textAlignVertical: 'top',
        height: 200
    }
});
