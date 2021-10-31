import * as React from 'react';
import RecapScreen from './RecapScreen';
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
    matchs: [],
  };

  submit() {
    console.warn(this.state);
  }

  /**
   * @description Fetching all matches from firestore
   * getMatchs
   */
  getMatchs() {
    firestore()
      .collection('matchs')
      .orderBy('date', 'desc')
      .onSnapshot(matchDocs => {
        const matchs = [];
        if (matchDocs.docs?.length > 0) {
          matchDocs.docs?.forEach(matchDoc => {
            matchs.push(matchDoc.data());
          });
        }

        this.setState({matchs: matchs});
      });
  }

  UNSAFE_componentWillMount() {
    this.getMatchs();
  }

  render() {
    const matchList = this.state.matchs.map((match, index) => (
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity>
            <View style={styles.container}>
              <View style={styles.box}>
                <View>
                  <Text style={styles.inner}>
                    {match?.date?.split('T')[0]} à{' '}
                    {match?.date?.split('T')[1]?.split('.')[0]}
                  </Text>
                  <View style={styles.box2}>
                    <View>
                      <Text style={styles.inner2}>
                        Ambiance{' '}
                        {match.ambiance && match.ambiance === 1
                          ? 'Fun'
                          : match.ambiance === 2
                          ? 'Compétitive'
                          : 'Custom'}
                      </Text>
                      <Text style={styles.inner3}>{match?.locationName}</Text>
                      <Text style={styles.inner3}>
                        {match.price && match.price === 0
                          ? 'Gratuit'
                          : match.price && match.price !== 0
                          ? match.price + ' euros'
                          : 'Prix non defini'}
                      </Text>
                      <Text style={styles.inner4}>
                        <TouchableOpacity
                          style={styles.button}
                          onPress={() =>
                            this.props.navigation.navigate('recap', {
                              matchId: match.uid,
                              test: 'test',
                            })
                          }>
                          <Text style={styles.textbutton}>Details</Text>
                        </TouchableOpacity>
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    ));
    return (
      <SafeAreaView>
        <ScrollView>
          <TouchableOpacity>
            <View style={styles.container}>{matchList}</View>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '85%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
  },
  box: {
    width: '90%',
    height: '50%',
    margin: 20,
  },
  box2: {
    width: '100%',
    height: '80%',
  },

  inner: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FE96A0',
    paddingTop: 7,
    fontSize: 23,
    justifyContent: 'center',
    textAlign: 'center',
  },
  inner2: {
    paddingTop: 2,
    backgroundColor: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
  },

  inner3: {
    backgroundColor: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
  },
  inner4: {
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    backgroundColor: '#FFFFFF',
    fontSize: 25,
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 9,
  },
  button: {
    backgroundColor: '#FFC93C',
    height: 25,
    width: 90,
    borderRadius: 30,
  },

  textbutton: {
    fontSize: 17,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
