import React, { useContext, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, FlatList, Alert } from 'react-native';
import { Button } from 'react-native-elements';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { ClienteContext } from './ClienteContext';
import { RectButton, Swipeable } from 'react-native-gesture-handler';

export default function Lista({ navigation }) {
  const { clientes, setClientes } = useContext(ClienteContext);
  const [termoBusca, setTermoBusca] = useState('');
  const [clientesFiltrados, setClientesFiltrados] = useState(clientes);

  useEffect(() => {
    setClientesFiltrados(clientes);
  }, [clientes]);

  const MudarPagCadastro = () => {
    navigation.navigate('Cadastro');
  };

  const calcularDebitoTotal = () => {
    return clientes.reduce((total, cliente) => total + (cliente.produto?.valorTotal || 0), 0).toFixed(2);
  };

  const calcularDiasPassados = (dataRegistro) => {
    if (!dataRegistro) return 0;
    const hoje = new Date();
    const dataReg = new Date(dataRegistro);
    const diffTime = Math.abs(hoje - dataReg);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const buscarClientes = () => {
    const filtrados = clientes.filter(cliente =>
      cliente.nome.toLowerCase().includes(termoBusca.toLowerCase())
    );
    setClientesFiltrados(filtrados);
  };

  const adicionarProduto = (cliente) => {
    navigation.navigate('Produto', { cliente });
  };

  const excluirCliente = (cliente) => {
    Alert.alert(
      "Excluir Cliente",
      `Tem certeza que deseja excluir ${cliente.nome}?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: () => {
            setClientes(clientes.filter(c => c !== cliente));
          }
        }
      ]
    );
  };

  const renderRightActions = (cliente) => {
    return (
      <View style={styles.actionsContainer}>
        <RectButton style={[styles.actionButtonBlue, styles.addButton]} onPress={() => adicionarProduto(cliente)}>
          <Ionicons name="add" size={24} color="white" />
        </RectButton>
        <RectButton style={[styles.actionButtonRed, styles.deleteButton]} onPress={() => excluirCliente(cliente)}>
          <Ionicons name="trash" size={24} color="white" />
        </RectButton>
      </View>
    );
  };

  return (
    <View style={styles.container}>

      <View style={styles.cabecalho}>
        <Image source={require('../assets/iconeBranco.png')} />
        <Text style={styles.nomeEmpresa}>Nome da Empresa</Text>
      </View>

      <View style={styles.fundoBranco}>

        <View style={styles.listaButton}>
          <Text style={styles.textoLista}>Lista de Devedores:</Text>
          <Button
            title="Adicionar"
            buttonStyle={styles.buttonAdd}
            titleStyle={styles.buttonText}
            icon={<Ionicons name="person-add-sharp" size={24} color="white" />}
            onPress={MudarPagCadastro}
          />
        </View>

        <View style={styles.pesquisar}>
          <TextInput
            style={styles.input}
            placeholder="Digite o nome do cliente"
            value={termoBusca}
            onChangeText={setTermoBusca}
          />
          <Button
            buttonStyle={styles.buttonPesquisar}
            icon={<MaterialIcons name="search" size={32} color="white" />}
            onPress={buscarClientes}
          />
        </View>

        <FlatList
          data={clientesFiltrados}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <Swipeable renderRightActions={() => renderRightActions(item)}>
              <View style={styles.clienteItem}>
                <View style={styles.itemNome}>
                  <Text style={styles.clienteNome}>Nome:</Text>
                  <Text style={styles.clienteNome}>{item.nome}</Text>
                </View>

                <View style={styles.item}>
                  <Text style={styles.clienteDetalhes}>Tempo de Débito:</Text>
                  <Text style={styles.clienteDetalhes}>{calcularDiasPassados(item.produto.dataRegistro)} dias</Text>
                </View>

                <View style={styles.item}>
                  <Text style={styles.clienteDetalhes}>Valor do Débito:</Text>
                  <Text style={styles.clienteDetalhes}>R${item.produto.valorTotal.toFixed(2)}</Text>
                </View>

                <View style={styles.item}>
                  <Text style={styles.clienteDetalhes}>Endereço:</Text>
                  <Text style={styles.clienteDetalhes}>{item.endereco}</Text>
                </View>

                <View style={styles.item}>
                  <Text style={styles.clienteDetalhes}>WhatsApp:</Text>
                  <Text style={styles.clienteDetalhes}>{item.whatsapp}</Text>
                </View>

                <View style={styles.item}>
                  <Text style={styles.clienteDetalhes}>Produto:</Text>
                  <Text style={styles.clienteDetalhes}>{item.produto.nome}</Text>
                </View>

              </View>
            </Swipeable>
          )}
        />

      </View>

      <View style={styles.SomaValores}>
        <Text style={styles.SomaValoresTexto}>Débito Total:</Text>
        <Text style={styles.SomaValoresTexto}>R$ {calcularDebitoTotal()}</Text>
      </View>

    </View>
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
    height:600,
    marginTop:20
  },
  listaButton:{
    flexDirection:"row",
    alignItems:'center',
    justifyContent:'center',
    marginVertical:24,
    gap:10
  },
  textoLista:{
    fontSize:20,
    fontWeight:'bold'
  },
  buttonAdd:{
    backgroundColor:'#F38708',
    height:56,
    width:160,
    borderRadius:10
  },
  buttonText:{
    fontWeight:'bold',
    fontSize:18
  },
  input:{
    borderColor:'#F38708',
    borderRadius:10,
    borderWidth:1,
    backgroundColor:'white',
    width:300,
    height:52,
    paddingHorizontal:4,
    marginBottom:6
  },
  buttonPesquisar:{
    backgroundColor:'#F38708',
    borderRadius:10,
    width:52,
    height:52
  },
  pesquisar:{
    flexDirection:'row',
    justifyContent:'center',
    gap:8
  },
  fundoCinza:{
    alignItems:'center',
    marginTop:100
  },
  clienteItem:{
    margin:'auto',
    marginTop:10,
    width:"90%",
    backgroundColor:'#FAFAFA',
    borderRadius:4,
    // Estilo de sombra para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    // Estilo de sombra para Android
    elevation: 5,
    padding:10
  },
  item:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  itemNome:{
    flexDirection:'row',
    justifyContent:'space-between',
    backgroundColor:'#F38708',
    paddingVertical:4,
    paddingHorizontal:2,
    borderRadius:4
  },
  clienteNome:{
    color:'white',
    fontWeight:'bold',
    fontSize:16
  },
  clienteDetalhes:{

  },
  SomaValores:{
    width:340,
    height:50,
    backgroundColor:'white',
    margin:'auto',
    padding:4,
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center',
    borderRadius:4
  },
  SomaValoresTexto:{
    fontSize:18,
    fontWeight:'bold'
  },
  actionsContainer:{
    justifyContent:'space-around',
    height:120,
    marginTop:16,
    marginRight:10
  },
  actionButtonRed:{
    backgroundColor:'#4A4A4A',
    padding:4,
    borderRadius:4
  },
  actionButtonBlue:{
    backgroundColor:'#3632EF',
    padding:4,
    borderRadius:4
  }
});