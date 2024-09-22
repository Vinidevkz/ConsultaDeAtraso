import { StatusBar } from 'expo-status-bar';
import { useState, useCallback } from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

export default function MinhasFaltas() {
  const [faltas, setFaltas] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const pegarFaltas = async () => {
        try {
          const response = await fetch("http://c501-200-53-197-8.ngrok-free.app/api/atraso");
          const data = await response.json();
          setFaltas(data);
          console.log(data); // Assumindo que a resposta é um array de objetos
        } catch (error) {
          console.error(error);
        }
      };

      pegarFaltas();
    }, [])
  );

  const renderItem = ({ item }) => {
    const horarioFormatado = item.horarioAtraso.split(':').slice(0, 2).join(':');
  
    return (
      <View style={styles.item}>
        <Text>Nome do Aluno: {item.nomeAluno}</Text>
        <Text>Nome do Curso: {item.nomeCurso}</Text>
        <Text>Período do Curso: {item.periodoCurso}</Text>
        <Text>Módulo do Curso: {item.moduloCurso}</Text>

        <Text style={{marginTop: 10, borderBottomWidth: 2, borderColor: '#ff8f26', width: 135,}}>Horário de Atraso: {horarioFormatado}</Text>
      </View>
    );
  };
  

  return (
    <View style={styles.container}>
      <FlatList
        data={faltas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  item: {
    padding: 20,
    borderWidth: 3,
    marginVertical: 5,
    borderRadius: 15,
    width: '100%',
  },
});
