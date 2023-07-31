import { ActivityIndicator, Alert, FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { HomeStackNavigationType } from '../navigators/homeNavigator';
import Message from '../components/Message';
import Button from '../components/Button';

type Props = {};

export type PostType = {
    id: string;
    title: string;
    details: string;
    author: {
        email: string;
        id: string;
    };
};

const Home = (props: any) => {
    const navigation: HomeStackNavigationType = useNavigation();

    const [postLists, setPostLists] = useState<PostType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const [loadingDeletePost, setLoadingDeletePost] = useState<boolean>(false);
    const [successDeletePost, setSuccessDeletePost] = useState<boolean>(false);
    const [errorDeletePost, setErrorDeletePost] = useState<string>('');

    const [refreshing, setRefreshing] = useState<boolean>(false);


    const goToPost = (id: string) => {
        navigation.navigate('Single Post', { id });
    };
    const postsCollection = collection(db, 'posts');

    const getPosts = async () => {
        setLoading(true);
        setError('');
        setSuccess(false);
        try {
            const data = await getDocs(postsCollection);

            const _data: PostType[] = data?.docs?.map((doc) => {
                const item = doc.data() as Omit<PostType, "id">;

                return {
                    id: doc?.id,
                    ...item
                };
            });
            setSuccess(true);
            setLoading(false);
            setPostLists(_data);
            setRefreshing(false);
        } catch (error: any) {
            setSuccess(false);
            setError(error?.message || "An error occured while fetching post");
        }
        setLoading(false);
    };

    const deletePost = async (postId: string, title: string) => {
        Alert.alert('Delete Post', title, [
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {
                    setLoadingDeletePost(true);
                    setErrorDeletePost('');
                    setSuccessDeletePost(false);
                    try {

                        const postDoc = doc(db, 'posts', postId);
                        await deleteDoc(postDoc);

                        setSuccessDeletePost(true);
                        getPosts();
                    } catch (error: any) {
                        setSuccessDeletePost(false);
                        setErrorDeletePost(error?.message || "An error occured while deleting comment");
                    }
                    setLoadingDeletePost(false);
                }
            },
        ]);



    };

    useEffect(() => {
        getPosts();
    }, []);


    return (
        <View style={styles.container}>
            {loading ? <ActivityIndicator size='large' /> : null}
            {error ? <Message message={error} variant='red' /> : null}
            {success ? <View>
                <FlatList
                    data={postLists}
                    renderItem={({ item }) => {
                        return <View style={styles.postContainer}>
                            <View>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.title} onPress={() => goToPost(item?.id)}>{item?.title}</Text>
                                    {auth && item?.author.id === auth.currentUser?.uid && <Button
                                        variant='red' title='Remove'
                                        onPress={() => { deletePost(item?.id, item?.title); }}
                                        width={70}
                                        height={25}
                                        paddingVertical={4} />}
                                </View>
                            </View>
                            <Text style={styles.description}>{item?.details?.slice(0, 100)}</Text>

                        </View>;
                    }}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={() => <Text>There are no posts at the moment</Text>}
                    ItemSeparatorComponent={() => <View style={styles.line} />}
                    refreshControl={<RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => {
                            setRefreshing(true);
                            getPosts();
                        }}
                    />}

                />
            </View> : null}
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        margin: 10
    },
    postContainer: {
    },
    title: {
        fontSize: 20,
        flex: 1
    },
    description: {
        color: "#222222"
    },
    line: {
        borderWidth: 0.5,
        borderColor: '#bbbbbb',
        width: '100%',
        marginVertical: 20,

    }

});