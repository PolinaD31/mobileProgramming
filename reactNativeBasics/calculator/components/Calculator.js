import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function Calculator({ navigation }) {
  const [number1, setNumber1] = useState('')
  const [number2, setNumber2] = useState('')
  const [result, setResult] = useState('')
  const [history, setHistory] =useState([])

  const addNumbers = () => {
    const addition = number1 + number2
    setResult(addition)
    setHistory([...history, {key: `${number1} + ${number2} = ${addition}`}])
    setNumber1('')
    setNumber2('')
  }

  const subtractNumbers = () => {
    const subtraction = number1 - number2
    setResult(subtraction)
    setHistory([...history, {key: `${number1} - ${number2} = ${subtraction}`}])
    setNumber1('')
    setNumber2('')
  }

  return (
    <View style={styles.container}>
      <Text>Result: {result}</Text>
      <TextInput
        style={{ width: 200, borderColor: 'black', borderWidth: 1, marginBottom: 5 }}
        keyboardType="numeric"
        onChangeText={(text) => setNumber1(Number(text))}
        value={String(number1)}
      />
      <TextInput
        style={{ width: 200, borderColor: 'black', borderWidth: 1 }}
        keyboardType="numeric"
        onChangeText={(text) => setNumber2(Number(text))}
        value={String(number2)}
      />
      <View style={{ flexDirection: 'row' }}>
        <Button title="+" onPress={addNumbers} />
        <Button title="-" onPress={subtractNumbers} />
        <Button
            title="History"
            onPress={() => navigation.navigate('History', { history })}
        />
      </View>
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
  },
});
