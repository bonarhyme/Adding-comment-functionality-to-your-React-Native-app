import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { CommentType } from './CommentsModal';
import Button from './Button';
import { auth } from '../firebase';

type Props = {
    item: CommentType;
    deleteComment: (commentId: string, details: string) => void;
    loadingDeleteComments: boolean;
};

const Comment = ({ item, deleteComment, loadingDeleteComments }: Props) => {

    return (
        <View>
            <TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.email}>{item.author.email}</Text>
                    {auth && item?.author.id === auth.currentUser?.uid && <Button
                        variant='red' title='Remove'
                        onPress={() => { deleteComment(item?.id, item?.details?.slice(0, 40) + '...'); }}
                        width={70}
                        height={25}
                        paddingVertical={4} />}
                </View>
                <Text>{item.details}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Comment;

const styles = StyleSheet.create({
    email: {
        color: '#111111',
        fontWeight: '600',
        marginBottom: 5
    },
    details: {

    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 10,
        width: 200,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

});