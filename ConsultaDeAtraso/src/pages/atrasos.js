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
          const response = await fetch("http://9f0e-200-53-197-8.ngrok-free.app/api/atraso");
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

  // Função para converter o horário string em minutos totais (para comparar)
  const converterParaMinutos = (horario) => {
    const [hora, minuto] = horario.split(':').map(Number);
    return hora * 60 + minuto;
  };

  const renderItem = ({ item }) => {
    const horarioFormatado = item.horarioAtraso.split(':').slice(0, 2).join(':');
    const horarioMinutos = converterParaMinutos(horarioFormatado);
    const limiteHorario = converterParaMinutos('13:30');

    return (
      <View style={styles.item}>
        <Text>Nome do Aluno: {item.nomeAluno}</Text>
        <Text>Nome do Curso: {item.nomeCurso}</Text>
        <Text>Período do Curso: {item.periodoCurso}</Text>
        <Text>Módulo do Curso: {item.moduloCurso}</Text>

        {/* Verifica se o horário de entrada é antes ou depois das 13:30 */}
        <Text style={styles.horarioText}>Horário de Entrada: {horarioFormatado}</Text>
        {horarioMinutos <= limiteHorario ? (
          <Text style={styles.textoNoHorario}>Chegou no horário</Text>
        ) : (
          <Text style={styles.textoAtrasado}>Chegou atrasado</Text>
        )}
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
  horarioText: {
    marginTop: 10,
    borderBottomWidth: 2,
    borderColor: '#ff8f26',
    width: 140,
  },
  textoNoHorario: {
    color: 'green',
    marginTop: 5,
  },
  textoAtrasado: {
    color: 'red',
    marginTop: 5,
  },
});
