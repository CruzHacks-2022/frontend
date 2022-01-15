import React from "react"
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import dummyData from '../constants/dummyData.json'

const DetailsScreen = ({route}:any) => {
    let data = [] as any
    const { name } = route.params
    for (let i = 0; i < dummyData.length; i++) {
        if (dummyData[i].Name === name) {
            data = dummyData[i]
        }
    }
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
            {data.Overdose.map((e:any)=>{
                return (
                    <Text>{e}</Text>
                )
            })}

            <View style={styles.briefDetails}>
                <View style={styles.pillDetals}>
                    <Text style={styles.sideEffects}>Sideeffects</Text>
                    {data.symptoms.map((e:any)=>{
                        return (
                            <Text>{e}</Text>
                        )
                    })}
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
    }
});

export default DetailsScreen
