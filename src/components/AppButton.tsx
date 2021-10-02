import React from 'react';
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import colors from '../styles/colors';

export interface ButtonProps {
  title: string;
  bgColor: string;
  color: string;
  textSize: number;
  width: number;
  onPress: any;
}

const AppButton = ({
  onPress,
  title,
  bgColor,
  color,
  textSize,
  width,
}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[
      styles.appButtonContainer,
      {backgroundColor: bgColor || colors.secondary},
    ]}>
    <Text style={[styles.appButtonText, {color, fontSize: textSize, width}]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export default AppButton;

const styles = StyleSheet.create({
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent:'center',
    alignItems:'center'
  },
  appButtonText: {
    fontSize: 14,
    alignSelf: 'center',
    fontFamily: 'AvenirNext-Bold',
  },
});
