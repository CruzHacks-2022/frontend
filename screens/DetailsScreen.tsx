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

            const req = await fetch('http://10.0.0.222:8081/multi', {
                method: 'POST',
                body: formData
            })

            const data = await req.json()
            await setData(data)

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
                <Text>{data.BrandNames}</Text>
                <Text style={styles.details}>{data.details}</Text>
                <View style={styles.briefDetails}>
                    <Image source={require("../assets/images/samplePill.jpg")}
                        style={styles.img}
                        resizeMode="center"
                    ></Image>
                </View>

                <Text style={styles.pillDetals}>Overdose Signs:</Text>

                <HorizontalScroll data={data} effects={data.OverdoseSymptoms} numColumns={3} />

                <View style={styles.briefDetails}>
                    <View style={styles.pillDetals}>
                        <Text style={styles.sideEffects}>Side-Effects</Text>

                        <HorizontalScroll data={data} effects={data.CombinedEffects} numColumns={5} />

                        <Text>{data.OverdoseText}</Text>
                    </View>
                    <Image source={require("../assets/images/chemFormula.png")}
                        style={styles.img}
                        resizeMode="center"
                    ></Image>
                </View>

            </ScrollView>
            )
            :
            <ActivityIndicator size="large" color="#246EE9" style={{ flex: 1, alignSelf: 'center' }} />
    )
}

const styles = StyleSheet.create({
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
