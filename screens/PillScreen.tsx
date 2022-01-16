import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, TouchableOpacity, StatusBar, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import { osName } from 'expo-device';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Dimensions, Text } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { Col, Row, Grid } from "react-native-easy-grid";
import { PinchGestureHandler, ScrollView } from 'react-native-gesture-handler';
import Svg, { Rect } from 'react-native-svg';
import ImageContext from '../hooks/imageContext';
import dummyData from '../constants/dummyData.json'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

let flipPosition: any = osName === "Android" ? StatusBar.currentHeight as number : 30

function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export default function CameraScreen({ navigation }: any) {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
    const [zoom, setZoom] = useState(0)
    const [isLoading, setIsLoading] = useContext(ImageContext).isLoading
    const [uri, setUri] = useContext(ImageContext).uri
    const [catIndex, setCatIndex] = useState(0)

    const isFocused = useIsFocused();

    const handleEvent = (e: any) => {
        let newZoom =
            e.nativeEvent.velocity > 0
                ? zoom + e.nativeEvent.scale * e.nativeEvent.velocity * (Platform.OS === "ios" ? 0.001 : 5)
                : zoom - e.nativeEvent.scale * Math.abs(e.nativeEvent.velocity) * (Platform.OS === "ios" ? 0.002 : 5);

        if (newZoom < 0) newZoom = 0;
        else if (newZoom > 0.5) newZoom = 0.5;

        setZoom(newZoom);
    }

    let camera: Camera
    const __takePicture = async () => {
        if (!camera) return
        setIsLoading(true)
        const photo = await camera.takePictureAsync({ quality: 1 })

        const manipImage = await manipulateAsync(
            photo.uri,
            [{
                resize: {
                    width: photo.width,
                    height: photo.height
                }
            },
            {
                crop: {
                    originX: 0,
                    originY: (photo.height - photo.width) / 2,
                    width: photo.width,
                    height: photo.width
                }
            }
            ],
            {
                format: 'jpeg' as SaveFormat,
                compress: 0.5,
                base64: true
            }
        )

        const body = JSON.stringify({
            requests: [
                {
                    image: {
                        content: manipImage.base64
                    },
                    features: [
                        {
                            type: "TEXT_DETECTION"
                        }
                    ]
                }
            ]
        })

        const visionRequest = await fetch(`https://vision.googleapis.com/v1p3beta1/images:annotate?key=${process.env.CLOUDVISIONAPIKEY}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: body
        })

        const visionData = await visionRequest.json()
        const data = visionData.responses[0].fullTextAnnotation

        let words = []

        for (let i = 0; i < data.pages.length; i++) {
            for (let j = 0; j < data.pages[i].blocks.length; j++) {
                for (let k = 0; k < data.pages[i].blocks[j].paragraphs.length; k++) {
                    for (let m = 0; m < data.pages[i].blocks[j].paragraphs[k].words.length; m++) {
                        let temp = ""
                        for (let n = 0; n < data.pages[i].blocks[j].paragraphs[k].words[m].symbols.length; n++) {
                            temp = temp + data.pages[i].blocks[j].paragraphs[k].words[m].symbols[n].text
                        }
                        words.push(temp)
                    }
                }
            }
        }

        let check = true
        for (let i = 0; i < words.length; i++) {

            for (let j = 0; j < dummyData.length; j++) {
                if (words[i] == dummyData[j]) {
                    check = false
                    setIsLoading(false)
                    setUri(manipImage.uri)
                    navigation.navigate("Details", { name: words[i] })
                }
            }
        }

        if (check) {
            setIsLoading(false)
            setUri(manipImage.uri)
            navigation.navigate('Home')
        }


    }

    const goBack = () => {
        navigation.navigate('Home', { screen: "Start" })
    }

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            if (status !== 'granted') {
                navigation.navigate('Home', { screen: "Start" })
            }
        })();
    }, []);

    const Round = 0
    const Capsule = 1
    const Oval = 2
    const Egg = 3

    return (<>
        <PinchGestureHandler
            onGestureEvent={handleEvent}
        >
            <View>
                {isFocused && <Camera
                    type={type}
                    flashMode={flash}
                    ratio={"16:9"}
                    zoom={zoom}
                    style={{ height: '100%' }}
                    ref={(r) => {
                        camera = r as Camera
                    }}
                >
                    <Grid style={styles.topToolbar}>
                        <Row>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity onPress={() => { setCatIndex(Round) }}>
                                    <View style={{ height: 30, width: 30, borderRadius: 15, backgroundColor: catIndex === Round ? "#7FDBFF" : "white" }} />
                                    <Text style={{ color: 'white' }}>Round</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity onPress={() => { setCatIndex(Capsule) }}>
                                    <View style={{ height: 15, width: 30, borderRadius: 15, backgroundColor: catIndex === Capsule ? "#7FDBFF" : "white" }} />
                                    <Text style={{ color: 'white' }}>Capsule</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity onPress={() => { setCatIndex(Oval) }}>
                                    <View style={{ height: 15, width: 30, borderRadius: 7.5, backgroundColor: catIndex === Oval ? "#7FDBFF" : "white" }} />
                                    <Text style={{ color: 'white' }}>Oval</Text>
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity onPress={() => { setCatIndex(Egg) }}>
                                    <View style={{
                                        width: 180 / 5,
                                        height: 126 / 5,
                                        backgroundColor: catIndex === Egg ? "#7FDBFF" : "white",
                                        borderTopLeftRadius: 95 / 5,
                                        borderTopRightRadius: 95 / 5,
                                        borderBottomLeftRadius: 108 / 5,
                                        borderBottomRightRadius: 108 / 5,
                                    }}
                                    />
                                    <Text style={{ color: 'white' }}>Egg</Text>
                                </TouchableOpacity>
                            </Col>
                        </Row>
                    </Grid>
                    <Grid style={styles.bottomToolbar}>

                        <Row>
                            <Col style={styles.alignCenter}>

                                <TouchableOpacity
                                    onPress={() => {
                                        setFlash(
                                            flash === Camera.Constants.FlashMode.off
                                                ? Camera.Constants.FlashMode.on
                                                : Camera.Constants.FlashMode.off
                                        );
                                    }}>
                                    {
                                        flash === Camera.Constants.FlashMode.off ? (
                                            <Ionicons name="flash-off" size={30} color="white" />
                                        ) : (
                                            <Ionicons name="flash" size={30} color="white" />
                                        )
                                    }
                                </TouchableOpacity>
                            </Col>
                            <Col size={2} style={styles.alignCenter}>
                                <TouchableOpacity
                                    onPress={() => {
                                        __takePicture();
                                    }}>
                                    <View style={[styles.captureBtn]} />
                                </TouchableOpacity>
                            </Col>
                            <Col style={styles.alignCenter}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setType(
                                            type === Camera.Constants.Type.back
                                                ? Camera.Constants.Type.front
                                                : Camera.Constants.Type.back
                                        );
                                    }}>
                                    <MaterialIcons name="flip-camera-ios" size={30} color="white" />
                                </TouchableOpacity>
                            </Col>
                        </Row>
                    </Grid>
                    <Svg
                        width={windowWidth}
                        height={windowHeight}
                    >
                        <Rect
                            x={8}
                            rx={20}
                            y={(windowHeight - windowWidth) / 2}
                            width={windowWidth - 16}
                            height={windowWidth}
                            stroke="rgba(255, 255, 255, .4)"
                            strokeWidth="3"
                        />
                    </Svg>

                </Camera>}
            </View>
        </PinchGestureHandler>

    </>);
}

const styles = StyleSheet.create({
    alignCenter: {
        flex: 1,
        alignItems: 'center',

        justifyContent: 'center',
    },
    bottomToolbar: {
        width: windowWidth,
        position: 'absolute',
        height: 100,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    topToolbar: {
        width: windowWidth,
        position: 'absolute',
        height: 100,
        top: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    captureBtn: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderRadius: 60,
        borderColor: 'white',
        borderStyle: 'solid',
        backgroundColor: 'white',
    },
    captureBtnActive: {
        width: 80,
        height: 80,
    },
    captureBtnInternal: {
        width: 76,
        height: 76,
        borderWidth: 2,
        borderRadius: 76,
        backgroundColor: "red",
        borderColor: "transparent",
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
