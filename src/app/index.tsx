import { Select } from "@/components/Select";
import { Image } from "expo-image";
import { LinearGradient } from 'expo-linear-gradient';
import { ImageBackground, Text, View } from 'react-native';
import { styles } from "../../styles/styles.inital";

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


