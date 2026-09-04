import { themes } from "@/constants/theme";
import { FontAwesomeFreeSolid } from "@react-native-vector-icons/fontawesome-free-solid";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props{
  title: string,
  active: string;
  icon: "hotel" | "bus" | "hospital" | "utensils" | "map-marker-alt";
  setActive: (title: string) => void;
}

export function Category({title, active, icon, setActive}: Props){
    const color = active === title ? themes.colors.surface : themes.colors.secondary

    return(
        <View style={styles.card}>
            <TouchableOpacity 
                style={[styles.infoSection, active === title && styles.infoSectionActive]}
                onPress={() => {
                    setActive(title)
                }}
            >
                <FontAwesomeFreeSolid name={icon} size={18} color={color} />
                <Text style={[styles.name, active === title && styles.nameActive]}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
  card: {
    marginRight: 6,
  },
  infoSection: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderColor: themes.colors.secondary,
    borderWidth: 1,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 6
  },

  name: {
    color: themes.colors.secondary,
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 4,
  },

  infoSectionActive: {
    backgroundColor: themes.colors.secondary,
    borderColor: themes.colors.secondary,
  },
  nameActive: {
    color: themes.colors.surface
  },
});