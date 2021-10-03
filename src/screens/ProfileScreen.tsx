import React from 'react';
import {View, Text} from 'react-native';
import commonScreenStyles from '../styles/commonScreen.style';

const ProfileScreen = () => {
  return (
    <View style={commonScreenStyles.container}>
      <Text style={commonScreenStyles.mainText}>{'Profile Screen'}</Text>
    </View>
  );
};

export default ProfileScreen;
