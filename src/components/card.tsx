import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../styles/colors';

const Card = (props: any) => {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={require('../assets/images/card-logo.png')} />
      </View>
      <View>
        <Text style={styles.cardName}>{'Mark Henry'}</Text>
        <Text style={styles.cardNumber}>{'9999  9999  9999  9999'}</Text>
        <View style={styles.cardExpAndCvv}>
          <Text style={styles.cardExpireDate}>{'Thru: 12/20'}</Text>
          <Text style={styles.cardCvv}>{'CVV: 222'}</Text>
        </View>
      </View>
      <View style={styles.cardFooter}>
        <Image source={require('../assets/images/visa-img.png')} />
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.secondary,
    padding: 20,
    borderRadius: 10,
    height: 200,
    marginTop: -14,
    justifyContent: 'space-between',
  },
  cardHeader: {
    alignItems: 'flex-end',
  },
  cardFooter: {
    alignItems: 'flex-end',
  },
  cardName: {
    fontFamily: 'AvenirNext-Bold',
    fontSize: 22,
    color: colors.textPrimary,
  },
  cardNumber: {
    fontSize: 14,
    color: colors.textPrimary,
    fontFamily: 'AvenirNext-Medium',
    marginTop: 25,
  },
  cardExpAndCvv: {
    flexDirection: 'row',
    marginTop: 15,
  },
  cardExpireDate: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  cardCvv: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: '600',
    paddingLeft: 30,
  },
});
