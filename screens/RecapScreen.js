import * as React from 'react';
import firestore from '@react-native-firebase/firestore';

import {
  Button,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Text,
  FlatList,
  StatusBar,
  SectionList,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';

const ListItem = ({item}) => {
  return (
    <View style={styles.item}>
      <Image
        source={{
          uri: item.uri,
        }}
        style={styles.itemPhoto}
        resizeMode="cover"
      />
      <Text style={styles.itemText}>{item.text}</Text>
    </View>
  );
};

export default class App extends React.Component {
  state = {
    match: {},
    matchId: this.props.route.params.matchId,
    users: [],
    signup_user_name: '',
    signup_user_email: '',
    signin_user_email: '',
    signup_user_pictureUrl: '',
    signup_user_age: 0,
    SECTIONS: [
      {
        title: 'Joueurs',
        data: [],
      },
    ],
    showModalInscr: false,
    showModalConnexion: false,
  };

  /**
   * @description Fetching match with the props id
   * @param matchId
   * getMatch()
   */
  getMatch(matchId) {
    firestore()
      .collection('matchs')
      .doc(matchId)
      .onSnapshot(async matchDoc => {
        // if (matchDoc.data()?.players.length > 0) {
        this.setState({match: matchDoc.data()});

        const arr = [...this.state.SECTIONS];
        arr[0].data = [];
        let index = 0;
        for (let playerId of matchDoc.data()?.players) {
          const player = await this.getPlayer(playerId);

          if (player) {
            arr[0].data.push({
              key: index + 1,
              text: player.name,
              uri: player.pictureUrl,
              uid: player.uid,
            });
            index++;
          }
        }
        this.setState({SECTIONS: arr});
        // }
      });
  }

  /**
   * @description Fetch a player from firestore with the given id
   * @param {*} playerId
   * @returns
   */
  getPlayer(playerId) {
    return new Promise((resolve, reject) => {
      try {
        firestore()
          .collection('users')
          .doc(playerId)
          .onSnapshot(player => resolve(player.data()));
      } catch (error) {
        console.log('Error while fetching player !');
        reject(error);
      }
    });
  }

  submit() {
    // console.warn(this.stateLogin);
  }

  async createUser() {
    if (
      this.state.signup_user_name !== '' &&
      this.state.signup_user_email !== '' &&
      this.state.signup_user_age >= 16
    ) {
      const userData = {
        name: this.state.signup_user_name,
        email: this.state.signup_user_email,
        age: this.state.signup_user_age,
        pictureUrl: this.state.signup_user_pictureUrl,
      };
      const userExist = await firestore()
        .collection('users')
        .where('email', '==', this.state.signup_user_email)
        .get();

      if (userExist.docs.length === 0) {
        firestore()
          .collection('users')
          .add(userData)
          .then(docRef => {
            firestore()
              .collection('users')
              .doc(docRef.id)
              .update({uid: docRef.id})
              .then(() => {
                this.addUserToMatch(docRef.id);
              });
          });
      } else {
        console.warn('Email déjà présent en base de données !');
      }
    }
  }

  async logUser() {
    if (this.state.signin_user_email !== '') {
      const userExist = await firestore()
        .collection('users')
        .where('email', '==', this.state.signin_user_email)
        .get();

      if (userExist.docs.length === 1) {
        if (
          !this.state.match?.players.includes(userExist.docs[0].data()?.uid)
        ) {
          const userFound = userExist.docs[0].data();
          this.addUserToMatch(userFound.uid);
        } else {
          console.warn('Vous êtes déjà inscrit à cet événement.');
        }
      } else {
        console.warn('Utilisateur inconnu ! veuillez vous inscrire.');
      }
    }
  }

  async addUserToMatch(userId) {
    if (userId !== '') {
      if (
        this.state.match?.players.length <=
        this.state.match?.maxPlayers * 2
      ) {
        await firestore()
          .collection('matchs')
          .doc(this.state.matchId)
          .update({players: firestore.FieldValue.arrayUnion(userId)});
        this.setState({showModalConnexion: false});
      } else {
        console.warn('Le nombre de participants maximum est atteint !');
      }
    }
  }

  componentDidMount() {}

  UNSAFE_componentWillMount() {
    this.getMatch(this.state.matchId);
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          {/* MODAL QUI APPARAIT LORS DU CLIC SUR LE BOUTON "S'INSCRIRE" */}
          <Modal transparent={true} visible={this.state.showModalInscr}>
            <View style={{backgroundColor: '#000000aa', flex: 1}}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  margin: 60,
                  marginBottom: 100,
                  padding: 20,
                  borderRadius: 10,
                  flex: 1,
                }}>
                <ScrollView>
                  <View>
                    <Text
                      style={{color: 'blue'}}
                      onPress={() =>
                        this.setState({
                          showModalInscr: false,
                          showModalConnexion: true,
                        })
                      }>
                      Se connecter
                    </Text>
                    <TouchableOpacity
                      style={styles.buttonClose}
                      onPress={value => this.setState({showModalInscr: false})}>
                      <View>
                        <Text style={styles.buttonCloseText}>Fermer</Text>
                      </View>
                    </TouchableOpacity>
                  </View>

                  {/*INPUT NAME  */}
                  <View style={styles.blocInput}>
                    <Text style={styles.textTitle}>Votre nom</Text>
                    <TextInput
                      placeholder="John Doe"
                      onChangeText={nameText => {
                        this.setState({signup_user_name: nameText});
                      }}
                      style={{
                        borderBottomWidth: 2,
                        borderColor: 'grey',
                        margin: 20,
                        marginTop: 0,
                      }}
                    />
                  </View>
                  {/*INPUT EMAIL  */}
                  <View style={styles.blocInput}>
                    <Text style={styles.textTitle}>Email</Text>
                    <TextInput
                      placeholder="JohnDoe@gmail.com"
                      onChangeText={emailText => {
                        this.setState({signup_user_email: emailText});
                      }}
                      style={{
                        borderBottomWidth: 2,
                        borderColor: 'grey',
                        margin: 20,
                        marginTop: 0,
                      }}
                    />
                  </View>
                  {/*INPUT AGE  */}
                  <View style={styles.blocInput}>
                    <Text style={styles.textTitle}>Age</Text>
                    <TextInput
                      placeholder="14"
                      onChangeText={ageNumber => {
                        this.setState({signup_user_age: ageNumber});
                      }}
                      style={{
                        borderBottomWidth: 2,
                        borderColor: 'grey',
                        margin: 20,
                        marginTop: 0,
                      }}
                    />
                  </View>
                  {/*INPUT Picture  */}
                  <View style={styles.blocInput}>
                    <Text style={styles.textTitle}>Photo profil (Lien)</Text>
                    <TextInput
                      placeholder="Photo url"
                      onChangeText={pictureLinkText => {
                        this.setState({
                          signup_user_pictureUrl: pictureLinkText,
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
                  {/*BOUTON SUBMIT  */}
                  <View style={styles.buttonSubmit}>
                    <Button
                      onPress={() => {
                        this.createUser();
                        this.setState({showModalInscr: false});
                      }}
                      color="#FFC93C"
                      title="S'enregistrer
                    "
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
          {/* FIN DU MODAL QUI APPARAIT LORS DU CLIC SUR LE BOUTON "S'INSCRIRE" */}

          {/* MODAL DE CONNEXION QUI APPARAIT LORS DU CLIC SUR LE BOUTON CONNEXION?  */}
          <Modal transparent={true} visible={this.state.showModalConnexion}>
            <View style={{backgroundColor: '#000000aa', flex: 1}}>
              <View
                style={{
                  backgroundColor: '#ffffff',
                  margin: 60,
                  marginBottom: 100,
                  padding: 20,
                  borderRadius: 10,
                }}>
                <ScrollView>
                  <TouchableOpacity
                    style={styles.buttonClose}
                    onPress={value =>
                      this.setState({showModalConnexion: false})
                    }>
                    <View>
                      <Text style={styles.buttonCloseText}>Fermer</Text>
                    </View>
                  </TouchableOpacity>
                  {/*INPUT EMAIL  */}
                  <View style={styles.blocInput}>
                    <Text style={styles.textTitle}>Email</Text>
                    <TextInput
                      placeholder="JohnDoe@gmail.com"
                      onChangeText={emailText => {
                        this.setState({signin_user_email: emailText});
                      }}
                      style={{
                        borderBottomWidth: 2,
                        borderColor: 'grey',
                        margin: 20,
                        marginTop: 0,
                      }}
                    />
                  </View>

                  {/*BOUTON SUBMIT  */}
                  <View style={styles.buttonSubmit}>
                    <Button
                      onPress={() => {
                        this.logUser();
                        // this.setState({showModalConnexion: false});
                      }}
                      color="#FFC93C"
                      title="S'enregistrer
                    "
                    />
                  </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
          {/* FIN DU MODAL DE CONNEXION QUI APPARAIT LORS DU CLIC SUR LE BOUTON CONNEXION? */}

          <Image
            style={styles.logo}
            source={require('../assets/terrain.png')}
          />

          <View style={styles.container}>
            {/* <View>
              <TouchableOpacity
                style={styles.Buttonitineraire}
                onPress={() => this.props.navigation.navigate('MapScreen')}>
                <View>
                  <Text style={styles.textitineraire}>
                    Itinéraire
                  </Text>
                </View>
              </TouchableOpacity>
            </View> */}

            <View>
              <Text style={styles.textTitle}>
                {this.state.match?.locationName}
              </Text>
            </View>

            <View>
              <Text style={styles.text2}>
                {this.state.match?.locationAdress}
              </Text>
            </View>

            <View style={styles.rowDetailMatch}>
              <View>
                <Text style={styles.fontS14}>
                  Date: {this.state.match?.date?.split('T')[0]}
                </Text>
                <Text style={styles.fontS14}>
                  Heure: {this.state.match?.date?.split('T')[1]?.split('.')[0]}
                </Text>

                <Text style={styles.fontS14}>
                  Durée : {this.state.match?.duration}
                </Text>
                <Text style={styles.fontS14}>
                  Type :{' '}
                  {this.state.match.maxPlayers &&
                  this.state.match.maxPlayers === 5
                    ? '5 vs 5'
                    : this.state.match.type === 11
                    ? '11 vs 11'
                    : 'Custom'}
                </Text>
              </View>

              <View>
                <Text style={styles.fontS14}>
                  Prix: {this.state.match.price} euros
                </Text>
                <Text style={styles.fontS14}>
                  Niveau:{' '}
                  {this.state.match.level && this.state.match.level === 1
                    ? 'Débutant'
                    : this.state.match.level === 2
                    ? 'Amateur'
                    : this.state.match.level === 3
                    ? 'Pro'
                    : 'Custom'}
                </Text>
                <Text style={styles.fontS14}>
                  Ambiance:{' '}
                  {this.state.match.ambiance && this.state.match.ambiance === 1
                    ? 'Fun'
                    : this.state.match.ambiance === 2
                    ? 'Compétitive'
                    : 'Custom'}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.Buttoninscription}
              onPress={() => this.setState({showModalInscr: true})}>
              <View>
                <Text style={styles.textConnexion}>S'incrire</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.container}>
            <View style={styles.titleitem}>
              <Text>Les participants</Text>
            </View>

            <StatusBar style="light" />
            <SafeAreaView style={{flex: 1}}>
              <SectionList
                contentContainerStyle={{paddingHorizontal: 10}}
                stickySectionHeadersEnabled={false}
                sections={this.state.SECTIONS}
                renderSectionHeader={({section}) => (
                  <>
                    <Text style={styles.sectionHeader} />
                    <FlatList
                      horizontal
                      data={section.data}
                      renderItem={({item}) => (
                        <TouchableOpacity
                          onPress={() =>
                            this.props.navigation.navigate('userProfil', {
                              userId: item.uid,
                              name: 'test',
                            })
                          }>
                          <ListItem item={item} />
                        </TouchableOpacity>
                      )}
                      showsHorizontalScrollIndicator={false}
                    />
                  </>
                )}
                renderItem={({item, section}) => {
                  return null;
                  // return <ListItem item={item} />;
                }}
              />
            </SafeAreaView>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },

  rowDetailMatch: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
    marginBottom: 10,
  },

  textTitle: {
    fontSize: 16,
    paddingLeft: 30,
    fontWeight: 'bold',
  },

  fontS14: {
    fontSize: 14,
  },

  text2: {
    fontSize: 14,
    paddingLeft: 30,
  },

  logo: {
    height: 175,
    width: 500,
    margin: 1,
  },

  Buttoninscription: {
    backgroundColor: '#FFC93C',
    height: 40,
    width: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 120,
  },

  buttonClose: {
    backgroundColor: '#FFC93C',
    height: 20,
    width: 60,
    borderRadius: 5,
    alignItems: 'center',
    marginLeft: 'auto',
  },
  buttonCloseText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  buttonRegister: {
    backgroundColor: '#FFC93C',
    height: 40,
    width: 150,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 120,
  },

  Buttonitineraire: {
    backgroundColor: '#FFC93C',
    height: 40,
    width: 100,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 280,
    marginTop: 10,
    marginBottom: -30,
  },

  textitineraire: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: 15,
  },

  textConnexion: {
    color: '#FFFFFF',
    textTransform: 'uppercase',
    fontSize: 18,
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  sectionHeader: {
    fontWeight: '800',
    fontSize: 15,
    color: '#f4f4f4',
  },
  item: {
    margin: 10,
  },
  itemPhoto: {
    width: 50,
    height: 50,
  },
  itemText: {
    marginTop: 5,
    fontSize: 15,
    marginBottom: 50,
  },
  titleitem: {
    fontSize: 20,
    paddingLeft: 20,
    marginBottom: -10,
    marginTop: 10,
  },
});
