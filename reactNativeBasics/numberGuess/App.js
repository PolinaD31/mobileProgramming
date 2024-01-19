import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert} from 'react-native';

export default function App() {
const [num, setNum] = useState('')
const [randomNumber, setRandomNumber] = useState('')
const [message, setMessage] = useState('Guess a number between 1-100')
const [guessNumber, setGuessNumber] = useState(0)

const startGame = () => {
  setRandomNumber(Math.floor(Math.random() * 100) + 1)
}

const guess = () => {
  if (num === randomNumber) {
    Alert.alert(`You guessed the number in ${guessNumber + 1} guesses`)
    setGuessNumber(0)
    setNum('')
    setMessage('Guess a number between 1-100')
    startGame()
  } else if (num < randomNumber) {
    setMessage("Your guess is too low")
    setGuessNumber(guessNumber + 1)
    setNum('')
  } else {
    setMessage("Your guess is too high")
    setGuessNumber(guessNumber + 1)
    setNum('')
  }
}

useEffect(() => {
  startGame()
}, [])

  return (
    <View style={styles.container}>
      <Text>{message}</Text>
      <TextInput style={{width: 200, borderColor: 'black', 
        borderWidth: 1}} keyboardType='numeric' onChangeText={text => setNum(Number(text))} value={num} />
      <Button title='Make a guess' onPress={guess} />
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
