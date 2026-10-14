import { Loading } from "@/components/Loanding";
import { themes } from "@/constants/theme";
import { getCompanyDetails } from "@/hooks/getDate";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { SafeAreaView } from "react-native-safe-area-context";

type CompanyDetails = {
    avatar: string,
    nome: string,
    provincia: string,
    municipio: string,
    sobre: string,
    horario: string,
    tel: string,
    email: string
}

export default function Details(){
    const [ company, setCompany ] = useState<CompanyDetails | any>()
    const { id } = useLocalSearchParams()

    async function getCompany(){
        const data = await getCompanyDetails(id)

        setCompany(data)
    }

    async function ligar(tel: string) {
        const url = `tel:${tel}`
        await Linking.openURL(url)
    }

    function handleMark(){
        router.push({
            pathname: "./mark",
            params: { id }
        })
    }

    function back(){
        router.back();
    }

    useEffect(() => {
        getCompany();
    }, [company])


    if(!company){
        return(
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                <Loading size={24}/>
                <Text>Carregando...</Text>
            </View>   
        )
    }

    return (
        <SafeAreaView edges={["top", "left", "right", "bottom"]} style={styles.container}>
            <View style={styles.header}> 
                <TouchableOpacity onPress={back}>
                    <FontAwesomeFreeSolid name="chevron-left" size={20} color={themes.colors.text} />
                </TouchableOpacity>
                <TouchableOpacity>
                    <FontAwesomeFreeSolid name="heart-crack" size={20} color={themes.colors.text}/>
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} style={{marginTop: 10}} contentContainerStyle={{paddingBottom: 60}}>
                <View>
                    <Image 
                        style={styles.image}
                        source={{uri: company?.avatar}}
                    />
                </View>
                <View style={{marginTop: 14}}>
                    <Text style={styles.subTitle}>Bem-Vindo ao</Text>
                    <Text style={styles.name}>{company?.nome}</Text>
                </View>
                <View>
                    <Text style={styles.subTitle}>Localizado em</Text>
                    <Text style={styles.local}>{company?.provincia}, {company?.municipio}</Text>
                </View>
                <View style={{marginVertical: 14}}>
                    <Text style={styles.sobre}>
                        {company?.sobre}
                    </Text>
                </View>
                <View >
                    <Text style={styles.subTitle}>Horário de Funcionamento:</Text>
                    <Text style={styles.local}>{company?.horario}</Text>
                </View>
                <View style={{marginVertical: 14}}>
                    <Text style={styles.subTitle}>Localização</Text>
                    <MapView style={styles.map} >
                        <Marker
                            coordinate={{ latitude: -15.192110766194205, longitude: 12.154363534198376 }}
                            title="Restaurante Namibe Frente"
                            description="Localizado em Namibe, Moçamedes"
                        />
                    </MapView>
                </View>
                <View>
                    <Text style={styles.subTitle}>Contato</Text>
                    <View style={styles.areaNumber}>
                        <Text style={styles.local}>Telefone: </Text>
                        <TouchableOpacity style={styles.buttonNumber} onPress={()=> ligar(company.tel)}>
                            <FontAwesomeFreeSolid name="contact-card" color={themes.colors.surface} size={17} />
                            <Text style={styles.textBtnNumber}>{company?.tel}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.local}>Email: {company?.email}</Text>
                </View>
            </ScrollView>
            <View style={styles.areaButton}>
                <TouchableOpacity style={styles.buttonMark} onPress={handleMark} >
                    <Text style={styles.TextBtnMark}>Fazer Marcação</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        flex: 1,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginTop: 10,
    },
    image: {
        width: "100%",
        height: 230,
        borderRadius: 14,
    },
    subTitle: {
        fontSize: 14,
        color: themes.colors.textSecondary,
        fontFamily: themes.fonts.medium,
    },
    name: {
        fontSize: 20,
        fontFamily: themes.fonts.headingBold,
        color: themes.colors.text,
        marginTop: -4
    },
    local: {
        fontSize: 16,
        color: themes.colors.text,
        fontFamily: themes.fonts.medium
    },
    sobre: {
        fontSize: 12,
        fontFamily: themes.fonts.medium,
        color: themes.colors.text,
        textAlign: "justify"
    },
    map: {
        width: "100%",
        height: 200,
        borderRadius: 14,
        marginTop: 8
    },
    areaButton: {
        position: "absolute",
        bottom: 30,
        left: 0,
        right: 0,
        padding: 20,
    },
    areaNumber: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonNumber:{
        backgroundColor: themes.colors.secondary,
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        justifyContent: "center",
        alignItems: "center",
        gap: 8,
        flexDirection: 'row'
    },
    textBtnNumber: {
        fontSize: 14,
        color: themes.colors.surface,
        fontFamily: themes.fonts.medium
    },
    buttonMark: {
        backgroundColor: themes.colors.secondary,
        paddingVertical: 14,
        paddingHorizontal: 9,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center"
    },
    TextBtnMark: {
        color: themes.colors.surface,
        fontFamily: themes.fonts.medium,
        fontSize: 16,
    }
})