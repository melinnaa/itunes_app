import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Provider } from "react-redux";

import { ListTab } from './src/components/tabs/ListTab';
import { SearchTab } from './src/components/tabs/SearchTab';
import { store } from './src/store.js';

const Tab = createBottomTabNavigator();

export default function App() {

  const customTabBarStyle = {
    activeTintColor: 'black',
    inactiveTintColor: 'gray',
    style: {backgroundColor: 'white', paddingBottom: 20, paddingTop:20, height: 65},
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Tab.Navigator
            tabBarOptions={customTabBarStyle}
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;
                switch (route.name) {
                  case "ListTab":
                    iconName = focused ? "list-circle" : "list-circle-outline";
                    break;
                  case "SearchTab":
                    iconName = focused ? "search-circle" : "search-circle-outline";
                    break;
                  default:
                    iconName = "ban";
                    break;
                }

                return <Ionicons name={iconName} size={size} color={color}/>;
              },
            })}
            >
              <Tab.Screen name="ListTab" component={ListTab} unmountOnBlur={true} options={{tabBarLabel: '', unmountOnBlur: true}}/>
              <Tab.Screen name="SearchTab" component={SearchTab} options={{tabBarLabel: ''}}/>
        </Tab.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
