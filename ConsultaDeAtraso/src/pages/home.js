import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Modal, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import { BarCodeScanner } from 'expo-barcode-scanner';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function Home() {
  const [nomeAluno, setNomeAluno] = useState('');
  const [periodo, setPeriodo] = useState('');
  const [modulo, setModulo] = useState('');
  const [curso, setCurso] = useState('');
  const [cursos, setCursos] = useState([]);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isError, setIsError] = useState(false);

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false); // Controle do modal da câmera

  // Função para lidar com a leitura do QR code
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setIsScannerOpen(false); // Fecha o modal após o scan

    try {
      const qrData = JSON.parse(data); // Supondo que os dados do QR code estejam no formato JSON
      setNomeAluno(qrData.nomeAluno);
      setCurso(qrData.curso);
      setPeriodo(qrData.periodo);
      setModulo(qrData.modulo);

      // Realiza o cadastro automaticamente
      await cadastrarFalta(qrData.nomeAluno, qrData.curso, qrData.periodo, qrData.modulo);
    } catch (error) {
      console.error('Erro ao processar o QR code:', error);
      alert('Erro ao processar o QR code.');
    }
  };

  // Função para solicitar a permissão da câmera e abrir o scanner
  const openScanner = async () => {
    // Solicita permissão da câmera
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    setHasPermission(status === 'granted');

    if (status === 'granted') {
        setIsScannerOpen(true);
        setScanned(false);
    } else {
        alert('Sem permissão para acessar a câmera');
    }
};



  // Função que realiza o cadastro no banco
  const cadastrarFalta = async (nomeAluno, curso, periodo, modulo) => {
    let errorMessage = '';
  
    if (!nomeAluno || !curso || !periodo || !modulo) {
      errorMessage += 'Todos os campos são obrigatórios.';
    }
  
    if (errorMessage) {
      Alert.alert(errorMessage)
      setFeedbackMessage(errorMessage);
      setIsError(true);
      return;
    }
  
    try {
      const response = await fetch("http://c501-200-53-197-8.ngrok-free.app/api/atraso", {
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
        }),
      });
  
      if (response.ok) {
        const json = await response.json();
        console.log("Sucesso ao cadastrar usuário", json);
        Alert.alert("Atraso cadastrado com sucesso!");
        setFeedbackMessage('Cadastro realizado com sucesso!');
        setIsError(false);
        setNomeAluno(null);
        setCurso(null);
        setPeriodo(null);
        setModulo(null);
      } else {
        const errorText = await response.text();
        console.log("Erro de resposta do servidor:", errorText);
        setFeedbackMessage(`Erro ao cadastrar: ${errorText}`);
        setIsError(true);
      }
    } catch (error) {
      console.log("Erro ao cadastrar usuário:", error.message);
      setFeedbackMessage(`Erro ao cadastrar. Tente novamente. Detalhes: ${error.message}`);
      setIsError(true);
    }
  };
  

  async function pegarCursos() {
    try {
      const response = await fetch("http://c501-200-53-197-8.ngrok-free.app/api/cursos");
      const data = await response.json();
      setCursos(data);
    } catch (error) {
      console.log("Erro ao buscar cursos", error);
    }
  }

  useEffect(() => {
    pegarCursos();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ width: '80%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.title}>Cadastrar Atraso:</Text>
        <TouchableOpacity style={styles.camButton} onPress={openScanner}>
          <MaterialIcons name="qr-code-scanner" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder='Nome do Aluno(a)'
        style={[styles.input, styles.text]}
        value={nomeAluno}
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

      <TouchableOpacity style={styles.button} onPress={() => cadastrarFalta(nomeAluno, curso, periodo, modulo)}>
        <Text style={[styles.text, {color: '#fff'}]}>Enviar</Text>
        <AntDesign name="arrowright" size={24} color="#fff" />
      </TouchableOpacity>

      {isScannerOpen && (
  <Modal
    animationType="slide"
    transparent={true}
    visible={isScannerOpen}
  >
    <View style={styles.modalContainer}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={styles.camera}
      />
      
      {/* Adicionando o quadrado no centro */}
      <View style={styles.targetBox}>
    <View style={[styles.corner, styles.cornerTopLeft]} />
    <View style={[styles.corner, styles.cornerTopRight]} />
    <View style={[styles.corner, styles.cornerBottomLeft]} />
    <View style={[styles.corner, styles.cornerBottomRight]} />
  </View>
      <TouchableOpacity style={styles.closeButton} onPress={() => setIsScannerOpen(false)}>
        <Text style={styles.text}>Fechar Câmera</Text>
      </TouchableOpacity>
    </View>
  </Modal>
)}

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
    alignSelf: 'left',
  },
  camButton: {
    backgroundColor: '#ff8f26',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
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
    width: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ff8f26',
    borderRadius: 25,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#ff8f26',
    padding: 10,
    borderRadius: 10,
  },
  camera: {
    width: 1000,  // Largura da janela da câmera
    height: 1000, // Altura da janela da câmera
    borderRadius: 40, // Deixa os cantos arredondados
    overflow: 'hidden',
  },
  targetBox: {
    position: 'absolute',
    width: 200, // Largura do quadrado
    height: 200, // Altura do quadrado
    borderColor: '#fff', // Cor da borda
    backgroundColor: 'rgba(255, 255, 255, 0)', // Transparente para ver o que está atrás
    top: '50%', // Centraliza verticalmente
    left: '50%', // Centraliza horizontalmente
    marginLeft: -100, // Metade da largura para ajustar
    marginTop: -100, // Metade da altura para ajustar
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    overflow: 'hidden',
  },
  corner: {
    position: 'absolute',
    width: 20, // Largura do canto
    height: 20, // Altura do canto
    backgroundColor: '#ff8f26', // Cor do canto
  },
  cornerTopLeft: {
    top: -10,
    left: -10,
  },
  cornerTopRight: {
    top: -10,
    right: -10,
  },
  cornerBottomLeft: {
    bottom: -10,
    left: -10,
  },
  cornerBottomRight: {
    bottom: -10,
    right: -10,
  },
  
});
