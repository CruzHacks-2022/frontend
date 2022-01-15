import React from "react"
import { StyleSheet, Text, View, Image } from 'react-native';

const DetailsScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.details}>Details</Text>
            <View style={styles.briefDetails}>
                <Image source={require("../assets/images/samplePill.jpg")}
                    style={styles.img}
                    resizeMode="center"
                ></Image>
                <View style={styles.pillDetals}>
                    <Text style={styles.pillDetals}>Details: Details</Text>
                    <Text style={styles.pillDetals}>Details: Details</Text>
                    <Text style={styles.pillDetals}>Details: Details</Text>
                </View>
            </View>

            <Text style={styles.pillDetals}>Overdose Signs: signs, signs, signs</Text>

            <View style={styles.briefDetails}>
                <View style={styles.pillDetals}>
                    <Text style={styles.sideEffects}>Sideeffects</Text>
                    <Text style={styles.pillDetals}>Details: Details</Text>
                    <Text style={styles.pillDetals}>Details: Details</Text>
                </View>
                <Image source={require("../assets/images/chemFormula.png")}
                    style={styles.img}
                    resizeMode="center"
                ></Image>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 5,
    },
    details: {
        fontSize: 40,
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
