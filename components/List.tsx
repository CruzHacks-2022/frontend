import React, { useCallback } from "react";
import { StyleSheet, Text, View, FlatList, SafeAreaView, TouchableOpacity } from "react-native";

// the filter
const List = (props: any) => {

    const go_details = (name: string) => {
        props.navigation.navigate('details')
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
            return <Item name={item.term} details={item.count} />;
        }
        // filter of the name
        if (item.term.toUpperCase().includes(props.searchPhrase.toUpperCase().trim().replace(/\s/g, ""))) {
            return <Item name={item.term} details={item.count} />;
        }

    };

    return (
        <SafeAreaView style={styles.list__container}>
            {props.data && <View>
                <FlatList
                    data={props.data.results}
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
        borderBottomWidth: 2,
        borderBottomColor: "lightgrey"
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 5,
        fontStyle: "italic",
    },
    details: {
        paddingLeft: 0
    }
});

export default List;