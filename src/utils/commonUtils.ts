import {Dimensions} from 'react-native';
import {getStatusBarHeight} from 'react-native-status-bar-height';

const commonUtils = {
  deviceDimension: Dimensions.get('window'),
  statusBarHeight: getStatusBarHeight(),
};

export default commonUtils;
