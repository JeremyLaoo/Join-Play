import * as React from 'react';
import {Component} from 'react';

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

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      ambiance: '',
      date: '',
      heure: '',
      lieu: '',
    };
  }

  submit() {
    console.warn(this.state);
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          {/* AMBIANCE  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>Type de match</Text>
            <View style={styles.blocButton}>
              <TouchableHighlight
                onPress={() => {
                  this.setState({ambiance: 'competition'});
                }}
                underlayColor="#FFC93C">
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Compétition</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setState({ambiance: 'fun'});
                }}>
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Fun</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>

          {/* DATE  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>Date</Text>
            <View style={styles.blocButton}>
              <TouchableHighlight
                onPress={() => {
                  this.setState({date: 'competition'});
                }}>
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Compétition</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setState({date: 'fun'});
                }}>
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Fun</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>

          {/* HEURE  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>Heure</Text>
            <View style={styles.blocButton}>
              <TouchableHighlight
                onPress={() => {
                  this.setState({heure: 'competition'});
                }}>
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Compétition</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setState({heure: 'fun'});
                }}>
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Fun</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>

          {/* LIEU  */}
          <View style={styles.blocInput}>
            <Text style={styles.textTitle}>Localisation</Text>
            <View style={styles.blocButton}>
              <TouchableHighlight
                onPress={() => {
                  this.setState({lieu: 'competition'});
                }}>
                <View style={styles.buttonChoice}>
                  <Text style={styles.buttonText}>Compétition</Text>
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  this.setState({lieu: 'fun'});
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
                this.submit();
              }}
              color="#FFC93C"
              title="Rechercher
            "
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  blocInput: {
    backgroundColor: '#FFF',
    marginTop: 10,
    alignItems: 'center',
  },
  blocButton: {
    flexDirection: 'row',
    margin: 10,
  },
  buttonChoice: {
    width: 140,
    height: 40,
    backgroundColor: '#696969',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
  textTitle: {
    paddingTop: 20,
    fontSize: 18,
    color: '#259A62',
    // fontWeight:'bold',
  },
  buttonSubmit: {
    margin: 20,
    backgroundColor: '#FFF',
  },
});
