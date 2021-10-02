import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

const PrefixCard = () => {
    return (
        <View style={styles.prefixCard}>
            <Text style={styles.prefixCardText}>{'$$'}</Text>
        </View>
    )
}

export default PrefixCard;

const styles = StyleSheet.create({
    prefixCard: {
        borderRadius: 4,
        backgroundColor: colors.secondary,
    },
    prefixCardText: {
        color: colors.textPrimary,
        paddingVertical: 3,
        paddingHorizontal: 12,
        fontWeight: '900',
        fontSize: 13,
    },
});