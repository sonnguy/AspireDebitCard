import React, {useEffect, useState} from 'react';
import {ActivityIndicator, StatusBar, StyleSheet, View} from 'react-native';

import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    (async () => {
      // await Ionicons.loadFont();
      setLoadingComplete(true);
    })();
  }, []);

  return isLoadingComplete ? (
    <View style={styles.container}>
      <StatusBar barStyle={'light-content'} />
      <AppNavigator />
    </View>
  ) : (
    <ActivityIndicator />
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
