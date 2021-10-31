import * as React from 'react';
import {Component} from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import DashboardScreen from './DashboardScreen';
import EventScreen from './EventScreen';
import CreationScreen from './CreationScreen';
import CompetScreen from './CompetScreen';
import SearchScreen from './SearchScreen';

const Tab = createBottomTabNavigator();

const Tabs = () => {
  return (
    <View>
      <Tab.Navigator>
        <Tab.Screen name="Accueil" component={DashboardScreen} />
        <Tab.Screen name="Evénement" component={EventScreen} />
        <Tab.Screen name="Créer" component={CreationScreen} />
        <Tab.Screen name="Compétition" component={CompetScreen} />
        <Tab.Screen name="Join" component={SearchScreen} />
      </Tab.Navigator>
    </View>
  );
};

export default Tab;
