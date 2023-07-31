import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { RouteProp, useRoute } from '@react-navigation/native';
import { PostType } from './Home';
import Button from '../components/Button';
import Message from '../components/Message';
import CommentsModal from '../components/CommentsModal';

type Props = {};



const SinglePost = (props: Props) => {
    const route = useRoute<RouteProp<{ params: { id: string; }; }>>();
    const id = route.params.id;

    const [post, setPost] = useState<PostType>();
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [commentsTotal, setCommentsTotal] = useState<number>(0);

    const getPosts = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const postDoc = doc(db, 'posts', id);
            const data = await getDoc(postDoc);

            const item = data?.data() as Omit<PostType, "id">;
            setPost({ ...item, id });
            setSuccess(true);

        } catch (error: any) {
            setSuccess(false);
            setError(error?.message || "An error occured while fetching comment");
        }
        setLoading(false);

    };

    useEffect(() => {
        getPosts();
    }, [id]);


    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator size='large' /> : null}
            {error ? <Message message={error} variant='red' /> : null}


            {Boolean(post) ? <ScrollView>
                <Text style={styles.title}>{post?.title}</Text>
                <Text>{post?.details}</Text>

                <View style={styles.line} />
                <View style={styles.commentButtonContainer}>

                    <Button variant='info' title={`Comments`} onPress={() => {
                        setModalVisible(true);
                    }} width={100} />
                    <Text> ({commentsTotal}) Comments</Text>
                </View>
            </ScrollView> : null}
            <CommentsModal modalVisible={modalVisible} setModalVisible={setModalVisible} setCommentsTotal={setCommentsTotal} postId={id} />

        </View>
    );
};

export default SinglePost;

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        marginBottom: 10
    },
    line: {
        borderWidth: 0.5,
        borderColor: '#bbbbbb',
        width: '100%',
        marginVertical: 20,
    },
    commentButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    }


});