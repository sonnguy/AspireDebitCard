import {UserModal} from './userModel';
import AsyncStorage from '@react-native-community/async-storage';
import users from './users.json';
import {USER_DATA_STORAGE} from '../../constants/commonConstant';

export const fetchUserInfoApi = (id: number): Promise<UserModal> => {
  const promise = new Promise<UserModal>(resolve => {
    setTimeout(async () => {
      const localData: UserModal = JSON.parse(
        await AsyncStorage.getItem(USER_DATA_STORAGE),
      );
      if (localData && localData.id === id) {
        resolve(localData);
      } else {
        await AsyncStorage.removeItem(USER_DATA_STORAGE);
        const res = users.find((o: UserModal) => o.id === id);
        resolve(res || null);
      }
    }, 500);
  });
  return promise;
};

export const updateUserInfoApi = (data: UserModal): Promise<UserModal> => {
  const promise = new Promise<UserModal>(resolve => {
    setTimeout(async () => {
      await AsyncStorage.setItem(USER_DATA_STORAGE, JSON.stringify(data));
      resolve(data);
    }, 500);
  });
  return promise;
};
