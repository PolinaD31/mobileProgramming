import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Button, Image, Alert, TextInput } from 'react-native';

export default function App() {
  const [recipies, setResipies] = useState([])
  const [keyword, setKeyword] = useState("")

  const getRecipies = () => {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${keyword}`)
    .then(response => response.json())
    .then(data => {
      setResipies(data.meals)
    })
    .catch(err => {
      Alert.alert("Error", err)
    })
  }

  return (
    <View style={styles.container}>
      <View style={{marginTop: 45}}>
        <TextInput 
          style={{fontSize: 18, textAlign: "center"}} 
          placeholder='enter keyword' 
          value={keyword}
          onChangeText={text => setKeyword(text)} 
        />
        <Button title="Find recipies" onPress={getRecipies} />
      </View>
      <FlatList
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) =>
          <View>
            <Text
            style={{fontSize: 18, fontWeight: "bold", marginTop: 5}}>{item.strMeal}
            </Text>
            <Image source={{uri: item.strMealThumb}}
              style={{width: 100, height: 100}} />
          </View>}
        data={recipies}
        style={{marginTop: 10}}
         />
      <StatusBar hidden={true} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
