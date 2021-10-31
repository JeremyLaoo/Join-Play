import * as React from 'react';
import {Component} from 'react';
import firestore from '@react-native-firebase/firestore';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';

import {TouchableOpacity} from 'react-native';

import {
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';

// import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default class CreationScreen extends Component {
  constructor() {
    super();
    this.state = {
      date: '',
      time: '',
      duration: 0,
      latitude: 0,
      longitude: 0,
      locationAdress: '',
      locationName: '',
      price: 0,
      maxPlayers: 0,
      level: 0,
      ambiance: 0,
      yellow: true,
    };
  }

  /**
   * CreateMatch
   * @description Create a match with user given datas
   */
  createMatch() {
    const matchCollection = firestore().collection('matchs');
    let match = {};
    match.date =
      this.state.date?.split('-')[0] +
      '/' +
      this.state.date?.split('-')[1] +
      '/' +
      this.state.date?.split('-')[2] +
      'T' +
      this.state.time +
      ':00.000Z';
    match.time = this.state.time;
    match.latitude = this.state.latitude;
    match.longitude = this.state.longitude;
    match.locationAdress = this.state.locationAdress;
    match.locationName = this.state.locationName;
    match.duration = parseInt(this.state.duration);
    match.level = parseInt(this.state.level);
    match.price = parseInt(this.state.price);
    match.ambiance = parseInt(this.state.ambiance);
    match.maxPlayers = parseInt(this.state.maxPlayers);
    match.players = [];

    // Datas verification

    // empty string or number (every fields is required)
    if (match.time === '') {
      console.warn('Veuillez renseigner le temps !');
      return;
    } else if (match.locationAdress === '') {
      console.warn("Veuillez renseigner l'adresse !");
      return;
    } else if (match.locationName === '') {
      console.warn('Veuillez renseigner le nom du lieu !');
      return;
    } else if (match.duration === 0) {
      console.warn('Veuillez renseigner la durée !');
      return;
    } else if (match.level === 0) {
      console.warn('Veuillez renseigner le niveau !');
      return;
    } else if (match.maxPlayers === 0) {
      console.warn('Veuillez renseigner la nombre de joueurs !');
      return;
    } else if (match.price === 0) {
      console.warn('Veuillez renseigner le prix !');
      return;
    }

    // integrity verification
    if (isNaN(parseInt(this.state.duration))) {
      console.warn("La 'durée' ne doit être numérique !");
      return;
    } else if (isNaN(parseInt(this.state.level))) {
      console.warn("Le 'niveau' ne doit être numérique !");
      return;
    } else if (isNaN(parseInt(this.state.maxPlayers))) {
      console.warn("Le 'nombre de joueurs' ne doit être numérique !");
      return;
    } else if (isNaN(parseInt(this.state.price))) {
      console.warn("Le 'prix' ne doit être numérique !");
      return;
    }

    // date and time format
    // const frenchDatePattern =
    //   '^([0-2][0-9]|(3)[0-1])(/)(((0)[0-9])|((1)[0-2]))(/)d{4}$';
    // const dateReg = new RegExp(frenchDatePattern);
    // console.warn('Date : ', match.date?.split('T')[0]);
    // if (!dateReg.test(match.date?.split('T')[0])) {
    //   console.warn('Le format de la date est invalide ! ');
    //   return;
    // }

    // const frenchTimePattern = '([1-9]|1[012]):[0-5][0-9]';
    // const timeReg = new RegExp(frenchTimePattern, 'g');
    // if (!timeReg.test(this.state.time)) {
    //   console.warn('Le format du temps est invalide ! ');
    //   return;
    // }
    matchCollection
      .add(match)
      .then(docRef => {
        firestore()
          .collection('matchs')
          .doc(docRef.id)
          .update({uid: docRef.id})
          .then(() => {
            this.props.navigation.navigate('matchlist');
          });
      })
      .catch(e => console.log('Error lors de la création du match : ', e));
  }

  changeColor() {
    this.setState({yellow: !this.state.yellow});
  }

  value_submitted() {
    console.warn(this.state);
  }

  navigation() {
    <TouchableOpacity
      onPress={() => this.props.navigation.navigate('recap')}
    />;
  }

  render() {
    let btn_class = this.state.yellow ? 'yellowButton' : 'whiteButton';
    // console.log('Style : ', btn_class);

    return (
      <SafeAreaView>
        <ScrollView>
          {/* <Button title="Show Date Picker" onPress={this.showDatePicker} />
        <DateTimePickerModal
          isVisible={this.datePickerVisible}
          mode="date"
          onConfirm={this.handleConfirm}
          onCancel={this.hideDatePicker}
        /> */}
          {/* DATE  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>A quelle date?</Text>
            <TextInput
              placeholder="01-08-2021"
              onChangeText={dateText => {
                this.setState({date: dateText});
              }}
              style={{
                borderBottomWidth: 2,
                borderColor: 'grey',
                margin: 20,
                marginTop: 0,
              }}
            />
          </View>
          {/* HEURE  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>A quelle heure?</Text>
            <TextInput
              placeholder="21:00"
              onChangeText={timeText => {
                this.setState({time: timeText});
              }}
              style={{
                borderBottomWidth: 2,
                borderColor: 'grey',
                margin: 20,
                marginTop: 0,
              }}
            />
          </View>
          {/* DUREE  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>Combien de temps en mn?</Text>
            <TextInput
              placeholder="90"
              onChangeText={durationNumber => {
                this.setState({
                  duration: durationNumber.replace(/[^0-9]/g, ''),
                });
              }}
              style={{
                borderBottomWidth: 2,
                borderColor: 'grey',
                margin: 20,
                marginTop: 0,
              }}
              autoCompleteType="cc-number"
              keyboardType="numeric"
            />
          </View>

          {/* ADRESSE  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>A quel stade?</Text>
            <TextInput
              placeholder="Le nom du stade"
              onChangeText={locationNameText => {
                this.setState({
                  locationName: locationNameText,
                });
              }}
              style={{
                borderBottomWidth: 2,
                borderColor: 'grey',
                margin: 20,
                marginTop: 0,
              }}
            />
            <TextInput
              placeholder="Adresse"
              onChangeText={locationAdressText => {
                this.setState({
                  locationAdress: locationAdressText,
                });
              }}
              style={{
                borderBottomWidth: 2,
                borderColor: 'grey',
                margin: 20,
                marginTop: 0,
              }}
            />
          </View>

          {/* PRIX  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>Prix par personne €</Text>
            <TextInput
              placeholder="14"
              onChangeText={priceNumber => {
                this.setState({price: priceNumber.replace(/[^0-9]/g, '')});
              }}
              style={{
                borderBottomWidth: 2,
                borderColor: 'grey',
                margin: 20,
                marginTop: 0,
              }}
              keyboardType="numeric"
            />
          </View>
          {/* FORMAT  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>Nombre de joueurs au total</Text>
            <TextInput
              placeholder="12"
              onChangeText={maxPlayersNumber => {
                this.setState({
                  maxPlayers: maxPlayersNumber.replace(/[^0-9]/g, ''),
                });
              }}
              style={{
                borderBottomWidth: 2,
                borderColor: 'grey',
                margin: 20,
                marginTop: 0,
              }}
              keyboardType="numeric"
            />
          </View>
          {/* LEVEL  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>Niveau</Text>
            <View style={styles.blocButton}>
              <TouchableHighlight
                style={styles.btn_class}
                onPress={() => {
                  this.setState({level: '1'});
                  this.changeColor();
                }}>
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Débutant</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.btn_class}
                onPress={() => {
                  this.setState({level: '2'});
                  this.changeColor();
                }}>
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Amateur</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.btn_class}
                onPress={() => {
                  this.setState({level: '3'});
                  this.changeColor();
                }}>
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Pro</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
          {/* AMBIANCE  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>Ambiance</Text>
            <View style={styles.blocButton}>
              <TouchableHighlight
                style={styles.btn_class}
                onPress={() => {
                  this.setState({ambiance: '1'});
                  this.changeColor();
                }}>
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Compétition</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.btn_class}
                onPress={() => {
                  this.setState({ambiance: '2'});
                  this.changeColor();
                }}>
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Fun</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>

          <View style={styles.buttonSubmit}>
            <Button
              onPress={() => {
                this.createMatch();
              }}
              color="#FFC93C"
              title="Créer
            "
            />
          </View>
        </ScrollView>
        <View>
          <GooglePlacesAutocomplete
            placeholder="Search"
            onPress={(data, details = null) => {
              // 'details' is provided when fetchDetails = true
              console.log(data, details);
            }}
            query={{
              key: 'AIzaSyC5CQcBaHRLroWrUdhYeR1E1sVReUf4oJE',
              language: 'en',
            }}
            requestUrl={{
              useOnPlatform: 'all', // or "all"
              url: 'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api', // or any proxy server that hits https://maps.googleapis.com/maps/api
              headers: {
                Authorization: 'an auth token', // if required for your proxy
              },
            }}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  blocInput: {
    backgroundColor: '#FFF',
    marginTop: 10,
  },
  textTitle: {
    paddingTop: 20,
    paddingLeft: 20,
  },
  buttonSubmit: {
    margin: 20,
    backgroundColor: '#FFF',
  },
  blocButton: {
    flexDirection: 'row',
    margin: 10,
    justifyContent: 'center',
  },
  buttonChoice: {
    width: 100,
    height: 30,
    backgroundColor: '#696969',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
  },
  yellowButton: {
    color: '#494949',
    backgroundColor: '#494949',
  },
  whiteButton: {
    color: '#FFFFFF',
    backgroundColor: '#FFFFFF',
  },
});
