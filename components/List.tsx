import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import dummyData from '../constants/dummyData.json'

// the filter
const List = (props: any) => {

    const [data, setData] = useState([] as any)

    useEffect(() => {
        if (props.searchPhrase === "") {
            setData(dummyData)
        }
        else {
            let ans = []
            for (let i = 0; i < dummyData.length; i++) {
                if (dummyData[i].toUpperCase().startsWith(props.searchPhrase.toUpperCase().trim())) {
                    ans.push(dummyData[i])
                }
                if (ans.length > 50) {
                    break;
                }
            }
            setData(ans)
        }
    }, [props.searchPhrase])

    const go_details = (name: string) => {
        props.navigation.navigate('Details', { name })
    }

    // definition of the Item, which will be rendered in the FlatList
    const Item = ({ name, details }: any) => {
        return (
            <TouchableOpacity style={styles.item} onPress={() => go_details(name)}>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.details}>{details}</Text>
            </TouchableOpacity>
        )
    }

    const keyExtractor = useCallback(
        (item, index) => index.toString(),
        [props.data]
    )

    const renderItem = ({ item }: any) => {
        // when no input, show all
        if (props.searchPhrase === "") {
            return <Item name={item} />;
        }
        // filter of the name
        if (item.toUpperCase().startsWith(props.searchPhrase.toUpperCase().trim())) {
            return <Item name={item} />;
        }

    };

    return (
        <SafeAreaView style={styles.list__container}>
            {props.data && <View>
                {data.length > 200 ?

                    <FlatList
                        data={props.data}
                        // @ts-ignore   
                        renderItem={({ item }) => {
                            // when no input, show all
                            if (props.searchPhrase === "") {
                                return <Item name={item} />;
                            }
                            // filter of the name
                            if (item.toUpperCase().startsWith(props.searchPhrase.toUpperCase().trim())) {
                                return <Item name={item} />;
                            }
                        }}
                        keyExtractor={keyExtractor}
                    />

                    :


                    <ScrollView>
                        {data.map((e: any, index: any) => {
                            return (
                                <Item key={index} name={e} />
                            )
                        })}
                    </ScrollView>
                }
            </View>}
        </SafeAreaView>
    );


};


const styles = StyleSheet.create({
    list__container: {
        margin: 10,
        height: "85%",
        width: "100%",
    },

    item: {
        margin: 30,
        marginVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: "#A89c94FF",
        flexDirection: "row",
        paddingBottom: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        width: "70%",
        elevation: 10,
    },
    details: {
        padding: 3,
        minWidth: "30%",
        borderRadius: 90,
        borderWidth: 2,
        borderColor: "#A89c94FF",
        alignSelf: "flex-end",
        textAlign: "center",
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    }
});

export default List;