import React, { useCallback } from "react"
import { StyleSheet, Text, View, Image, ScrollView, FlatList } from 'react-native';
import dummyData from '../constants/dummyData.json'

const DetailsScreen = ({ route }: any) => {
    let data = [] as any
    const { name } = route.params
    for (let i = 0; i < dummyData.length; i++) {
        if (dummyData[i].Name === name) {
            data = dummyData[i]
        }
    }

    const keyExtractor = useCallback(
        (item, index) => index.toString(),
        [data]
    )

    return (
        <ScrollView style={styles.container}>
            <Text>{data.Brand}</Text>
            <Text style={styles.details}>{data.details}</Text>
            <View style={styles.briefDetails}>
                <Image source={require("../assets/images/samplePill.jpg")}
                    style={styles.img}
                    resizeMode="center"
                ></Image>
            </View>

            <Text style={styles.pillDetals}>Overdose Signs:</Text>
            {data.Overdose.map((e: any) => {
                return (
                    <Text>{e}</Text>
                )
            })}

            <View style={styles.briefDetails}>
                <View style={styles.pillDetals}>
                    <Text style={styles.sideEffects}>Sideeffects</Text>

                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <FlatList
                            data={data.symptoms}
                            numColumns={3}
                            scrollEnabled={true}
                            keyExtractor={keyExtractor}
                            renderItem={({ item, index }: any) => {
                                return (
                                    <Text key={index} style={styles.chipsItem}><Text>{item}</Text></Text>
                                )
                            }}
                        />
                    </ScrollView>

                    <Text>{data.OverdoseText}</Text>
                </View>
                <Image source={require("../assets/images/chemFormula.png")}
                    style={styles.img}
                    resizeMode="center"
                ></Image>
            </View>

        </ScrollView>
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
        backgroundColor: '#fff',
        borderRadius: 20,
        margin: 10,
        paddingHorizontal: 20,
        paddingVertical: 10,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
});

export default DetailsScreen
