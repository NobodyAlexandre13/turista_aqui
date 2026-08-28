import { themes } from "@/constants/theme";
import { ActivityIndicator } from "react-native";

interface Props {
    size: number | "small" | "large"
    color?: string
}

export function Loading ({color, size }: Props){
    return(
        <ActivityIndicator 
            color={!color ? themes.colors.secondary : color}
            size={size}
        />
    )
}