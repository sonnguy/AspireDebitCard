import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from '../styles/colors';

const PrefixCard = () => {
  return (
    <View style={styles.prefixCard}>
      <Text style={styles.prefixCardText}>{'S$'}</Text>
    </View>
  );
};

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
    fontFamily: 'AvenirNext-Bold',
    fontSize: 13,
  },
});
