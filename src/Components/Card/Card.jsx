import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Text, View, Button, TextInput, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

const Card = ({ idAgenda, nmRemedio, descricaoRemedio, dtInicio, dtTermino, patientId, setRefresh }) => {
    const [patientName, setPatientName] = useState('');
    const [editedRemedio, setEditedRemedio] = useState(nmRemedio);
    const [editedDescricao, setEditedDescricao] = useState(descricaoRemedio);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchPatientName = async () => {
            try {
                const response = await axios.get('https://gshybrid-b5908-default-rtdb.firebaseio.com/patient.json');
                if (response.data) {
                    const patientsArray = Object.values(response.data);
                        const foundPatient = patientsArray.find((patient) => patient.patientId === patientId);
                        if (foundPatient) {
                        setPatientName(foundPatient.nmPaciente);
                    }
                }
            } catch (error) {
                console.error('Erro ao buscar o nome do paciente:', error);
            }
        };

        fetchPatientName();
    }, [patientId]);

    const handleDelete = async (idAgenda) => {
        try {
            await axios.delete(`https://gshybrid-b5908-default-rtdb.firebaseio.com/diary/${idAgenda}.json`);
            console.log(idAgenda)
            setRefresh();
            window.location.reload();
        } catch (error) {
            console.error('Erro ao excluir registro da agenda:', error);
        }
    };

    const handleEdit = async () => {
        try {
            const updatedDetails = {
                nmRemedio: editedRemedio,
                descricaoRemedio: editedDescricao,
                dtInicio,
                dtTermino,
                patientName,
            };

            await axios.put(`https://gshybrid-b5908-default-rtdb.firebaseio.com/diary/${idAgenda}.json`, updatedDetails);
            setIsEditing(false);
            setRefresh();
        } catch (error) {
            console.error('Erro ao editar detalhes da agenda:', error);
        }
    };

    return (
        <View style={styles.card}>
            {isEditing ? (
                <View>
                    <TextInput
                        style={styles.input}
                        value={editedRemedio}
                        onChangeText={(text) => setEditedRemedio(text)}
                    />
                    <TextInput
                        style={styles.input}
                        value={editedDescricao}
                        onChangeText={(text) => setEditedDescricao(text)}
                    />
                    <Button title="Salvar Alterações" onPress={handleEdit} />
                </View>
            ) : (
                <View>
                    <Text style={styles.titule}>Registro Médico</Text>
                    <Text style={styles.label}>Nome do Remédio: {nmRemedio}</Text>
                    <Text style={styles.label}>Descrição do Remédio: {descricaoRemedio}</Text>
                    <Text style={styles.label}>Data de Início: {dtInicio}</Text>
                    <Text style={styles.label}>Data de Término: {dtTermino}</Text>
                    <Text style={styles.label}>Nome do Paciente: {patientName}</Text>
                    <View style={styles.iconContainer}>
                        <Button title="Editar" onPress={() => setIsEditing(true)} />
                        <Button title="Excluir" onPress={() => handleDelete(idAgenda)} />
                    </View>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: 'rgb(119, 212, 119)', // Cor da borda
        borderRadius: 8,
        padding: 16,
        margin: 8,
        backgroundColor: 'rgb(119, 212, 119)',
    },
    input: {
        borderWidth: 1,
        borderColor: 'rgb(236, 249, 236)', // Cor do input
        borderRadius: 4,
        padding: 8,
        marginBottom: 8,
        backgroundColor: 'rgb(236, 249, 236)',
    },
    label: {
        color: 'white', // Cor do texto
        marginBottom: 8,
    },
    titule: {
        color: 'white', // Cor do texto
        marginBottom: 8,
        fontWeight: 'bold'
    },
    iconContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
});

export default Card;
