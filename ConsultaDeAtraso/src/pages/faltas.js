import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default function MinhasFaltas() {
  const [faltas, setFaltas] = useState([]);

  useEffect(() => {
    pegarFaltas();
  }, []);

  async function pegarFaltas() {
    try {
      const response = await fetch("http://10.0.2.2:8000/api/atraso");
      const data = await response.json();
      setFaltas(data); // Assumindo que a resposta é um array de objetos
    } catch (error) {
      console.error(error);
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text>Nome do Aluno: {item.nomeAluno}</Text>
      <Text>Horário de Atraso: {item.horarioAtraso}</Text>
      <Text>Nome do Curso: {item.nomeCurso}</Text>
      <Text>Período do Curso: {item.periodoCurso}</Text>
      <Text>Módulo do Curso: {item.moduloCurso}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={faltas}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        // Assumindo que cada item tem um campo 'id'
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
