import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, ActivityIndicator} from 'react-native';

import api from './src/services/api';
import Filmes from './src/Filmes';

export default function App() {

  const [filmes, setFilmes] = useState([]);
  const [loading, setLoading] = useState(true);
       useEffect(()=>{
        async function loadFilmes(){
                const reponse = await api.get('r-api/?api=filmes');
                //console.log(reponse.data);
                setFilmes(reponse.data);
                setLoading(false);
        }
        loadFilmes();
      },[]);

      if(loading){
        return(
          <View style={{alignItems:'center', justifyContent:'center', flex:1}}>
              <ActivityIndicator color="#121212" size={45}/>
          </View>
        )
      }else{
        return (
          <View style={styles.container}>
              <FlatList data={filmes}
              keyExtractor={ item => String(item.id)}
              renderItem={ ({item}) => <Filmes data={item}/>}>
      
              </FlatList>
          </View>
        );
      } 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
