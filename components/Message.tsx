import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type Props = {
    variant: 'green' | 'blue' | 'red';
    message: string;
};

const Message = ({ variant, message }: Props) => {
    return (
        <View>
            <Text style={{ color: variant, marginVertical: 20 }}>{message}</Text>
        </View>
    );
};

export default Message;

const styles = StyleSheet.create({});