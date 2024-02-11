import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {
  const [currencyRates, setCurrencyRates] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState();
  const [amount, setAmount] = useState('');
  const [conversionResult, setConversionResult] = useState();

  useEffect(() => {
    var myHeaders = new Headers();
    myHeaders.append('apikey', process.env.EXPO_PUBLIC_API_KEY);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch('https://api.apilayer.com/exchangerates_data/latest?base=EUR', requestOptions)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCurrencyRates(Object.keys(data.rates))
      })
      .catch(error => console.log('error', error));
  }, []);

  const convertToEuro = () => {
    var myHeaders = new Headers();
    myHeaders.append('apikey', process.env.EXPO_PUBLIC_API_KEY);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };

    fetch(`https://api.apilayer.com/exchangerates_data/convert?to=EUR&from=${selectedCurrency}&amount=${amount}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        setConversionResult(data.result);
        setAmount('');
      })
      .catch(error => console.log('error', error));
  }


  return (
    <View style={styles.container}>
      <Text style={{fontWeight: 'bold', fontSize: 20, padding: 10}}>To euro converter</Text>
      {conversionResult && <Text>{conversionResult} euro</Text>}
      <View style={styles.rowContainer}>
        <Picker
          selectedValue={selectedCurrency}
          style={{ height: 40, width: 150, marginBottom: 170}}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedCurrency(itemValue)
          }>
          {currencyRates.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
        <View style={{flexDirection: 'column',
          alignItems: 'center',}}>
        <TextInput
          style={{ height: 40, width: 150}}
          value={amount}
          onChangeText={text => setAmount(text)}
          placeholder='Enter amount'
          keyboardType='numeric'
        />
        <View style={{marginRight: 90}}>
        <Button 
          title='Convert' 
          onPress={convertToEuro} />
      </View>
        </View>
      </View>
      <StatusBar style='auto' />
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
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
