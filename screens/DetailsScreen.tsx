import React, { useCallback, useEffect, useState } from "react"
import { StyleSheet, Text, View, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import HorizontalScroll from "../components/HorizontalScroll";

const DetailsScreen = ({ route }: any) => {
    const [ifLoad, setIfLoad] = useState(true)
    const [data, setData] = useState([] as any)
    const { name } = route.params

    useEffect(() => {
        (async () => {
            var formData = new FormData();

            formData.append("brand", name);

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

                <View style={styles.imgContainer}>
                    <Image source={require("../assets/images/samplePill.jpg")} style={styles.image} />
                </View>

                <Text style={styles.drugName}>Name of Drug</Text>

                <View style={styles.infoContainer}>
                    <View style={styles.infoBox}>
                        <Image source={require("../assets/images/pillLogo.svg")} style={styles.infoBoxStyle} />
                        <Text style={styles.info}>2 x pills</Text>
                    </View>

                    <View style={styles.infoBox}>
                        <Image source={require("../assets/images/timeLogo.svg")} style={styles.infoBoxStyle} />
                        <Text style={styles.info}>2.5 mg</Text>
                    </View>
                </View>

                <Text style={styles.drugName}>About Drug</Text>

                <Text style={styles.details}>{data.details}</Text>

                <View style={styles.briefDetails}>
                    <View style={styles.pillDetals}>
                        <Text style={{ marginBottom: 20 }}>{data.Diet}</Text>

                        <Text style={{ marginBottom: 20 }}>{data.Overdose}</Text>

                        <Text style={{ marginBottom: 20 }}>{data.Store}</Text>


                        <Text style={styles.sideEffects}>Side-Effects</Text>

                        <HorizontalScroll data={data} effects={data.CombinedEffects} numColumns={5} />

                        <Text style={styles.sideEffects}>Overdose Signs:</Text>

                        <HorizontalScroll data={data} effects={data.OverdoseSymptoms} numColumns={3} />

                        <Text style={{ marginTop: 20 }}>{data.BrandNames}</Text>

                    </View>
                </View>

            </ScrollView>
            )
            :
            <ActivityIndicator size="large" color="#246EE9" style={{ flex: 1, alignSelf: 'center' }} />
    )
}

const styles = StyleSheet.create({
    imgContainer: {
        marginTop: 20,
        marginLeft: 30,
    },
    image: {
        width: 100,
        height: 100,
    },
    drugName: {
        fontSize: 30,
        fontWeight: "bold",
        marginTop: 30,
        marginLeft: 20,
        marginBottom: 20,
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
    info: {
        fontSize: 20,
    },
    container: {
        marginTop: 5,
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
        margin: 15,
    },
    img: {
        width: 100,
        height: 100,
    },
    pillDetals: {
        fontSize: 30,
        paddingLeft: 10,
        textAlign: "left",
        paddingTop: 5,
        paddingBottom: 5,
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
