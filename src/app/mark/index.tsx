import { Loading } from '@/components/Loanding';
import { themes } from '@/constants/theme';
import { createMark } from '@/hooks/createMark';
import { FontAwesomeFreeSolid } from '@react-native-vector-icons/fontawesome-free-solid';
import { router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Alert, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { createAnimatedComponent, FadeInDown } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';


const IconAnimado = createAnimatedComponent(FontAwesomeFreeSolid)
const ButtonAnimado = createAnimatedComponent(TouchableOpacity)

export default function Mark(){
    const { id } = useLocalSearchParams()
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [people, setPeople] = useState('1');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ visible, setVisible ] = useState(false)

    function gerarCodigo() {
        const codigo = Math.random().toString(36).substring(2, 8).toUpperCase();
        return `${codigo}`;
    }

    function back(){
        router.back();
    }

    async function handleSubmit(){
        if(!name.trim() || !phone.trim() || !date.trim()){
            Alert.alert('Campos obrigatórios', 'Por favor preencha o nome, telefone e data.');
            return;
        }

        setIsLoading(true)

        const mark = await createMark( name, phone, gerarCodigo(), email, "Pendente", id, people, date, time );

        if(mark.sucess === false){
            console.log(mark.erro)
            return
        }

        setIsLoading(!mark.sucess)
        setVisible(true)
    }

   const formatPhone = (text: string): string => {
        const cleaned = text.replace(/\D/g, '');

        if (cleaned.length <= 3) {
            return `+${cleaned}`;
        }

        if (cleaned.length <= 6) {
            return `+${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
        }

        if (cleaned.length <= 9) {
            return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
        }

        return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 12)}`;
    };

    const formatDate = (text: string): string => {
        const cleaned = text.replace(/\D/g, '').slice(0, 8);
        const currentYear = new Date().getFullYear();

        let day = cleaned.slice(0, 2);
        let month = cleaned.slice(2, 4);
        let year = cleaned.slice(4, 8);

        if (month.length === 2) {
            let m = Number(month);
            if (m < 1) m = 1;
            if (m > 12) m = 12;
            month = String(m).padStart(2, '0');
        }

        if (year.length === 4) {
            year = String(currentYear);
        }

        return [day, month, year]
            .filter(Boolean)
            .join('/')
            .slice(0, 10);
    };

    const formatTime = (text: string): string => {
        const cleaned = text.replace(/\D/g, '');
        if (cleaned.length <= 2) return cleaned;
        return `${cleaned.slice(0, 2)}:${cleaned.slice(2, 4)}`;
    };

    return (
        <SafeAreaView edges={["top","left","right","bottom"]} style={styles.container}>
            <StatusBar style="dark" />
            <View style={styles.header}>
                <TouchableOpacity onPress={back}>
                    <FontAwesomeFreeSolid name="chevron-left" size={28} color={themes.colors.text} />
                </TouchableOpacity>
                <Text style={styles.title}>Nova Marcação</Text>
            </View>
            <ScrollView contentContainerStyle={{paddingBottom: 40}}>
                <Text style={styles.label}>Nome completo</Text>
                <TextInput style={styles.input} placeholder="Ex: João Silva" value={name} onChangeText={setName} />

                <Text style={styles.label}>Telefone</Text>
                <TextInput style={styles.input} placeholder="+244 9xx xxx xxx" keyboardType="phone-pad" value={phone} onChangeText={(text) => setPhone(formatPhone(text))} maxLength={17} />

                <Text style={styles.label}>Email (opcional)</Text>
                <TextInput style={styles.input} placeholder="seu@exemplo.com" keyboardType="email-address" value={email} onChangeText={setEmail} />

                <View style={styles.row}>
                    <View style={{flex: 1, marginRight: 8}}>
                        <Text style={styles.label}>Data</Text>
                        <TextInput style={styles.input} placeholder="DD/MM/AAAA" value={date} onChangeText={(text) => setDate(formatDate(text))} maxLength={10} />
                    </View>

                    <View style={{width: 110}}>
                        <Text style={styles.label}>Hora</Text>
                        <TextInput style={styles.input} placeholder="HH:MM" value={time} onChangeText={(text) => setTime(formatTime(text))} maxLength={5} />
                    </View>
                </View>

                <Text style={styles.label}>Pessoas</Text>
                <TextInput style={styles.input} placeholder="Número de pessoas" keyboardType="number-pad" value={people} onChangeText={setPeople} />

                <TouchableOpacity style={styles.button} activeOpacity={0.8} onPress={handleSubmit}>
                    {isLoading ? <Loading color={themes.colors.surface}  size={18} /> :
                        <Text style={styles.buttonText}>Confirmar marcação</Text>
                    }
                </TouchableOpacity>
            </ScrollView>

            <Modal 
                transparent
                visible={visible}
                animationType="fade"
            >
                <View style={styles.AreaMap}> 
                    <Animated.View entering={FadeInDown.duration(300)} style={styles.MapaStyle}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <IconAnimado entering={FadeInDown.delay(500)} name='check-double' color={themes.colors.secondary} size={89} />
                            <Animated.Text entering={FadeInDown.delay(500)} style={styles.textAlert}>
                                Receberá uma mensagem de confirmação com o código da reserva, que deverá apresentar no estabelecimento no dia agendado.
                            </Animated.Text>
                        </View>
                        <ButtonAnimado entering={FadeInDown.delay(700)} onPress={()=> setVisible(false)} style={styles.buttonCall}>
                            <Text style={styles.TextBtnCall}>Vou esperar</Text>
                        </ButtonAnimado>
                    </Animated.View>
                </View>
            </Modal>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: themes.colors.background,
    },
    header: {
        flexDirection: "row",
        gap: "10%",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 10
    },
    title: {
        fontSize: 20,
        fontFamily: themes.fonts.headingBold,
        color: themes.colors.text,
    },
    label: {
        fontSize: 14,
        color: themes.colors.textSecondary,
        marginBottom: 6,
    },
    input: {
        backgroundColor: themes.colors.surface,
        padding: 12,
        borderRadius: 8,
        marginBottom: 12,
        color: themes.colors.text,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    button: {
        backgroundColor: themes.colors.secondary,
        paddingVertical: 14,
        borderRadius: 10,
        marginTop: 6,
        alignItems: 'center',
    },
    buttonText: {
        color: themes.colors.surface,
        fontSize: 16,
        fontWeight: '700',
    },
     AreaMap: {
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    MapaStyle: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: themes.colors.surface,
        paddingHorizontal: 18,
        paddingVertical: 14
    },
    textAlert: {
        fontFamily: themes.fonts.semiBold,
        fontSize: 16,
        textAlign: 'center',
        color: themes.colors.text,
        marginBottom: 10
    },
    buttonCall: {
        backgroundColor: themes.colors.secondary,
        paddingVertical: 14,
        paddingHorizontal: 9,
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8
    },
    TextBtnCall: {
        color: themes.colors.surface,
        fontFamily: themes.fonts.medium,
        fontSize: 16,
    }
});