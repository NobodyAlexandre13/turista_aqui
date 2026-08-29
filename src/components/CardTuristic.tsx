import { themes } from "@/constants/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

interface Props {
    uri: string;
    nome: string;
}

export function CardTuristic({ uri, nome }: Props){
    return(
        <View style={style.container}>
            <LinearGradient  
                colors={['transparent', '#0505052a', '#050505f3']}
                style={style.grad}
            >
                <Image 
                    style={style.imgBack} 
                    source={{ uri: uri }}
                />
                <View style={style.viewTitle}>
                    <Text style={style.title}>{ nome }</Text>
                </View>
            </LinearGradient>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: 150,
        height: 200,
        borderRadius: 12,
        marginLeft: 10
    },
    imgBack: {
        width: '100%',
        borderRadius: 12,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: -9
    },
    grad:{
        flex: 1,
        borderRadius: 12,
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
    },
    viewTitle: {
        position: 'absolute',
        bottom: 16,
        alignItems: 'flex-start'
    },
    title: {
        fontWeight: 600,
        fontSize: 14,
        color: themes.colors.surface,
    }
})