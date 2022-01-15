import React from "react";
import { StyleSheet, TextInput, View, Keyboard, Button, TouchableOpacity } from "react-native";
import { Feather, Entypo } from "@expo/vector-icons";

const SearchBar = (props: any) => {
    return (
        <View style={styles.container}>
            <View
                style={styles.searchBar}
            >
                {/* search Icon */}
                <Feather
                    name="search"
                    size={20}
                    color="black"
                    style={{ marginLeft: 10 }}
                />
                {/* Input field */}
                <TextInput
                    style={styles.input}
                    placeholder="Search"
                    value={props.searchPhrase}
                    onChangeText={props.setSearchPhrase}
                    onFocus={() => {
                        props.setClicked(true);
                    }}
                />
                {/* cross Icon, depending on whether the search bar is clicked or not */}
                {props.clicked && (
                    <Entypo name="cross" size={20} style={{ marginRight: 10 }} color="black" onPress={() => {
                        props.setSearchPhrase("")
                    }} />

                )}
            </View>
        </View>
    );
};
export default SearchBar;

// styles
const styles = StyleSheet.create({
    container: {
        margin: 15,
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "row",
        width: "90%",
    },
    searchBar: {
        padding: 10,
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#fff",
        borderRadius: 90,
        borderWidth: 1,
        borderColor: "#A89c94FF",
        alignItems: "center",
        justifyContent: "space-evenly",
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    input: {
        fontSize: 20,
        marginLeft: 20,
        color: "#0c0c0c",
        width: "90%",
    },
})