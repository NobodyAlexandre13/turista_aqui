import { CardTuristic } from "@/components/CardTuristic";
import { InputSearch } from "@/components/InputSearch";
import { themes } from "@/constants/theme";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

type Turistic = {
    nome: string,
    uri: string
}
const { width } = Dimensions.get('window');
const larguraSlider = width * 1;

export default function Turistic(){
    const flatListRef = useRef<FlatList>(null);
    const [ index, setIndex ] = useState(0)
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

    const [ nome, setNome ] = useState("")
    const { width } = useWindowDimensions()


    useEffect(() => {
    const timer = setInterval(() => {
        const nextIndex = (index + 1) % turistic.length;

        if (nextIndex === 0) {
        flatListRef.current?.scrollToOffset({
            offset: 0,
            animated: true,
        });
        } else {
        flatListRef.current?.scrollToIndex({
            index: nextIndex,
            animated: true,
        });
        }

        setIndex(nextIndex);
    }, 3000);

    return () => clearInterval(timer);
    }, [index]);

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
                <View style={{ flex: 1, justifyContent: "center", width: width }}>
                    <FlatList
                        ref={flatListRef}
                        data={turistic}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item })=> <CardTuristic nome={item.nome} uri={item.uri} />}
                        onMomentumScrollEnd={e =>
                            setIndex(Math.round(e.nativeEvent.contentOffset.x / larguraSlider))
                        }
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