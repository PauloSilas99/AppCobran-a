import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';



export default function Cadastro({navigation}) {

  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [whatsapp, setWhatsapp] = useState('');

  // Função para gerar UUIDs
  const generateUUID = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const  MudarPagProduto = () =>{
    if(nome && endereco && whatsapp){
      const id = generateUUID(); // Gerar um UUID único
      navigation.navigate('Produto', {id,nome, endereco, whatsapp});
    }else{
      alert('Por favor,preencha todos os campos')
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.cabecalho}>
          <Image source={require('../assets/iconeBranco.png')} />
          <Text style={styles.nomeEmpresa}>Nome da Empresa</Text>
        </View>

        <View style={styles.fundoBranco}>
          <View style={styles.titulo}>
            <Text style={styles.textoIntro}>
              <Ionicons name="person-add-sharp" size={24} color="black" /> Adicionar Cliente
            </Text>
          </View>

          <View style={styles.cadastro}>
            <View>
              <Text style={styles.label}>Nome:</Text>
              <TextInput style={styles.input} value={nome} onChangeText={setNome} />
            </View>
            <View>
              <Text style={styles.label}>Endereço:</Text>
              <TextInput style={styles.input} value={endereco} onChangeText={setEndereco} />
            </View>
            <View>
              <Text style={styles.label}>WhatsApp:</Text>
              <TextInput style={styles.input} value={whatsapp} onChangeText={setWhatsapp} keyboardType="numeric"  maxLength={11}/>
            </View>
          </View>

          <View style={styles.buttons}>
            <Button
              title="Cancelar"
              buttonStyle={styles.cancelar}
              titleStyle={styles.buttonText}
              onPress={() =>{
                // setEndereco('')
                // setNome('')
                // setWhatsapp('')
                alert('Operação Cancelada!')
                navigation.navigate('Lista');
              }}
            />
            <Button
              title="Adicionar"
              buttonStyle={styles.adicionar}
              titleStyle={styles.buttonText}
              onPress={MudarPagProduto}
            />
          </View>
        </View>
      </View>
  </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F38708',
    paddingBottom:46
  },
  cabecalho:{
    marginTop:60,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center',
    gap:10
  },
  nomeEmpresa:{
    fontSize:24,
    fontWeight:'bold',
    color:'white'
  },
  fundoBranco:{
    backgroundColor:'white',
    width:'100%',
    height:650,
    marginTop:20
  },
  textoIntro:{
    fontSize:20,
    fontWeight:'bold'
  },
  titulo:{
    alignItems:'center',
    marginVertical:20
  },
  cadastro:{
    width:'95%',
    height:360,
    backgroundColor:'white',
    marginBottom:30,
    marginHorizontal:'auto',
    borderRadius:10,
    // Estilo de sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Estilo de sombra para Android
    elevation: 5,
  },
  input:{
    borderColor:'#F38708',
    borderRadius:6,
    borderWidth:1,
    backgroundColor:'white',
    width:'90%',
    height:40,
    paddingHorizontal:4,
    marginHorizontal:'auto',
    marginTop:10
  },
  label:{
    color:'#F38708',
    fontSize:20,
    fontWeight:'bold',
    marginHorizontal:'5%',
    marginTop:30
  },
  buttons:{
    flexDirection:'row',
    justifyContent:'center',
    marginTop:20,
    gap:10
  },
  cancelar:{
    backgroundColor:'#4A4A4A',
    height:55,
    width:140,
    borderRadius:10
  },
  adicionar:{
    backgroundColor:'#3632EF',
    height:55,
    width:140,
    borderRadius:10
  },
  buttonText:{
    fontWeight:'bold'
  }
});