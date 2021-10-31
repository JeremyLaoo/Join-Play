import * as React from 'react';
import {Component} from 'react';

import {
  ImageBackground,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

let appData = null;

export default class HomeScreen extends Component {
  state = {
    appData: [],
  };
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ImageBackground
        source={require('../assets/home.jpg')}
        style={styles.container}>
        <View>
          {this.state.appData.map((data, index) => (
            <View style={styles.data} key={index}>
              <Text style={styles.dataTitle}>{data.title}</Text>

              {data.developpers.map(dev => (
                <Text style={styles.dataDev}>{dev}</Text>
              ))}

              <Text style={styles.dataDesc}>{data.description}</Text>
            </View>
          ))}
        </View>
        <Image
          style={styles.logo}
          source={require('../assets/Logo_nobg.png')}
        />

        {/* <TouchableOpacity
          style={styles.buttontmp}
          onPress={() => this.props.navigation.navigate('creation')}>
          <View>
            <Text style={styles.texttmp}>Creation</Text>
          </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.buttontmp}
          onPress={() => this.props.navigation.navigate('matchlist')}>
          <View>
            <Text style={styles.texttmp}>Liste des matchs</Text>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity
          style={styles.buttontmp}
          onPress={() => this.props.navigation.navigate('dashboard')}>
          <View>
            <Text style={styles.texttmp}>Go</Text>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.buttontmp}
          onPress={() => this.props.navigation.navigate('profile')}>
          <View>
            <Text style={styles.texttmp}>Profile</Text>
          </View>
        </TouchableOpacity> */}

        {/* <TouchableOpacity
          style={styles.buttonInscription}
          onPress={() => this.props.navigation.navigate('inscription')}>
          <View>
            <Text style={styles.textInscription}>Inscription</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonConnexion}
          onPress={() => this.props.navigation.navigate('connexion')}>
          <View>
            <Text style={styles.textConnexion}>Connexion</Text>
          </View>
        </TouchableOpacity> */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: '#FFC93C',
  },
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    height: 130,
    width: 130,
    marginBottom: 60,
  },

  // BUTTON TEMPORAIRE
  buttontmp: {
    backgroundColor: '#FFC93C',
    height: 55,
    width: 190,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  texttmp: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: 22,
  },

  // BUTTON INSCRIPTION
  buttonInscription: {
    backgroundColor: '#FFFFFF',
    height: 50,
    width: 250,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  textInscription: {
    textTransform: 'uppercase',
    fontSize: 22,
  },

  // BUTTON CONNEXION
  buttonConnexion: {
    backgroundColor: '#FFC93C',
    height: 50,
    width: 250,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  textConnexion: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: 22,
  },
  data: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  dataTitle: {
    color: '#FFC93C',
    fontSize: 26,
    textTransform: 'uppercase',
    marginBottom: 30,
  },
  dataDev: {
    color: '#FFF',
    fontSize: 16,
  },
  dataDesc: {
    color: '#FFF',
    margin: 30,
    fontSize: 16,
  },
});
