import { CardTuristic } from "@/components/CardTuristic";
import { InputSearch } from "@/components/InputSearch";
import { themes } from "@/constants/theme";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Turistic = {
    nome: string,
    uri: string,
    sobre: string
}
const { width } = Dimensions.get('window');
const larguraSlider = width * 1;


export default function Turistic(){
    const [ nome, setNome ] = useState("")
    const flatListRef = useRef<FlatList>(null);
    const [ index, setIndex ] = useState(0)
    const [ turistic, setTuristic ] = useState<Turistic[]>([
        {
            nome: "Serra da Leba", 
            uri: "https://tadlbisulxryzycsahmu.supabase.co/storage/v1/object/public/turistic/img11.jpg",
            sobre: "A Serra da Leba é uma das estradas mais icônicas de Angola, localizada na província do Namibe. Esta estrada sinuosa e desafiadora atravessa a Serra da Leba, oferecendo vistas panorâmicas deslumbrantes das montanhas e vales circundantes. É famosa por suas curvas fechadas e paisagens dramáticas, tornando-se um destino popular para turistas e entusiastas de condução."
        }, 
        {
            nome: "Miradouro da Lua", 
            uri: "https://tadlbisulxryzycsahmu.supabase.co/storage/v1/object/public/turistic/img1.jpg",
            sobre: "O Miradouro da Lua é um dos pontos de vista mais populares de Angola, localizado na província do Huambo. Oferece uma vista deslumbrante sobre a paisagem circundante, especialmente durante o pôr do sol."
        }, 
        {
            nome: "Miradouro da Lua", 
            uri: "https://tadlbisulxryzycsahmu.supabase.co/storage/v1/object/public/turistic/img1.jpg",
            sobre: "O Miradouro da Lua é um dos pontos de vista mais populares de Angola, localizado na província do Huambo. Oferece uma vista deslumbrante sobre a paisagem circundante, especialmente durante o pôr do sol."
        }]
    )

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
    }, 5000);

    return () => clearInterval(timer);
    }, [index]);

    function back(){
        router.back()
    }

    return(
        <SafeAreaView edges={["left", "right", "bottom"]} style={styles.container}>
            <View style={[ styles.carrossel ]}>
                <FlatList
                    ref={flatListRef}
                    data={turistic}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={
                        ({ item }) => 
                            <CardTuristic 
                                nome={item.nome} 
                                uri={item.uri} 
                                sobre={item.sobre} 
                            />
                    }
                    onMomentumScrollEnd={e =>
                        setIndex(Math.round(e.nativeEvent.contentOffset.x / larguraSlider))
                    }
                />
            </View>
            <View style={styles.areaMain}>
                <InputSearch 
                    title="Buscar sítio pelo nome"
                    nome={nome}
                    setNome={setNome}
                />
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: themes.colors.background
    },
    carrossel: {
        width: '100%',
    },
    areaMain: {
        paddingHorizontal: 20,
    }
})