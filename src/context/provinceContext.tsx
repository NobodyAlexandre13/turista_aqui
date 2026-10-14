import { createContext, ReactNode, useContext, useState } from "react";

type ProvinceContextType = {
    province: string;
    setProvince: (value: string) => void;
}

type ProvinceProviderProps = {
    children: ReactNode;
}

export const ProvinceContext = createContext<ProvinceContextType>({
    province: "",
    setProvince: () => {}
})

export function ProvinceProvider({ children }: ProvinceProviderProps) {
    const [province, setProvince] = useState("");

    return (
        <ProvinceContext.Provider value={{province, setProvince}}>
            {children}
        </ProvinceContext.Provider>
    )
}

export function useProvince(){
    return useContext(ProvinceContext)
}