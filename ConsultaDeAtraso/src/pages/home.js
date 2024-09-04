import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState, useEffect } from 'react';

export default function Home() {

  const [nomeAluno, setNomeAluno] = useState(' ')
  const [horario, setHorario] = useState(' ')
  const [periodo, setPeriodo] = useState(' ')
  const [modulo, setModulo] = useState(' ')
  const [curso, setCurso] = useState(' ')


  const cadastrarFalta = () => {
    fetch('http://10.0.2.2:8000/falta/post', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        nomeAluno: nomeAluno,
        periodoCurso: periodo,
        nomeCurso: curso,
        moduloCurso: modulo,
        horarioFala: horario,
      })
    })      
  }


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Falta:</Text>

      <TextInput
        placeholder='Nome do Aluno(a)'
        style={[styles.input, styles.text]}
        onChangeText={text => setNomeAluno(text)}
      />

<TextInput
        placeholder='Periodo'
        style={[styles.input, styles.text]}
        onChangeText={text => setPeriodo(text)}
      />


      <TextInput
        placeholder='Módulo'
        style={[styles.input, styles.text]}
        onChangeText={text => setModulo(text)}
      />
      <TextInput
        placeholder='Horário de Entrada'
        style={[styles.input, styles.text]}
        onChangeText={text => setHorario(text)}
      />

      <TouchableOpacity style={styles.button} onPress={() => cadastrarFalta()}>
        <Text style={styles.text}>Enviar</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  text: {
    fontSize: 17,
  },
  input: {
    borderWidth: 2,
    borderRadius: 10,
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-start',
  },
  button: {
    backgroundColor: '#ffb080',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  dropdownContainer: {
    width: '80%',  // Ajuste para alinhar com o tamanho dos inputs
  },
});
