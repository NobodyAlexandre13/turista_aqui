import { ProvinceProvider } from "@/context/provinceContext";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import { useFonts } from 'expo-font';
import { Slot } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabLayout() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,

    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
  });

  if(!fontsLoaded) {
    return null;
  }

  return (
    <ProvinceProvider>
      <SafeAreaProvider>
        <Slot />
      </SafeAreaProvider>
    </ProvinceProvider>
  );
}
