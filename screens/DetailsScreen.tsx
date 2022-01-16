import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import HorizontalScroll from "../components/HorizontalScroll";
import {Linking} from 'react-native'

const DetailsScreen = ({ route }: any) => {
    const [ifLoad, setIfLoad] = useState(true)
    const [data, setData] = useState([] as any)
    // const { name } = route.params

    useEffect(() => {
        (async () => {
            var formData = new FormData();

            // formData.append("brand", name);

            const req = await fetch('https://webscraper-service-gkv32wdswa-ue.a.run.app/multi', {
                method: 'POST',
                body: formData
            })

            const data = await req.json()
            await setData(data.success)

            setIfLoad(false)

        })();
    }, []);

    const keyExtractor = useCallback(
        (item, index) => index.toString(),
        [data]
    )
    
    return (
        !ifLoad ?
        
            (<ScrollView style={styles.container}>
                <View style={[styles.container, {
                    // Try setting `flexDirection` to `"row"`.
                    flexDirection: "row"
                    }]}>
                        <View style={[styles.container, {
                    // Try setting `flexDirection` to `"row"`.
                    flexDirection: "column"
                    }]}>
                        <Text allowFontScaling adjustsFontSizeToFit style={styles.drugName}>{data.Name}</Text>
                        <Text style={styles.pronunceName}>{data.Pronunciation}</Text>
                    </View>
                    
                    <View style={styles.imgContainer}>
                        <Image source={require("../assets/images/health.png")} style={styles.image} /> 
                    </View>
                </View>
                

                {/* <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Image source={require("../assets/images/pillLogo.svg")} style={styles.infoBoxStyle} />
                        <Text style={styles.info}>2 x pills</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Image source={require("../assets/images/timeLogo.svg")} style={styles.inOverdoseSymptoms
                    </View>

                {/* <Text style={styles.drugName}>About Drug</Text> */}
                
                <View style={styles.briefDetails}>
                    <View style={styles.pillDetals}>
                    <Text style={styles.details}>{data.details}</Text>
                        <Text style={styles.title}>What does it treat?   🧑‍⚕️👩‍⚕️</Text>
                        <Text style={styles.text}>{data.Why}</Text>

                        <Text style={styles.title}>How is it administered   😷</Text>
                        <Text style={styles.text}>{data.How}</Text>

                        <Text style={styles.title}>Diet   🍎 </Text>
                        <Text style={styles.text}>{data.Diet}</Text>

                        <Text style={styles.title}>Storage   📦 </Text>
                        <Text style={styles.text}>{data.Store}</Text>
                        

                        <Text style={styles.title}>Warning signs   ⚠️ </Text>
                        <Text style={styles.phone} onPress={()=>{Linking.openURL('tel:911');}}>Emergency Phone Line: 911</Text>
                        
                        <Text style={styles.text}> 🟥 Likely Overdosed, call poison control  if possible and go to the hospital immediately </Text>
                        <Text style={styles.text}> 🟧 Severe symptoms, Contact a doctor or go to the hospital</Text>
                        <Text style={styles.text}> 🟩 Usual symptoms, if worsen contact a doctor or go to the hospital</Text>

                        <Text style={styles.phone} onPress={()=>{Linking.openURL('tel:+1 (800) 222-1222');}}>Poison Control Phone Number: +1 (800) 222-1222</Text>

                            <Text style={styles.sideEffects}>Side-Effects</Text>

                        
                        
                        <HorizontalScroll data={data} effects={data.CombinedEffects} numColumns={5} />

                            <Text style={styles.sideEffects}>Overdose Signs:</Text>

                            <HorizontalScroll data={data} effects={data.OverdoseSymptoms} numColumns={3} />

                            {/* <Text style={{marginTop: 20}}>{data.BrandNames}</Text> */}

                        </View>
                    </View>
            </ScrollView>
            ):
            <ActivityIndicator size="large" color="#246EE9" style={{ flex: 1, alignSelf: 'center' }} />
    )
}

const styles = StyleSheet.create({
    imgContainer: {
        marginTop: 20,
        marginLeft: 30,
    },
    image: {
        height: 150,
        marginLeft: -50,
        width: 150,
        marginTop: 0
    },
    drugName: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 40,
        marginLeft: 20,
        width: 250
    },
    pronunceName: {
        fontSize: 12,
        fontWeight: "bold",
        marginTop: 10,
        marginLeft: 40,
        width: 160
    },
    infoContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
    },
    infoBox: {
        backgroundColor: "#9966ff",
        width: 180,
        height: 80,
        borderRadius: 20,
        display: "flex",
        justifyContent: "space-between",
        margin: 5,
        flexDirection: "row",
        padding: 15,
    },
    infoBoxStyle: {
        width: 50,
        height: 50,
    },
    title: {
        fontSize: 25, 
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginBottom: 0, 
    },
    text: {
        padding: 10,
        fontSize: 18,
    },
    info: {
        fontSize: 20,
    },
    container: {
        marginTop: 0,
        height: 200
    },
    details: {
        fontSize: 20,
        fontWeight: "bold",
        display: "flex",
        justifyContent: "center",
    },
    briefDetails: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        paddingLeft: 7,
        paddingRight: 7,
        marginTop: -20,
    },
    phone: {
        padding: 10,
        fontSize: 18,
        color: "#0645AD"
    },
    img: {
        width: 100,
        height: 100,
    },
    pillDetals: {
        fontSize: 30,
        paddingLeft: 10,
        textAlign: "left",

    },
    sideEffects: {
        fontSize: 35,
    },
    chipsItem: {
        borderRadius: 20,
        margin: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
        color: 'white'
    },
});

export default DetailsScreen
