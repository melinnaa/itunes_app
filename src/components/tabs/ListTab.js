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
      backgroundColor: '#FFF7E4',
      padding: 15,
      paddingBottom: 20
    },

    textInput: {
        fontSize: 18,
        backgroundColor: "white",
        padding: 8,
        marginBottom: 15,
    },

    searchBlock: {
        flex: 1,
        flexDirection: 'row'
    },

    text: {
        fontSize: 18,
        padding: 4 
    }

});
