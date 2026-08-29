import { themes } from "@/constants/theme";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Alert } from "./Alert";

export function Select(){
    const [visible, setVisible] = useState(false);
    const [selectedDestino, setSelectedDestino] = useState("Selecione o destino");
    const [ error, setError ] = useState(false)
    const [ msgError, setMsgError ] = useState("")
    const [ destinos, setDestinos ] = useState(
        [
            {nome: "Luanda"}, 
            {nome: "Benguela"}, 
            {nome: "Namibe"}, 
            {nome: "Huíla"}, 
            {nome: "Huambo"}
        ]
    )

    function handleGo(){
        if(selectedDestino === "Selecione o destino"){
            setMsgError("Falta selecionar a provincia")
            setError(true)
            return;
        }

        router.push("/tusristic")
    }

    const handleSelectDestino = (nome: string) => {
        setSelectedDestino(nome);
        setVisible(false);
    };
    return(
        <View>
            <View style={styles.areaButton}>
                {error && (
                    <Alert title={msgError} onPress={()=>setError(false)}/>
                )}
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={styles.buttonSelect}
                    onPress={() => setVisible(true)}
                >
                    <Text style={styles.buttonText} numberOfLines={1}>
                        {selectedDestino}
                    </Text>
                    <FontAwesomeFreeSolid name="chevron-down" size={16}/>
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.buttonGo}
                    onPress={handleGo}
                >
                    <Text style={styles.textGo}>Viajar</Text>
                    <FontAwesomeFreeSolid name="arrow-right" size={16} color={themes.colors.surface} />
                </TouchableOpacity>
            </View>

            
            <Modal 
                animationType="fade" 
                transparent={true} 
                visible={visible}
            >
                <Pressable onPress={() => setVisible(false)} style={styles.areaModal}>
                    <View style={styles.areaModalSelect}>
                        <FlatList
                            data={Array.isArray(destinos) ? destinos : []}
                            keyExtractor={(item, index) => `${item.nome}-${index}`}
                            renderItem={({ item }) => (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    style={styles.itemDestino}
                                    onPress={() => handleSelectDestino(item.nome)}
                                >
                                    <Text style={styles.textSelect}>{item.nome}</Text>
                                </TouchableOpacity>
                            )}
                        />
                    </View>
                </Pressable>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    buttonSelect: {
        backgroundColor: "#e7e7e7",
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "95%",
        marginBottom: 10
    },
    buttonGo: {
        backgroundColor: themes.colors.secondary,
        paddingVertical: 14,
        paddingHorizontal: 16,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
        width: '95%',
        flexDirection: 'row',
        gap: 10
    },
    textGo:{
        fontSize: 16,
        color: themes.colors.surface,
        fontFamily: themes.fonts.headingBold,
        fontWeight: '700'
    },
    buttonGoDisabled: {
        opacity: 0.55,
    },
    buttonTextGo: {
        color: "#111111",
        fontSize: 14,
        fontWeight: "700",
    },
    areaButton: {
        alignItems: "center",
        marginTop: 20,
        justifyContent: "space-between",
    },
    buttonText: {
        color: "#111111",
        fontSize: 16,
        flex: 1,
        marginRight: 8,
    },
    areaModal: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.35)",
    },
    areaModalSelect: {
        backgroundColor: "#fff",
        margin: 20,
        borderRadius: 12,
        padding: 20,
        maxHeight: "60%",
    },
    itemDestino: {
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 8,
        marginBottom: 8,
        backgroundColor: "#f5f5f5",
    },
    textSelect: {
        fontSize: 16,
        fontWeight: "600",
    },
});