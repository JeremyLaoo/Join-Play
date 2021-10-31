import * as React from 'react';

import {ImageBackground, StyleSheet, Text} from 'react-native';

export default function ConnexionScreen() {
  return (
    <ImageBackground
      source={require('../assets/home.jpg')}
      style={styles.container}>
      <Text>Yo ConnexionScreen</Text>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
