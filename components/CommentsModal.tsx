import { ActivityIndicator, Alert, FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal } from 'react-native';
import Button from './Button';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../firebase';
import Message from './Message';
import Input from './Input';
import Comment from './Comment';

export type CommentType = {
    id: string;
    details: string;
    post: {
        id: string;
    };
    author: {
        email: string;
        id: string;
    };
};

type Props = {
    modalVisible: boolean;
    setModalVisible: Dispatch<SetStateAction<boolean>>;
    postId: string;
    setCommentsTotal: Dispatch<SetStateAction<number>>;
};


const CommentsModal = ({ modalVisible, setModalVisible, setCommentsTotal, postId }: Props) => {

    const [details, setDetails] = useState<string>('');
    const [toggleCommentInput, setToggleCommentInput] = useState<boolean>(false);

    const [loadingAddComment, setLoadingAddComment] = useState<boolean>(false);
    const [successAddComment, setSuccessAddComment] = useState<boolean>(false);
    const [errorAddComment, setErrorAddComment] = useState<string>('');

    const [comments, setComments] = useState<CommentType[]>([]);
    const [loadingGetComments, setLoadingGetComments] = useState<boolean>(false);
    const [successGetComments, setSuccessGetComments] = useState<boolean>(false);
    const [errorGetComments, setErrorGetComments] = useState<string>('');

    const [loadingDeleteComments, setLoadingDeleteComments] = useState<boolean>(false);
    const [successDeleteComments, setSuccessDeleteComments] = useState<boolean>(false);
    const [errorDeleteComments, setErrorDeleteComments] = useState<string>('');


    const commentsCollection = collection(db, 'comments');

    const addComment = async () => {
        setLoadingAddComment(true);
        setErrorAddComment('');
        setSuccessAddComment(false);
        try {
            const commentItem = {
                details,
                post: {
                    id: postId
                },
                author: {
                    email: auth?.currentUser?.email,
                    id: auth?.currentUser?.uid,
                },
            };

            await addDoc(commentsCollection, commentItem);
            setSuccessAddComment(true);

            setDetails('');
        } catch (error: any) {
            setSuccessAddComment(false);
            setErrorAddComment(error?.message || "An error occured while adding comment");

        }
        setLoadingAddComment(false);
    };


    const getComments = async () => {
        setLoadingGetComments(true);
        setErrorGetComments('');
        setSuccessGetComments(false);
        try {
            const postDoc = query(commentsCollection, where("post.id", "==", postId));
            const data = await getDocs(postDoc);
            const itemsList: any = [];
            data.forEach((doc) => {
                itemsList.push({ ...doc.data(), id: doc.id });
            });

            setComments(itemsList);
            setSuccessGetComments(true);
            setCommentsTotal(itemsList?.length);

        } catch (error: any) {
            setSuccessGetComments(false);
            setErrorGetComments(error?.message || "An error occured while fetching comment");
        }
        setLoadingGetComments(false);

    };

    const deleteComment = async (commentId: string, details: string) => {

        Alert.alert('Delete Comment', details, [
            {
                text: 'Cancel',
                onPress: () => { },
                style: 'cancel',
            },
            {
                text: 'OK', onPress: async () => {

                    setLoadingDeleteComments(true);
                    setErrorDeleteComments('');
                    setSuccessDeleteComments(false);
                    try {

                        const postDoc = doc(db, 'comments', commentId);
                        await deleteDoc(postDoc);

                        setSuccessDeleteComments(true);
                    } catch (error: any) {
                        setSuccessDeleteComments(false);
                        setErrorDeleteComments(error?.message || "An error occured while deleting comment");
                    }
                    setLoadingDeleteComments(false);
                }
            },
        ]);



    };

    useEffect(() => {
        getComments();
    }, [successAddComment, successDeleteComments]);

    return (

        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}

        >

            <View style={styles.centeredView}>
                <View style={styles.commentInputContainer}>
                    <View style={{ alignItems: 'flex-end' }}>
                        <Button
                            variant='gray' title='Close'
                            onPress={() => { setModalVisible(!modalVisible); }} width={50} paddingVertical={4} />
                    </View>
                    {!toggleCommentInput ? <Button variant='info' title='Add a comment' onPress={() => setToggleCommentInput(true)} width={150} /> : null}
                    {loadingAddComment ? <ActivityIndicator size='large' /> : null}
                    {errorAddComment ? <Message message={errorAddComment} variant='red' /> : null}

                    {toggleCommentInput ? <View>
                        <Input label='Add a comment' value={details} onChangeText={(text) => setDetails(text)} multiline numberOfLines={4} style={styles.textArea} />
                        <View style={styles.buttonContainer}>
                            <Button variant='gray' title='Cancel' onPress={() => {
                                setToggleCommentInput(false);
                            }} width={100} />
                            <Button variant='blue' title='Submit' onPress={() => {
                                setToggleCommentInput(false);
                                addComment();
                            }} width={100} disabled={!details || loadingAddComment} />
                        </View>
                    </View> : null}
                </View>
                <View style={styles.line} />

                {loadingGetComments ? <ActivityIndicator size='large' /> : null}
                {errorGetComments ? <Message message={errorGetComments} variant='red' /> : null}

                <FlatList
                    data={comments}
                    renderItem={({ item }) => <Comment item={item} deleteComment={deleteComment} loadingDeleteComments={loadingDeleteComments} />}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={styles.line} />}
                    ListEmptyComponent={() => <Text>There are no comments available</Text>}
                />
            </View>
        </Modal>
    );
};

export default CommentsModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: 'white',
        padding: 10,
        marginTop: Platform.OS === 'ios' ? 50 : 20
    },
    commentInputContainer: {
    },
    textArea: {
        textAlignVertical: 'top',
        height: 100
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    line: {
        borderWidth: 0.5,
        borderColor: '#bbbbbb',
        width: '100%',
        marginVertical: 20,
    },
});