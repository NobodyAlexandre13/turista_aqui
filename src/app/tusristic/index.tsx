import { CardTuristic } from "@/components/CardTuristic";
import { InputSearch } from "@/components/InputSearch";
import { themes } from "@/constants/theme";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Carousel } from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";

type Turistic = {
    nome: string,
    uri: string
}

export default function Turistic(){
    const [ nome, setNome ] = useState("")
    const { width } = useWindowDimensions()
    const [ turistic, setTuristic ] = useState<Turistic[]>([
        {
            nome: "Serra da Leba", 
            uri: "https://tadlbisulxryzycsahmu.supabase.co/storage/v1/object/public/turistic/img11.jpg"
        }, 
        {
            nome: "Miradouro da Lua", 
            uri: "https://tadlbisulxryzycsahmu.supabase.co/storage/v1/object/public/turistic/img1.jpg"
        }, 
        {
            nome: "Miradouro da Lua", 
            uri: "https://tadlbisulxryzycsahmu.supabase.co/storage/v1/object/public/turistic/img1.jpg"
        }]
    )
    function back(){
        router.back()
    }
    return(
        <SafeAreaView edges={["top", "left", "right", "bottom"]} style={styles.container}>
            <InputSearch 
                title="Buscar sítio pelo nome"
                nome={nome}
                setNome={() => setNome()}
            />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <View style={{ flex: 1, justifyContent: "center" }}>
                    <Carousel 
                        data={turistic}
                        renderItem={({item}) => (
                            <CardTuristic 
                                nome={ item.nome }
                                uri={ item.uri }
                            />
                        )}
                    />
                </View>
            </GestureHandlerRootView>
            <View>
                <Text>Testado</Text>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
        backgroundColor: themes.colors.background
    }
})