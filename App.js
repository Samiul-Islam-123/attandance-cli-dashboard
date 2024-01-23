import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import {io} from "socket.io-client";
import {useEffect, useState} from "react"

export default function App() {

  let socket;
  const [currentData, setCurrentData] = useState([]);
  

  useEffect(()=>{
    console.log("Running.")
    socket = io('http://192.168.5.4:3001/');

    return () => {
      socket.disconnect();
    };
  },[])

  useEffect(()=>{
    socket.on('current-data', data=>{
      
      console.log(data)
      setCurrentData(data)
    })
  },[socket])
  

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.label}>{item.name}</Text>
      <Text style={styles.label}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Students Present:</Text>
      <FlatList
        data={currentData}
        keyExtractor={(item,index) => index}
        renderItem={renderItem}
        contentContainerStyle={styles.listContainer}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 250,
  },
  listContainer: {
    paddingTop: 20,
  },
  row: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
