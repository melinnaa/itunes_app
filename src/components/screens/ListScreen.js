import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Image, ScrollView } from 'react-native';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

import { musicSelector } from "../../slices/MusicSlice.js";
import { addMusic } from "../../slices/MusicSlice.js";

export function ListScreen({route, navigation}){
    const musics = useSelector(musicSelector);

    return (
        <ScrollView>
            <FlatList
            data={musics}
            renderItem=
            {
                ({item}) => (
                <View onClick={() =>  handleMusicSelected(item)}>
                    <Image source={{uri: item.image}} style={{height: 100, width: 100, resizeMode : 'stretch', margin: 5 }}></Image>       
                    <Text value={item.trackName}> {item.trackName} </Text>
                    <Text value={item.artistName}> {item.artistName} </Text>
                </View>
                )
        
            }
            keyExtractor={item => item.trackId}/>
        </ScrollView>
    )

    function handleMusicSelected(item){
       navigation.navigate("ShowScreen", { musicDetails: item })
    }
}