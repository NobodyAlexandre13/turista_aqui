import { Select } from "@/components/Select";
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';

// link imagem do fundo: https://tadlbisulxryzycsahmu.supabase.co/storage/v1/object/public/turistic/img11.jpg

export default function HomeScreen() {
  return (
    <ImageBackground
        source={{uri : "https://tadlbisulxryzycsahmu.supabase.co/storage/v1/object/public/turistic/img1.jpg"}}
        style={styles.container}
    >
      <LinearGradient  
        colors={['#19221c49', '#0c140fb4']}
        style={styles.gradientBack}
      >
        <View style={styles.areaLogo}>
          <Image 
            source={require("@/assets/images/turistaiconeg.png")}
            style={{width: 195, height: 130}}
            contentFit="contain"
          />
          <Text style={styles.subTitle}>
            Uma jornada visual pelos melhores destinos naturais e urbanos.
          </Text>
        </View>
        <View style={styles.areaSelect}>
          <Select />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradientBack: {
    flex: 1, 
    padding: 20,
    width: '100%',
    alignItems: 'center'
  },
  title: {
    fontSize: 38,
    color: "#fff",
  },
  subTitle: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    fontWeight: '600',
    marginTop: -22
  },
  loadingImage: {
    marginBottom: 24,
  },
  areaLogo: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
    width: '90%'
  },
  areaSelect: {
    bottom: 140,
    justifyContent: 'flex-end',
    flex: 1
  }
});
