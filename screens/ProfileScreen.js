import * as React from 'react';
import firestore from '@react-native-firebase/firestore';

import {
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  FlatList,
  StatusBar,
  SectionList,
  View,
  Image,
  section,
  item,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';

export default class App extends React.Component {
  state = {
    userId: this.props.route.params.userId,
    player: null,
  };
  submit() {
    console.warn(this.state);
  }

  /**
   * @description Fetch a player from firestore with the given id
   * @param {*} playerId
   * @returns
   */
  getPlayer() {
    return new Promise((resolve, reject) => {
      try {
        firestore()
          .collection('users')
          .doc(this.state.userId)
          .onSnapshot(player => resolve(player.data()));
      } catch (error) {
        console.log('Error while fetching player !');
        reject(error);
      }
    });
  }

  async UNSAFE_componentWillMount() {
    const player = await this.getPlayer();
    this.setState({player: player});
  }

  render() {
    return (
      <View>
        <ScrollView>
          <View
            style={{
              padding: 10,
              width: '100%',
              height: 150,
              backgroundColor: '#000',
            }}
          />
          <View style={{alignItems: 'center'}}>
            <Image
              source={{uri: this.state.player?.pictureUrl}}
              style={{
                width: 140,
                height: 140,
                borderRadius: 100,
                marginTop: -70,
              }}
            />
            <Text style={{fontSize: 25, fontWeight: 'bold', padding: 10}}>
              {this.state.player?.name}
            </Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'grey'}}>
              {this.state.player?.age} ans
            </Text>
            <Text style={{fontSize: 15, fontWeight: 'bold', color: 'grey'}}>
              Masculin
            </Text>
          </View>

          <View
            style={{
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              backgroundColor: '#fff',
              width: '90%',
              padding: 20,
              paddingBottom: 22,
              borderRadius: 10,
              shadowOpacity: 80,
              elevation: 15,
              marginTop: 20,
            }}>
            <Image
              source={require('../assets/location.png')}
              style={{width: 20, height: 20}}
            />
            <Text
              style={{
                fontSize: 15,
                color: '#818181',
                fontWeight: 'bold',
                marginLeft: 10,
              }}>
              Paris
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  profilepic: {
    width: 40,
    height: 140,
  },
});
