import { supabase } from "@/utils/supabase";

export async function createMark(
    nome: string, tel: string, 
    codigo: string, email: string, 
    status: string, id_company: string | string[],
    pessoas: string, data: string, hora: string
){
    const { error } = await supabase
    .from("mark")
    .insert({
        nome,
        tel,
        codigo,
        email,
        status,
        id_company,
        pessoas,
        data,
        hora
    })

    if(error){
        console.log(error)
        return{
            sucess: false,
            erro: error.message
        }
    }

    return { sucess: true }
}