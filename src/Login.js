import React from "react";
import { StyleSheet, Text, View, Image, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-elements';



export default function Login({navigation}) {

  const[username,setUsername] = React.useState('');
  const[password,setPassword] = React.useState('');

  const entrar = () =>{
    navigation.navigate('Lista',{username});
    // if(username === 'paulo' && password === '12345'){
    //   navigation.navigate('Lista',{username});
    // }else{
    //   Alert.alert("Login inválido")
    // }
  }
 

  return (
      
        <View style={styles.container}>

          <View style={styles.fundoBranco}>
            <Image source={require('../assets/icone.png.png')}/>
            <Text style={styles.textoIcone}>App Cobrança</Text>
          </View>

          <View style={styles.sobrepor}>

              <View>
                  <Text style={styles.textoIcone}>Login</Text>
              </View>
              <View>
                  <Text style={styles.label}>Nome:</Text>
                  <TextInput style={styles.input}  placeholder="Digite o nome de sua Empresa"></TextInput>
              </View>
              <View>
                  <Text style={styles.label}>Senha:</Text>
                  <TextInput style={styles.input} placeholder="Digite sua Senha" secureTextEntry={true} ></TextInput>
              </View>

              <View>
                  <Button 
                    title="Entrar"
                    buttonStyle={styles.button}
                    titleStyle={styles.buttonText}
                    onPress={entrar}
                  />
              </View>

              <View style={styles.campoLink}>
                <Text>Ainda não tem uma conta? </Text>
                <Text style={styles.link}>
                  Criar conta
                </Text>
              </View>

          </View>

          <Text style={styles.textoVersao}>Versão 1.0.0</Text>

        </View>
      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F38708',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom:46
  },
  textoVersao:{
    color:'white',
    fontWeight:'bold'
  },
  textoIcone:{
    color:'#F38708',
    fontSize:32,
    fontWeight:'bold',
    marginTop:20
  },
  fundoBranco:{
    backgroundColor:'white',
    width:'100%',
    height:440,
    borderRadius:16,
    borderStartStartRadius:0,
    borderTopRightRadius:0,
    justifyContent:'center',
    alignItems:'center'
  },
  sobrepor:{
    backgroundColor:'#FAFAFA',
    width:335,
    height:335,
    alignItems: 'center',
    position: 'absolute',
    marginTop:360,
    borderRadius:16,
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
    borderRadius:10,
    borderWidth:1,
    backgroundColor:'white',
    width:270,
    height:40,
    paddingHorizontal:14,
    paddingVertical:20,
    marginBottom:6
  },
  label:{
    color:'#F38708',
    fontSize:16,
    fontWeight:'bold',
    marginBottom:4
  },
  button:{
    borderRadius:8,
    backgroundColor:'#F38708',
    height:40,
    width:125,
    marginTop:20
  },
  buttonText:{
    fontWeight:'bold'
  },
  link:{
    color:'blue'
  },
  campoLink:{
    flexDirection:'row',
    marginTop:40,
    justifyContent:'flex-start'
  }
});