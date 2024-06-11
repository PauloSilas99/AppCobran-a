import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ClienteProvider } from './src/ClienteContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Login from './src/Login.js';
import Lista from './src/Lista.js';
import Cadastro from './src/Cadastro.js';
import Produto from './src/Produto.js';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ClienteProvider>
        <NavigationContainer>
        <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Lista' component={Lista} />
          <Stack.Screen name='Cadastro' component={Cadastro} />
          <Stack.Screen name='Produto' component={Produto} />
        </Stack.Navigator>
      </NavigationContainer>
      </ClienteProvider>
    </GestureHandlerRootView>
  );
}