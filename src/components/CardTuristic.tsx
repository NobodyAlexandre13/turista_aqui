import { themes } from "@/constants/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface Props {
    uri: string;
    nome: string;
}

const { width } = Dimensions.get('window');
const larguraSlider = width * 0.9;

export function CardTuristic({ uri, nome }: Props){

    return(
        <View style={[style.container, { width: larguraSlider }]}>
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
        height: 200,
        borderRadius: 12,
        marginHorizontal: 6,
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