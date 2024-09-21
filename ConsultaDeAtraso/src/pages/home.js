import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';

import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function Home() {
  const [nomeAluno, setNomeAluno] = useState('');
  const [horario, setHorario] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [modulo, setModulo] = useState('');
  const [curso, setCurso] = useState('');
  const [cursos, setCursos] = useState([]); // Estado para armazenar os cursos
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const cadastrarFalta = async () => {
    if (!nomeAluno || !horario || !periodo || !modulo || !curso) {
      setFeedbackMessage('Por favor, preencha todos os campos.');
      setIsError(true);
      return;
    }
  
    try {
      const response = await fetch("http://339e-200-53-197-8.ngrok-free.app/api/atraso", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nomeAluno: nomeAluno,
          nomeCurso: curso,
          periodoCurso: periodo,
          moduloCurso: modulo,
          horarioAtraso: "12:30",
        }),
      });
  
      // Verifique se a resposta tem status 200-299
      if (response.ok) {
        const json = await response.json();
        console.log("Sucesso ao cadastrar usuário", json);
        setFeedbackMessage('Cadastro realizado com sucesso!');
        setIsError(false);
      } else {
        // Resposta de erro com status fora da faixa 200
        const errorText = await response.text();  // Tenta pegar o texto da resposta de erro
        console.log("Erro de resposta do servidor:", errorText);
        setFeedbackMessage(`Erro ao cadastrar: ${errorText}`);
        setIsError(true);
      }
    } catch (error) {
      // Captura erros de rede ou outros erros
      console.log("Erro ao cadastrar usuário:", error.message);
      setFeedbackMessage(`Erro ao cadastrar. Tente novamente. Detalhes: ${error.message}`);
      setIsError(true);
    }
  };
  
  

  async function pegarCursos() {
    try {
      const response = await fetch("http://339e-200-53-197-8.ngrok-free.app/api/cursos");
      const data = await response.json();
      setCursos(data); // Armazena os cursos no estado
    } catch (error) {
      console.log("Erro ao buscar cursos", error);
    }
  }

  // useEffect para carregar os cursos ao montar o componente
  useEffect(() => {
    pegarCursos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
      <Text style={styles.title}>Cadastrar Atraso:</Text>

      <TouchableOpacity style={styles.camButton}>
       <MaterialIcons name="qr-code-scanner" size={24} color="black" />
      </TouchableOpacity>
      </View>

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
        {cursos.map((cursoItem) => (
          <Picker.Item key={cursoItem.idCurso} label={cursoItem.nomeCurso} value={cursoItem.nomeCurso} />
        ))}
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
    alignSelf: 'left'
  },
  camButton: {
    backgroundColor: '#ff8f26',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 17,
  },
  input: {
    borderBottomWidth: 2,
    borderRadius: 10,
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#ff8f26',
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
