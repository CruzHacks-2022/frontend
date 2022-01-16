import { Ionicons } from "@expo/vector-icons"
import { osName } from "expo-device"
import React, { useContext, useEffect, useState } from "react"
import { StatusBar, TouchableOpacity, View, StyleSheet, TextInput, Text, Image, KeyboardAvoidingView, Platform } from "react-native"
import ImageContext from "../hooks/imageContext"
// @ts-ignore
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { ScrollView } from "react-native-gesture-handler"
import dummyData from '../constants/dummyData.json'

let flipPosition: any = osName === "Android" ? StatusBar.currentHeight as number : 30

const FeedbackScreen = ({ navigation }: any) => {
    const goBack = () => {
        navigation.navigate('Home')
    }

    const [submitted, setSubmitted] = useState(false)
    const [isLoading, setIsLoading] = useContext(ImageContext).isLoading

    const [colorVal, setColorVal] = useState(0)
    const [shapeVal, setShapeVal] = useState(0)
    const [imprint, setImprint] = useState('')

    const colorRadioProps = [
        { label: "Red", value: 0 },
        { label: "White", value: 1 },
        { label: "Black", value: 2 },
        { label: "Brown", value: 3 },
        { label: "Clear", value: 4 },
        { label: "Gold", value: 5 },
        { label: "Gray", value: 6 },
        { label: "Green", value: 7 },
        { label: "Maroon", value: 8 },
        { label: "Orange", value: 9 },
        { label: "Peach", value: 10 },
        { label: "Pink", value: 11 },
        { label: "Purple", value: 12 },
        { label: "Red", value: 13 },
        { label: "Tan", value: 14 },
        { label: "White", value: 15 },
    ]

    const shapeRadioProps = [
        { label: "Round", value: 0 },
        { label: "Capsule", value: 1 },
        { label: "Oval", value: 2 },
        { label: "Egg", value: 3 },
        { label: "Barrel", value: 4 },
        { label: "Rectangle", value: 5 },
        { label: "3 Sided", value: 6 },
        { label: "4 Sided", value: 7 },
        { label: "5 Sided", value: 8 },
        { label: "6 Sided", value: 9 },
        { label: "7 Sided", value: 10 },
        { label: "8 Sided", value: 11 },
        { label: "U Shaped", value: 12 },
        { label: "Figure 8", value: 13 },
        { label: "Heart", value: 14 },
        { label: "Kidney", value: 15 },
        { label: "Gear", value: 16 },
        { label: "Character", value: 17 },
    ]

    const handleSubmit = async () => {

        let formData = new FormData()

        formData.append("color", colorRadioProps[colorVal].label.toLowerCase())
        formData.append("shape", shapeRadioProps[shapeVal].label.toLowerCase())
        formData.append("imprint", imprint)

        const res = await fetch('https://webscraper-service-gkv32wdswa-ue.a.run.app/pill', {
            method: 'POST',
            body: formData
        })

        const d = await res.json()

        if ("failure" in d) {
            navigation.navigate("Home")
        }
        if ("success" in d) {
            console.log(d)

            let temp = d.success.split(' ')

            navigation.navigate("Details", {name:temp[0]})
            
        }
    }


    return (<>
        {submitted ?

            <View></View>

            :
            <ScrollView
                
            >
                <View style={{ backgroundColor: '#EEEEEE', marginBottom: 20, padding: 20, borderRadius: 3, shadowOpacity: 0.5, shadowColor: 'black', flexDirection: 'row', justifyContent: 'space-around' }}>
                    <RadioForm
                        radio_props={colorRadioProps}
                        initial={0}
                        formHorizontal={false}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}
                        onPress={(value: any) => { setColorVal(value) }}
                    />
                    <View style={{ margin: 20 }} />

                    <RadioForm
                        radio_props={shapeRadioProps}
                        initial={0}
                        formHorizontal={false}
                        labelHorizontal={true}
                        buttonColor={'#2196f3'}
                        animation={true}
                        onPress={(value: any) => { setShapeVal(value) }}
                    />

                </View>
                <TextInput
                    placeholder="Imprint"
                    onChangeText={(res) => { setImprint(res) }}
                />

                <TouchableOpacity style={styles.ButtonContainer} onPress={handleSubmit}>
                    <Text style={styles.ButtonText}>Submit</Text>
                </TouchableOpacity>

            </ScrollView>


        }

    </>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    formLabel: {
        fontSize: 20,
        color: '#fff',
    },
    inputStyle: {
        marginTop: 20,
        width: 300,
        height: 40,
        paddingHorizontal: 10,
        borderRadius: 50,
        borderWidth: 3,
        backgroundColor: '#DCDCDC',
    },
    formText: {
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontSize: 20,
    },
    text: {
        color: '#fff',
        fontSize: 20,
    },
    ButtonContainer: {
        elevation: 8,
        backgroundColor: "#009688",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop: 20,
        marginBottom: 50
    },
    ButtonText: {
        fontSize: 18,
        color: "#fff",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    },
    diagonalBox: {
        transform: [{ skewY: '-30deg' }]
    }
});

export default FeedbackScreen