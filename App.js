
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, Button, Keyboard } from 'react-native';
import Outro from './components/Outro';
import PrevisaoItem from './components/PrevisaoItem';

const baseUrl = "https://api.openweathermap.org/data/2.5";
const endPointForecast = "/forecast?lang=pt_br&units=metric";
const endPointOneCall = "/onecall?lang=pt_br&units=metric";
const apiKey = "e2014975b82e748e2bf1d191ff8f31b4";

export default function App() {
  
  const [cidade, setCidade] = useState('');
  const [previsoes, setPrevisoes] = useState([]);
  const [detalhes, setDetalhes] = useState({ current: {}, cidade: {} });
   
  const capturarCidade = (cidade) => {
    setCidade(cidade);
  }

  const obterDetalhes = (coord) => {
    const target = `${baseUrl}${endPointOneCall}&lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}`;
    fetch(target)
    .then((dados) => dados.json())
    .then((dados) => setDetalhes(dados))
  }

  const obtemPrevisoes = () => {
    setPrevisoes([]);
    //const target = endPoint + cidade + "&appid=" + apiKey;
    const target = `${baseUrl}${endPointForecast}&q=${cidade}&appid=${apiKey}`;
    
    fetch(target)
    .then((dados) => dados.json())
    .then((dados) => {
      setPrevisoes(dados['list'])
      obterDetalhes(dados['city']['coord'])
      Keyboard.dismiss()
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.entrada}>
        <TextInput 
          style={styles.nomeCidade}
          value={cidade}
          placeholder="Nome de uma cidade"
          onChangeText={capturarCidade}
        />
        <Button 
          title="OK"
          onPress={obtemPrevisoes}
        />
      </View>
      <View>
        <Outro detalhes={detalhes}></Outro>
      </View>
      {/*<FlatList 
        data={previsoes}
        renderItem={ previsao => (
          //<Text>{JSON.stringify(previsao)}</Text>
          <PrevisaoItem previsao={previsao.item}/>
          
        )}
        />*/}           
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 40,
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FFF',
    
  },
  entrada: {
    flexDirection: 'row',
    justifyContent: "space-between",
    marginBottom: 8,
  },
  nomeCidade:{
    padding: 12,
    borderBottomColor: '#BB96F3',
    borderBottomWidth: 2,
    textAlign: 'left',
    flexGrow: 0.9

  },
});
