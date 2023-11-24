import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Card/Card';
import { StyleSheet, View } from 'react-native';

const Listagem = () => {
  const [diaryDetails, setDiaryDetails] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.get('https://gshybrid-b5908-default-rtdb.firebaseio.com/diary.json');
            if (response.data) {
                const diaryArray = Object.keys(response.data).map((key) => ({
                    idAgenda: key,
                    ...response.data[key],
                }));
                setDiaryDetails(diaryArray);
            }
        } catch (error) {
            console.error('Erro ao buscar os detalhes da agenda:', error);
        }
    };

    fetchData();
  }, [refresh]);

  const handleRefresh = () => {
    setRefresh((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      {diaryDetails.map((diary) => (
        <Card
          key={diary.idAgenda}
          idAgenda={diary.idAgenda}
          nmRemedio={diary.nmRemedio}
          descricaoRemedio={diary.descricaoRemedio}
          dtInicio={diary.dtInicio}
          dtTermino={diary.dtTermino}
          patientId={diary.patientId}
          setRefresh={handleRefresh}
        />
      ))}
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
  },
});

export default Listagem;
