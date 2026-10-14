import { themes } from "@/constants/theme";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
    id: string;
    avatar: string;
    nome: string;
    municipio: string
}

export function CardCompany({ id, avatar, nome, municipio }: Props){
    function viewsMore(id: string, nome: string) {
        router.push({
            pathname: "./company",
            params: { id, nome }
        });
    }

    function handleMark(id: string){
        router.push({
            pathname: "./mark",
            params: { id }
        })
    }

    return(
        <View style={styles.card}>
            <Image source={{uri: avatar}} style={styles.image} />
            <View style={styles.areaMain}>
                <View style={styles.areaText}>
                    <Text 
                        style={styles.name}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {nome}
                    </Text>
                    <View style={styles.areaLocal}>
                        <FontAwesomeFreeSolid name="location-dot" size={18} />
                        <Text style={styles.local}>{municipio}</Text>
                    </View>
                    <TouchableOpacity onPress={() => viewsMore(id, nome)}>
                        <Text style={styles.verMais}>Ver mais</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.areaButton}>
                    <TouchableOpacity style={styles.buttonMark} onPress={()=> handleMark(id)}>
                        <Text style={styles.TextBtnMark}>Fazer Marcação</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        width: "100%",
        borderRadius: 14,
        marginTop: 10,
        backgroundColor: themes.colors.surface,
    },
    areaMain: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 14,
        paddingHorizontal: 16
    },
    image: {
        width: '100%',
        height: 220,
        borderRadius: 12,
    },
    areaText: {
        width: '58%',
    },
    areaButton: {
        width: '38%',
    },
    name: {
        fontSize: 16,
        fontFamily: themes.fonts.headingBold,
        color: themes.colors.text,
    },
    areaLocal: {
        flexDirection: "row",
        gap: 4,
        alignItems: "center"
    },
    local: {
        fontSize: 15,
        fontFamily: themes.fonts.medium
    },
    verMais: {
        fontFamily: themes.fonts.semiBold,
        fontSize: 12,
        color: themes.colors.textSecondary
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
        fontSize: 13,
    }
})