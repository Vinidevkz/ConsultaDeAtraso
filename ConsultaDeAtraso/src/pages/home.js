import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { Picker } from '@react-native-picker/picker'; // Importação corrigida

export default function Home() {
  const [nomeAluno, setNomeAluno] = useState('');
  const [horario, setHorario] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [modulo, setModulo] = useState('');
  const [curso, setCurso] = useState('');

  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const cadastrarFalta = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8000/api/faltas/post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeAluno: nomeAluno,
          horarioFalta: horario,
          periodoCurso: periodo,
          moduloCurso: modulo,
          nomeCurso: curso,
        }),
      });

      const json = await response.json();
      console.log("Sucesso ao cadastrar usuario", json);
      setFeedbackMessage('Cadastro realizado com sucesso!');
      setIsError(false);

    } catch (error) {
      console.log("Erro ao cadastrar usuario", error);
      setFeedbackMessage('Erro ao cadastrar. Tente novamente.');
      setIsError(true);
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

      <Picker
        selectedValue={curso}
        style={[styles.input, styles.text]}
        onValueChange={(itemValue) => setCurso(itemValue)}
      >
        <Picker.Item label="Selecione o Curso" value="" />
        <Picker.Item label="D.S" value="D.S" />
        <Picker.Item label="Nutrição" value="Nutrição" />
        <Picker.Item label="ADM" value="ADM" />
      </Picker>

      <Picker
        selectedValue={periodo}
        style={[styles.input, styles.text]}
        onValueChange={(itemValue) => setPeriodo(itemValue)}
      >
        <Picker.Item label="Selecione o Período" value="" />
        <Picker.Item label="Manhã" value="manhã" />
        <Picker.Item label="Tarde" value="tarde" />
        <Picker.Item label="Noite" value="noite" />
      </Picker>

      <Picker
        selectedValue={modulo}
        style={[styles.input, styles.text]}
        onValueChange={(itemValue) => setModulo(itemValue)}
      >
        <Picker.Item label="Selecione o Módulo" value="" />
        <Picker.Item label="1" value="1" />
        <Picker.Item label="2" value="2" />
        <Picker.Item label="3" value="3" />
      </Picker>

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
