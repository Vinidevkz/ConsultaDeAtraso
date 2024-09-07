import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function MinhasFaltas() {
  const [falta, setFalta] = useState(' ')

  async function pegarFalta(){
    const req = fetch('')
    const res = req.json()
    setFalta(res)
  }

  return (
    <View style={styles.container}>
      <FlatList
      
      />
    </View>
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
