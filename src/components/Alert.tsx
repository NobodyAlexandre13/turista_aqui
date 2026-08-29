import { themes } from "@/constants/theme";
import { Pressable, StyleSheet, Text } from "react-native";

interface Props {
    title: string;
    onPress: () => void
}

export function Alert({title, onPress} : Props){
    return(
        <Pressable onPress={onPress} style={style.container}>
            <Text style={style.text}>{title}</Text>
        </Pressable>
    )
}

const style = StyleSheet.create({
    container: {
        backgroundColor: themes.colors.error,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
        marginBottom: 10
    },
    text: {
        color: themes.colors.surface,
        fontSize: 16,
        fontWeight: 600,
        flex: 1,
        marginRight: 8,
    }
})