import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, Image, TextInput,TouchableOpacity , Keyboard } from 'react-native';
import { Button } from 'react-native-elements';
import { ClienteContext } from './ClienteContext';


export default function Produto({ route, navigation }) {

  const { id,nome, endereco, whatsapp } = route.params || {};
  const { adicionarCliente } = useContext(ClienteContext);
  const [nomeProduto, setNomeProduto] = useState('');
  const [valor, setValor] = useState('');
  const [quantidade, setQuantidade] = useState(1);

   // Função para gerar UUIDs para o produto
   const generateUUIDProduto = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

  const MudarPagLista = () => {
    const valorTotal = parseFloat(valor) * parseFloat(quantidade); // Calculando o valor total
    const idProduto = generateUUIDProduto();
    if (nomeProduto && valor) {
      const cliente = {
        id,
        nome,
        endereco,
        whatsapp,
        produto: {
          id:idProduto,
          nome: nomeProduto,
          valor:parseFloat(valor), // Certificando que o valor é um número,
          quantidade,
          valorTotal, // Armazenando o valor total
        },
      };
      adicionarCliente(cliente);
      navigation.navigate('Lista');
    } else {
      alert('Por favor, preencha todos os campos do produto.');
    }
  };

  const aumentarQuantidade = () => {
    setQuantidade(quantidade + 1);
  };

  const diminuirQuantidade = () => {
    if (quantidade > 1) {
      setQuantidade(quantidade - 1);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={Keyboard.dismiss} activeOpacity={1}>
      <View style={styles.container}>

        <View style={styles.cabecalho}>
          <Image source={require('../assets/iconeBranco.png')} />
          <Text style={styles.nomeEmpresa}>Nome da Empresa</Text>
        </View>

        <View style={styles.fundoBranco}>

          <View style={styles.titulo}>
            <Text style={styles.textoIntro}>Cliente: {nome}</Text>
          </View>

          <View style={styles.cadastro}>
            <View>
              <Text style={styles.label}>Nome do Produto:</Text>
              <TextInput
                style={styles.input}
                value={nomeProduto}
                onChangeText={setNomeProduto}
              />
            </View>

            <View>
              <Text style={styles.label}>Valor do Produto und.:</Text>
              <TextInput
                style={styles.input}
                value={valor}
                onChangeText={setValor}
                keyboardType='numeric'
              />
            </View>

            <View>
              <Text style={styles.label}>Quantidade do Produto:</Text>
              <View style={styles.quantidade}>

                <TouchableOpacity style={styles.menos} onPress={diminuirQuantidade}>
                  <Text style={styles.textoQuantidade}>-</Text>
                </TouchableOpacity>
                <Text style={styles.resultadoQuantidade}>{quantidade}</Text>
                <TouchableOpacity style={styles.mais} onPress={aumentarQuantidade}>
                  <Text style={styles.textoQuantidade}>+</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>

          <View style={styles.buttons}>
            <Button
              title="Cancelar"
              buttonStyle={styles.cancelar}
              titleStyle={styles.buttonText}
              onPress={() => alert('Botão Cancelar pressionado!')}
            ></Button>
            <Button
              title="Adicionar"
              buttonStyle={styles.adicionar}
              titleStyle={styles.buttonText}
              onPress={MudarPagLista}
            ></Button>
          </View>        

        </View>
        
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F38708',
    // alignItems: 'center',
    // justifyContent: 'space-between',
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
    // justifyContent:'center',
    marginVertical:24
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
  },
  quantidade:{
    flexDirection:'row',
    gap:30,
    marginTop:12,
    justifyContent:'center'
  },
  menos:{
    backgroundColor:'#4A4A4A',
    width:90,
    height:50,
    borderRadius:10
  },
  mais:{
    backgroundColor:'#3632EF',
    width:90,
    height:50,
    borderRadius:10
  },
  textoQuantidade:{
    color:'white',
    fontSize:40,
    fontWeight:'bold',
    margin:'auto'
  },
  resultadoQuantidade:{
    fontSize:24,
    marginVertical:'auto',
  }
});