import * as React from 'react';
import {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {firebase} from '@react-native-firebase/app';
// import Home from './screens/Home';
import HomeScreen from './screens/HomeScreen';
import ConnexionScreen from './screens/ConnexionScreen';
import InscriptionScreen from './screens/InscriptionScreen';
import RecapScreen from './screens/RecapScreen';
import CreationScreen from './screens/CreationScreen';
import SearchScreen from './screens/SearchScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import EventScreen from './screens/EventScreen';
import CompetScreen from './screens/CompetScreen';

// import Ionicons from 'react-native-vector-icons/FontAwesome5';

// import Tabs from './screens/Tab';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDVi4kLzMHG21mwtG9Ncyrjqv93zbOWq9Q',
  authDomain: 'join-and-play.firebaseapp.com',
  databaseURL:
    'https://join-and-play-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'join-and-play',
  storageBucket: 'join-and-play.appspot.com',
  messagingSenderId: '414655431523',
  appId: '1:414655431523:web:d232d27b4cecf32b328956',
  measurementId: 'G-MJ70Y1NTP3',
};

// Initialize firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app(); // if already initialized, use that one
}
import MatchListScreen from './screens/MatchListScreen';

const Stack = createNativeStackNavigator();
const navOptionHandler = () => ({
  headerShown: false,
});

const StackDashboard = createNativeStackNavigator();
function DashboardStack() {
  return (
    <StackDashboard.Navigator initialRouteName="Home">
      <StackDashboard.Screen
        name="dashboard"
        component={DashboardScreen}
        options={navOptionHandler}
      />
    </StackDashboard.Navigator>
  );
}
const StackEvent = createNativeStackNavigator();
function EventStack() {
  return (
    <StackEvent.Navigator initialRouteName="Home">
      <StackEvent.Screen
        name="event"
        component={EventScreen}
        options={navOptionHandler}
      />
    </StackEvent.Navigator>
  );
}
const StackCreateMatch = createNativeStackNavigator();
function CreateMatchStack() {
  return (
    <StackCreateMatch.Navigator initialRouteName="Home">
      <StackCreateMatch.Screen
        name="createMatch"
        component={CreationScreen}
        options={navOptionHandler}
      />
    </StackCreateMatch.Navigator>
  );
}
const StackCompet = createNativeStackNavigator();
function CompetStack() {
  return (
    <StackCompet.Navigator initialRouteName="Home">
      <StackCompet.Screen
        name="compet"
        component={CompetScreen}
        options={navOptionHandler}
      />
    </StackCompet.Navigator>
  );
}
const StackMatchList = createNativeStackNavigator();
function MatchListStack() {
  return (
    <StackMatchList.Navigator initialRouteName="Home">
      <StackMatchList.Screen
        name="matchlist"
        component={MatchListScreen}
        options={navOptionHandler}
      />
    </StackMatchList.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        // tabBarIcon: ({color, size}) => {
        //   let iconName;
        //   if (route.name === 'dashboard') {
        //     iconName = 'user';
        //   } else if (route.name === 'matchlist') {
        //     iconName = 'github';
        //   }
        //   // You can return any component that you like here!
        //   return <Ionicons name={iconName} size={size} color={color} />;
        // },
      })}
      tabBarOptions={{
        activeTintColor: '#ec9b3b',
        inactiveTintColor: 'grey',
        style: {
          backgroundColor: '#00818a',
          height: 60,
          padding: 10,
        },
      }}>
      <Tab.Screen name="Accueil" component={DashboardStack} />
      {/* <Tab.Screen name="Evenement" component={EventStack} /> */}
      <Tab.Screen name="Créer un match" component={CreateMatchStack} />
      {/* <Tab.Screen name="Compétition" component={CompetStack} /> */}
      <Tab.Screen name="Liste des matchs" component={MatchListStack} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          // options={{title: 'Welcome'}}
        />
        {/* <Stack.Screen
            name="creation"
            component={CreationScreen}
            options={{title: 'Créer un match'}}
          /> */}
        {/* <Stack.Screen
            name="connexion"
            component={ConnexionScreen}
            options={{title: 'Se connecter'}}
          /> */}
        {/* <Stack.Screen
            name="inscription"
            component={InscriptionScreen}
            options={{title: "S'inscrire"}}
          /> */}
        <Stack.Screen
          name="recap"
          component={RecapScreen}
          options={{title: 'Details du match'}}
        />
        <Stack.Screen
          name="matchlist"
          component={MatchListScreen}
          options={{title: 'Liste des matchs'}}
        />
        <Stack.Screen
          name="userProfil"
          component={ProfileScreen}
          options={{title: 'Profil joueur'}}
        />
        {/* <Stack.Screen
            name="recherche"
            component={SearchScreen}
            options={{title: 'Rechercher un match'}}
          /> */}
        <Stack.Screen
          name="dashboard"
          component={TabNavigator}
          options={{title: 'Tableau de bord'}}
        />
        {/* <Stack.Screen
          name="profile"
          component={ProfileScreen}
          options={{title: 'Profile'}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
