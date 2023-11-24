import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FormularioDiario from '../Components/Formulario/Formulario';
import Listagem from '../Components/Listagem/Listagem';
import Icon from 'react-native-vector-icons/FontAwesome'; // Importe o ícone desejado
import { StyleSheet, Text, View } from 'react-native';

const Tab = createBottomTabNavigator();

const MonitoramentoSaude = () => {
  return (
    <View style={styles.container}>
      <Icon name="user-md" size={50} color="mediumaquamarine" />
      <Text style={styles.title}>Monitoramento de Saúde</Text>
      <Text style={styles.description}>
        É importante monitorar sua saúde para garantir um estilo de vida saudável. Utilize o formulário para registrar informações relevantes.
      </Text>
    </View>
  );
};

const MainPage = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Monitoramento" component={MonitoramentoSaude} />
        <Tab.Screen name="Formulário" component={FormularioDiario} />
        <Tab.Screen name="Listagem" component={Listagem} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'mediumseagreen',
  },
  description: {
    textAlign: 'center',
    color: 'mediumseagreen',
  },
});

export default MainPage;
