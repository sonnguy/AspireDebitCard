import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import colors from '../styles/colors';

export interface CardInfoProps {
  cardInfo: CardInfo;
  hideCardNumber: boolean;
}
export interface CardInfo {
  cardName: string;
  cardNumber: string;
  cardExpireDate: string;
  cardCVV: string;
}

const Card = ({cardInfo, hideCardNumber}: CardInfoProps) => {
  const {cardName, cardNumber, cardExpireDate, cardCVV} = cardInfo;
  const cardNumberHidden = '****************';

  const getCardNumberArr = (str: string) => {
    return str ? str.match(/.{1,4}/g) : [];
  };

  const numbers = getCardNumberArr(
    hideCardNumber ? cardNumberHidden : cardNumber,
  );

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Image source={require('../assets/images/card-logo.png')} />
      </View>
      <View>
        <Text style={styles.cardName}>{cardName}</Text>
        <View style={styles.cardNumberContainer}>
          {numbers?.map((num, index) => (
            <Text key={index} style={styles.cardNumber}>
              {num}
            </Text>
          ))}
        </View>
        <View style={styles.cardExpAndCvv}>
          <Text style={styles.cardExpireDate}>{`Thru: ${cardExpireDate}`}</Text>
          <Text style={styles.cardCvv}>{`CVV: ${cardCVV}`}</Text>
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
  cardNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  cardNumber: {
    fontSize: 14,
    color: colors.textPrimary,
    fontFamily: 'AvenirNext-Medium',
    fontWeight: '600',
    marginTop: 25,
  },
  cardExpAndCvv: {
    flexDirection: 'row',
    fontFamily: 'AvenirNext-Medium',
    fontWeight: '600',
    marginTop: 15,
  },
  cardExpireDate: {
    fontSize: 13,
    color: colors.textPrimary,
    fontFamily: 'AvenirNext-Medium',
    fontWeight: '600',
  },
  cardCvv: {
    fontSize: 13,
    color: colors.textPrimary,
    fontFamily: 'AvenirNext-Medium',
    paddingLeft: 30,
    fontWeight: '600',
  },
});
