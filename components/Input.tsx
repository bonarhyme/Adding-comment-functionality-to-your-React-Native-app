import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';
import React from 'react';

type Props = TextInputProps & {
    label: string;
};

const Input = ({ label, ...textInputProps }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>{label}</Text>
            <TextInput {...textInputProps} placeholder={'Enter ' + label} style={[styles.textInput, textInputProps.style]} />
        </View>
    );
};

export default Input;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 20
    },
    label: {
        fontSize: 16,
        color: "#333",
        marginBottom: 5
    },
    textInput: {
        borderWidth: 1,
        borderColor: "#222",
        borderRadius: 8,
        fontSize: 18,
        paddingLeft: 5,
        paddingVertical: 5,

    }
});