import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';

const FormularioDiario = () => {
  const [nmRemedio, setNmRemedio] = useState('');
  const [descricaoRemedio, setDescricaoRemedio] = useState('');
  const [dtInicio, setDtInicio] = useState('');
  const [dtTermino, setDtTermino] = useState('');
  const [patientId, setPatientId] = useState('');

  const handleSubmit = async () => {
    try {
      const diaryData = {
        nmRemedio,
        descricaoRemedio,
        dtInicio,
        dtTermino,
        patientId
      };

      await axios.post('https://gshybrid-b5908-default-rtdb.firebaseio.com/diary.json', diaryData);

      Alert.alert('Sucesso', 'Agenda criada com sucesso!');
      setNmRemedio('');
      setDescricaoRemedio('');
      setDtInicio('');
      setDtTermino('');
      setPatientId('');

      window.location.reload();

    } catch (error) {
      console.error('Erro ao criar agenda:', error);
      Alert.alert('Erro', 'Não foi possível criar a agenda. Por favor, tente novamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Remédio:</Text>
      <TextInput
        style={styles.input}
        value={nmRemedio}
        onChangeText={(text) => setNmRemedio(text)}
        placeholder="Digite o nome do remédio"
      />

      <Text style={styles.label}>Descrição do Remédio:</Text>
      <TextInput
        style={styles.input}
        value={descricaoRemedio}
        onChangeText={(text) => setDescricaoRemedio(text)}
        placeholder="Digite a descrição do remédio"
      />

      <Text style={styles.label}>Data de Início:</Text>
      <TextInput
        style={styles.input}
        value={dtInicio}
        onChangeText={(text) => setDtInicio(text)}
        placeholder="Digite a data de início"
      />

      <Text style={styles.label}>Data de Término:</Text>
      <TextInput
        style={styles.input}
        value={dtTermino}
        onChangeText={(text) => setDtTermino(text)}
        placeholder="Digite a data de término"
      />

      <Text style={styles.label}>ID do Paciente:</Text>
      <TextInput
        style={styles.input}
        value={patientId}
        onChangeText={(text) => setPatientId(text)}
        placeholder="Digite o ID do paciente"
      />
      <Button title="Enviar" onPress={handleSubmit}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    margin: 8,
    borderWidth: 1,
    borderColor: 'rgb(119, 212, 119)',
    borderRadius: 8,
    backgroundColor: 'rgb(119, 212, 119)',
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    color: 'white',
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgb(236, 249, 236)',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    backgroundColor: 'rgb(236, 249, 236)',
    color: 'rgb(119, 212, 119)',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'firebrick',
    borderRadius: 4,
    padding: 8,
    marginTop: 8,
  },
});

export default FormularioDiario;
