import { InputSearch } from "@/components/InputSearch";
import { themes } from "@/constants/theme";
import { router } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Turistic(){
    const [ nome, setNome ] = useState("")
    function back(){
        router.back()
    }
    return(
        <SafeAreaView edges={["top", "left", "right", "bottom"]} style={styles.container}>
            <InputSearch 
                title="Buscar sítio pelo nome"
                nome={nome}
                setNome={setNome}
            />
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