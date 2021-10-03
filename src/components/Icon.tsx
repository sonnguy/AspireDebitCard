import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';

export interface IconProps {
  size: number;
  name: string;
  color: string;
  onPress?: any;
}

export const IoniconsIcon = ({size, name, color, onPress}: IconProps) => (
  <Ionicons name={name} size={size} color={color} onPress={onPress} />
);
