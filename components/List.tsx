import React, { useCallback } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";

// the filter
const List = (props: any) => {

    const go_details = (name: string) => {
        props.navigation.navigate('Details', {name})
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
            return <Item name={item.Name} details={item.Brand} />;
        }
        // filter of the name
        if (item.Name.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <Item name={item.Name} details={item.Brand} />;
        }

        // filter of the Brand
        if (item.Brand.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <Item name={item.Name} details={item.Brand} />;
        }

    };

    return (
        <SafeAreaView style={styles.list__container}>
            {props.data && <View>
                <FlatList
                    data={props.data}
                    // @ts-ignore   
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
                <FlatList
                    data={props.data}
                    // @ts-ignore   
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
                <FlatList
                    data={props.data}
                    // @ts-ignore   
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                />
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