import { supabase } from "@/utils/supabase";

export async function getProvince() {
    const { data, error } = await supabase
        .from("province")
        .select("nome");

    if (error) {
        console.log("Erro ao pegar a província:", error);
        return [];
    }

    return Array.isArray(data) ? data : [];
}

export async function getExplore(province: string, limit: number){
    const { data, error } = await supabase
    .from("turistic")
    .select("id, img, nome, sobre, povincia, link_map")
    .eq("povincia", province)
    .limit(limit)

    if(error){
        console.log("Erro ao pegar atrações: ", error)
        return;
    }

    return data
}

export async function getCompany(prov: string, filtro: string) {
    let query = supabase
    .from("company")
    .select("*")
    .eq("provincia", prov)

    if(filtro === "Onde Ficar"){
        query = query.eq("categoria", "Onde Ficar")
    }

    if(filtro === "Onde Comer"){
        query = query.eq("categoria", "Onde Come")
    }
    if(filtro === "Transporte & Mobilidade"){
        query = query.eq("categoria", "Transporte & Mobilidade")
    }
    if(filtro === "Compras e artesanato"){
        query = query.eq("categoria", "Compras e artesanato")
    }
    if(filtro === "Serviços úteis"){
        query = query.eq("categoria", "Serviços úteis")
    }


    const { data, error } = await query

    if(error){
        console.log("Erro ao pegar os dados: ", error)
        return;
    }


    return data
}

export async function getCompanyDetails(id: string | string[]) {
    const { data, error } = await supabase
    .from("company")
    .select("*")
    .eq("id", id)

    if(error){
        console.log("Erro ao pegar company: ", error)
        return
    }

    return data[0]
}

export async function getSerachCompany(nome: string, province: string) {
    const { data, error } = await supabase
    .from("company")
    .select("id, nome, municipio")
    .eq("provincia", province)
    .eq("tipo", nome)

    if(error){
        console.log("Erro ao pegar company: ", error)
        return
    }

    return data
}