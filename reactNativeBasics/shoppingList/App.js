import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';

export default function App() {
  const [shoppingList, setShoppingList] = useState([])
  const [item, setItem] = useState('')

  const addToList = () => {
    setShoppingList([...shoppingList, { key: item }])
    setItem('')
  }

  return (
    <View style={styles.container}>
      <TextInput style={{width: 200, borderColor: 'black', 
        borderWidth: 1}} onChangeText={text => {setItem(text)}} value={item} />
      <View style={{flexDirection: 'row', marginTop: 30}} >
        <Button title='add' onPress={addToList} />
        <Button title='clear' onPress={() => setShoppingList([])} />
      </View>
      <Text style={{fontWeight: 'bold', marginTop: 20, color: 'blue'}}>Shopping List</Text>
      <FlatList data={shoppingList} renderItem={({ item }) => <Text>{item.key}</Text>} keyExtractor={(item, index) => index.toString()} />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 300,
  },
});
