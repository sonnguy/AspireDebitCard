import {Dimensions, Platform, StatusBar} from 'react-native';

const commonUtils = {
  deviceDimension: Dimensions.get('window'),
  statusBarHeight: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
};

export default commonUtils;
