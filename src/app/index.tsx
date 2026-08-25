
import { StyleSheet, Text, View } from 'react-native';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text>Turista aqui</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 38,
    color: "#fff",
  },
  subTitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
  },
  loadingImage: {
    marginBottom: 24,
  },
});
