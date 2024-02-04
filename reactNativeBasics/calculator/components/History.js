import { View } from "react-native";
import { FlatList, Text, StyleSheet } from "react-native";

export default function History({route}) {
    const {history} = route.params;

  return (
    <View style={styles.container}>
        <Text style={{fontWeight: "bold", fontSize: 20, marginTop: 10}} >History</Text>
        <FlatList
        style={{marginTop: 20}}
        data={history}
        renderItem={({ item }) => <Text>{item.key}</Text>}
        keyExtractor={(item, index) => index.toString()}
        />
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
