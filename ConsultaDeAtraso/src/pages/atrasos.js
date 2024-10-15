import { StatusBar } from 'expo-status-bar';
import { useState, useCallback, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function MinhasFaltas() {
  const [faltas, setFaltas] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState(null); 
  const [locationPermission, setLocationPermission] = useState(false);  

  // Função para gerar coordenadas aleatórias
  const gerarCoordenadasAleatorias = () => {
    const latitude = -23.5505 + (Math.random() - 0.5) * 0.01;  
    const longitude = -46.6333 + (Math.random() - 0.5) * 0.01;
    return { latitude, longitude };
  };


  useEffect(() => {
    const getLocationPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('Permissão de acesso à localização negada');
        return;
      }
      setLocationPermission(true);
    };
    getLocationPermission();
  }, []);

  useFocusEffect(
    useCallback(() => {
      const pegarFaltas = async () => {
        try {
          const response = await fetch("http://0893-200-53-194-126.ngrok-free.app/api/atraso");
          const data = await response.json();
          setFaltas(data);
          console.log(data);
        } catch (error) {
          console.error(error);
        }
      };

      pegarFaltas();
    }, [])
  );


  const converterParaMinutos = (horario) => {
    const [hora, minuto] = horario.split(':').map(Number);
    return hora * 60 + minuto;
  };

  const abrirMapa = (item) => {

    let latitude = item.latitude ? parseFloat(item.latitude) : null;
    let longitude = item.longitude ? parseFloat(item.longitude) : null;

    if (!latitude || !longitude) {
      const coordenadasAleatorias = gerarCoordenadasAleatorias();
      latitude = coordenadasAleatorias.latitude;
      longitude = coordenadasAleatorias.longitude;
    }

    setSelectedMarker({
      latitude,
      longitude,
      title: item.nomeAluno,
      description: `Curso: ${item.nomeCurso}`,
    });
    setShowMap(true);
  };

  const fecharMapa = () => {
    setShowMap(false);
    setSelectedMarker(null);
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


        <Text style={styles.horarioText}>Horário de Entrada: {horarioFormatado}</Text>
        {horarioMinutos <= limiteHorario ? (
          <Text style={styles.textoNoHorario}>Chegou no horário</Text>
        ) : (
          <Text style={styles.textoAtrasado}>Chegou atrasado</Text>
        )}


        <TouchableOpacity
          style={styles.botaoMapa}
          onPress={() => abrirMapa(item)}
        >
          <FontAwesome6 name="map-location" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {showMap && selectedMarker && locationPermission ? (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: selectedMarker.latitude || 37.78825,
              longitude: selectedMarker.longitude || -122.4324,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{
                latitude: selectedMarker.latitude,
                longitude: selectedMarker.longitude,
              }}
              title={selectedMarker.title}
              description={selectedMarker.description}
            />
          </MapView>
          {/* Botão para fechar o mapa */}
          <TouchableOpacity style={styles.botaoFecharMapa} onPress={fecharMapa}>
            <Text style={styles.textoFecharMapa}>Fechar Mapa</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={faltas}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
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
  mapContainer: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  map: {
    width: '100%',
    height: '90%',
  },
  botaoMapa: {
    backgroundColor: '#ff8f26',
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  botaoFecharMapa: {
    padding: 10,
    backgroundColor: '#ff8f26',
    alignItems: 'center',
    borderRadius: 20,
    marginVertical: 20,
  },
  textoFecharMapa: {
    color: '#fff',
  },
});
