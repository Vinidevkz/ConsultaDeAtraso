import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useState, useEffect } from 'react';

export default function Home() {
  const [selectedValue, setSelectedValue] = useState(null);
  const [cursos, setCursos] = useState([]);

  // async function pegarCursos() {
  //   try {
  //     const response = await fetch('http://10.0.2.2:8000/api/curso');
  //     const json = await response.json();
  //     const formattedCursos = json.map(curso => ({
  //       label: curso.nome, // Ajuste isso para corresponder ao campo que você quer mostrar
  //       value: curso.id    // Ajuste isso para corresponder ao campo que você quer usar como valor
  //     }));
  //     setCursos(formattedCursos);
  //   } catch (error) {
  //     console.error('Erro ao buscar cursos:', error);
  //   }
  // }

  // useEffect(() => {
  //   pegarCursos();
  // }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Falta:</Text>

      <TextInput
        placeholder='Nome do Aluno(a)'
        style={[styles.input, styles.text]}
      />

      <View style={styles.dropdownContainer}>
        {/* <RNPickerSelect
          placeholder={{
            label: 'Selecione uma opção...',
            value: null,
          }}
          onValueChange={(value) => setSelectedValue(value)}
          items={cursos}
          value={selectedValue}
        /> */}
        <Text>Selecionado: {selectedValue}</Text>
      </View>

      <TextInput
        placeholder='Módulo'
        style={[styles.input, styles.text]}
      />
      <TextInput
        placeholder='Horário de Entrada'
        style={[styles.input, styles.text]}
      />

      <TouchableOpacity style={styles.button}>
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
