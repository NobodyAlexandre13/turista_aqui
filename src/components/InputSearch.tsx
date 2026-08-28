import { themes } from "@/constants/theme";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { useState } from "react";
import { Alert, FlatList, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Loading } from "./Loanding";

interface Props{
    title: string;
    nome: string;
    setNome: () => void;

}

type Search = {
  id: string;
  nome: string;
  municipio: string;
}

export function InputSearch({ title, nome, setNome, ...rest }: Props){
    const [ visible, setVisible ] = useState(false);
    const [ busca, setBusca ] = useState<any[]>([
        {
            id : 1,
            nome: "Restaurante 12",
            municipio: "12345"
        }, 
        {
            id : 2,
            nome: "Restaurante 13",
            municipio: "123456"
        }, 
        {
            id : 3,
            nome: "Restaurante 14",
            municipio: "1234567"
        }
    ])

    function viewsMore(id: string) {
        setVisible(false)
    }

    async function Search(){
        if(!nome.trim()){
            Alert.alert("Campo vazio","Por favor, digite o tipo, ex. Restaurante, Alojamento ou outro")
            return;
        }
        setVisible(true)
    }

    return(
        <View style={styles.container}>
          <TextInput
            style={styles.inputText}
            placeholder={title}
            placeholderTextColor={themes.colors.textSecondary}
            value={nome}
            onChangeText={setNome}
            {...rest}
          />
          <TouchableOpacity onPress={Search} style={styles.botton}>
              <FontAwesomeFreeSolid name="filter" size={18} color={themes.colors.surface} />
          </TouchableOpacity>

          <Modal visible={visible} animationType="fade" transparent>
            <Pressable style={styles.AreaMap} onPress={()=> setVisible(false)}>
              <View style={styles.MapaStyle}>
                {!busca ? (
                  <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Loading size={24}/>
                    <Text>Buscando...</Text>
                  </View> 
                ): (
                  <FlatList 
                    data={busca}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    renderItem={({item}) => (
                      <TouchableOpacity style={styles.ButtonCompany} onPress={() => viewsMore(item.id)}>
                        <View>
                          <Text style={styles.name}>
                            {item.nome}
                          </Text>
                          <View style={styles.areaLocal}>
                            <FontAwesomeFreeSolid name="location" size={18} />
                            <Text style={styles.local}>{item.municipio}</Text>
                          </View>
                        </View>
                        <FontAwesomeFreeSolid name="chevron-right" size={20} />
                      </TouchableOpacity>
                    )}
                    ListEmptyComponent={
                      <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Text>Nada encontrado</Text>
                      </View> 
                    }
                  />
                )}
              </View>
            </Pressable>
          </Modal>
      </View>
    )
} 

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 20,
    marginTop: 10,
  },  
  inputText: {
    backgroundColor: themes.colors.surface,
    width: "79%",
    borderRadius: 10,
    padding: 16,
    color: themes.colors.text
  },
  botton: {
    backgroundColor: themes.colors.secondary,
    padding: 14,
    borderRadius: 10,
    width: "19%",
    justifyContent: "center",
    alignItems: "center"
  },
  AreaMap: {
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  MapaStyle: {
    flex: 1,
    width: '100%',
    height: 380,
    maxHeight: 380,
    borderRadius: 10,
    backgroundColor: themes.colors.surface,
    paddingHorizontal: 18,
    paddingVertical: 14
  },
  ButtonCompany: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    backgroundColor: themes.colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10
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
    fontFamily: themes.fonts.medium,
    color: themes.colors.text
  },
});