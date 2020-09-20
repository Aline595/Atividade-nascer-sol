import React, { useState } from 'react';
import Cartao from './Cartao';
import {StyleSheet, View, Image, Text} from 'react-native';

const Outro = (props) => {

    return(
        <Cartao>
            <View style={estilos.tela} >
                <Image 
                style={estilos.imagem}
                source={{uri: "https://openweathermap.org/img/wn/01d.png"}}
                />
                <View>
                    <View style={estilos.primeiraLinha}>
                        <Text>Nascer do sol: {new Date(props.detalhes.current.sunrise * 1000).toLocaleTimeString()}</Text>
                    </View>
                    <View style={estilos.segundaLinha}>
                        <Text>Por do sol: {new Date(props.detalhes.current.sunset * 1000).toLocaleTimeString()}</Text>
                    </View>
                    <View style={estilos.segundaLinha}> 
                        <Text style={estilos.valor}>Sensação termica: {props.detalhes.current.feels_like + "\u00B0 " }</Text>
                    </View>
                </View>
            </View>
        </Cartao>
    )
}

const estilos = StyleSheet.create({
    valor: {
      marginHorizontal: 2,
    },
    primeiraLinha:{
      justifyContent: 'center',
      flexDirection: 'row'
    },
    segundaLinha: {
      //flex: 1,
      flexDirection: 'row',
      justifyContent: 'center',
      marginTop: 4,
      borderTopWidth: 1,
      borderTopColor: '#DDD'
    },
    cartao: {
      marginBottom: 8,
    },
    tela: {
      flexDirection: 'row'
    },
    imagem: {
      width: 50,
      height: 50
    }
});

export default Outro;