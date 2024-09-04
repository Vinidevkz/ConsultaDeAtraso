import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';

export default function Home() {
  const [nomeAluno, setNomeAluno] = useState('');
  const [horario, setHorario] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [modulo, setModulo] = useState('');
  const [curso, setCurso] = useState('');

  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);

  
  const cadastrarFalta = async() => {
    try{
  const response = await fetch("http://10.0.2.2:8000/api/faltas", {
    method:"POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nomeAluno: 'AHHHH',
      horarioFalta: '12:10',
      periodoCurso:'tarde',
      moduloCurso:1,
      nomeCurso: 'Ds',
    }),
  });

    const json = await response.json();
    console.log("Sucesso ao cadastrar usuario", json);

    }catch(error){
      console.log("Erro ao cadastrar usuario", error)
    }
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
        placeholder='Nome do Curso'
        style={[styles.input, styles.text]}
        onChangeText={text => setCurso(text)}
      />

      <TextInput
        placeholder='Período'
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

      <TouchableOpacity style={styles.button} onPress={cadastrarFalta}>
        <Text style={styles.text}>Enviar</Text>
      </TouchableOpacity>

      {feedbackMessage ? (
        <Text style={[styles.feedback, isError ? styles.errorText : styles.successText]}>
          {feedbackMessage}
        </Text>
      ) : null}

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
  feedback: {
    marginTop: 20,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
  },
  successText: {
    color: 'green',
  },
});
