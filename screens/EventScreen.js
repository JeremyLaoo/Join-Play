import * as React from 'react';

import {ImageBackground, StyleSheet, Text} from 'react-native';

export default function EventScreen() {
  return (
    <ImageBackground
      source={require('../assets/home.jpg')}
      style={styles.container}>
      <Text>Yo EventScreen</Text>
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
