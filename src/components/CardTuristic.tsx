import { themes } from "@/constants/theme";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions, StyleSheet, Text, View } from "react-native";

interface Props {
    uri: string;
    nome: string;
    sobre: string
}

const { width } = Dimensions.get('window');
const larguraSlider = width;

export function CardTuristic({ uri, nome, sobre }: Props){

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
                <View style={style.viewSobre}>
                    <Text numberOfLines={3} style={style.sobre}>{ sobre }</Text>
                </View>
            </LinearGradient>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        height: 270,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12
    },
    imgBack: {
        width: '100%',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: 0,
        zIndex: -9
    },
    grad:{
        flex: 1,
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
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
        bottom: 60,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 6
    },
    title: {
        fontWeight: 600,
        fontSize: 16,
        color: themes.colors.surface,
    },
    viewSobre: {
        position: 'absolute',
        bottom: 16,
        paddingHorizontal: 20,
        width: '100%',

    },
    sobre: {
        fontSize: 12,
        color: themes.colors.surface,
        textAlign: 'left'
    }
})