import { CardCompany } from "@/components/CardCompany";
import { CardTuristic } from "@/components/CardTuristic";
import { Category } from "@/components/Category";
import { InputSearch } from "@/components/InputSearch";
import { Loading } from "@/components/Loanding";
import { themes } from "@/constants/theme";
import { useProvince } from "@/context/provinceContext";
import { getCompany, getExplore } from "@/hooks/getDate";
import { categorias } from "@/utils/data";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Dimensions, FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Turistic = {
    nome: string,
    uri: string,
    sobre: string
}

type Company = {
    id: string;
    avatar: string;
    nome: string;
    municipio: string;
}

const { width } = Dimensions.get('window');
const larguraSlider = width * 1;


export default function Turistic(){
    const [ nome, setNome ] = useState("")
    const [ active, setActive ] = useState("Todos")
    const flatListRef = useRef<FlatList>(null);
    const [ index, setIndex ] = useState(0)
    const [ category, setCategory ] = useState("Todos")
    const [company, setCompany] = useState<Company[] | any>()
    const { province } = useProvince()
    const [ turistic, setTuristic ] = useState<Turistic[] | any>()

    async function getTuristic(){
        const tur = await getExplore(province, 3);

        setTuristic(tur)
    }

    useEffect(()=>{
        getTuristic()
    },[province])

    async function getComp(){
        let filtro = "";

        if (category === "Todos") filtro = "";
        if (category === "Onde Ficar") filtro = "Onde Ficar";
        if (category === "Onde Comer") filtro = "Onde Comer";
        if (category === "Transporte & Mobilidade") filtro = "Transporte & Mobilidade";
        if (category === "Compras e artesanato") filtro = "Compras e artesanato";
        if (category === "Serviços úteis") filtro = "Serviços úteis"

        const comp = await getCompany(province, filtro)

        setCompany(comp)
    }

    useEffect(()=>{
        getComp();
    }, [province, category])

    useEffect(() => {
        if (!turistic?.length) return;

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
        }, 8000);

        return () => clearInterval(timer);
    }, [index, turistic]);

    if(!company){
        return(
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Loading size={24}/>
                <Text>Carregando...</Text>
            </View>   
        )
    }

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
                <View>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 10}}>
                        {categorias.map((item, index) => (
                            <Category 
                                title={item.name}
                                active={active}
                                setActive={setActive}
                                icon={item.icon}
                            />
                        ))}
                    </ScrollView>
                </View>
                <FlatList
                    data={company}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => <CardCompany item={item}/>}
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
        flex: 1
    }
})