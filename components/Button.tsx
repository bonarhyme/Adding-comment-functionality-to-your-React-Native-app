import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';


type Props = {
    variant?: 'green' | 'blue' | 'red' | 'gray' | 'info' | 'dark-red';
    title: string;
    onPress: () => void;
    width?: string | number;
    height?: string | number;
    paddingVertical?: number,

    disabled?: boolean;
};

const colors = {
    blue: '#007bff',
    green: "#28a745",
    red: "#dc3545",
    gray: '#6c757d',
    info: "#17a2b8",
    'dark-red': '#8b0000'
};

const Button = ({ variant = "blue", title, onPress, width = "100%", height = 'auto', paddingVertical = 10, disabled = false }: Props) => {

    return (
        <TouchableOpacity style={{ backgroundColor: colors[variant], alignItems: 'center', paddingVertical, borderRadius: 8, width, height }} onPress={onPress} disabled={disabled}>
            <Text style={{ color: 'white' }}>
                {title}
            </Text>
        </TouchableOpacity>

    );
};

export default Button;

const styles = StyleSheet.create({});