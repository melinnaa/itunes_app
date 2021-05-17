import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator }  from '@react-navigation/stack'; 

import { ListScreen } from "../screens/ListScreen.js";
import { ShowScreen } from "../screens/ShowScreen.js";

const Stack = createStackNavigator();

export function ListTab(){

     return (
        <Stack.Navigator>
            <Stack.Screen name="ListScreen" component={ListScreen}/>
            <Stack.Screen name="ShowScreen" component={ShowScreen}/>
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#272727',
        color: 'white'
    },

    textInput: {
        fontSize: 18,
        padding: 8,
        color: 'white'
    },

    searchBlock: {
        margin: 0,
        shadowOffset:{  width: 0,  height: 20,  },
        shadowColor: 'black',
        shadowOpacity: 0.3,
        shadowRadius: 15
    },

    text: {
        fontSize: 18,
        padding: 4,
        color: 'white'
    },

    searchLine: {
        flexDirection: 'row',
        color: 'white'
    }

});
