import React, { useCallback } from "react"
import { FlatList, ScrollView, Text, StyleSheet } from "react-native"



const HorizontalScroll = ({data, effects, numColumns}:any) => {
    const keyExtractor = useCallback(
        (item, index) => index.toString(),
        [data]
    )
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <FlatList
                data={effects}
                numColumns={Math.round(effects.length / numColumns)}
                scrollEnabled={true}
                keyExtractor={keyExtractor}
                renderItem={({ item, index }: any) => {

                    for (let i = 0; i < data.regEffects.length; i++) {
                        if (item == data.regEffects[i]) {
                            return (
                                <Text key={index} style={[styles.chipsItem, { backgroundColor: '#3EB489' }]}><Text>{item}</Text></Text>
                            )
                        }
                    }

                    for (let i = 0; i < data.severeEffects.length; i++) {
                        if (item == data.severeEffects[i]) {
                            return (
                                <Text key={index} style={[styles.chipsItem, { backgroundColor: '#F6343F' }]}><Text>{item}</Text></Text>
                            )
                        }
                    }

                    return (
                        <Text key={index} style={[styles.chipsItem, { backgroundColor: 'orange', color: 'black' }]}><Text>{item}</Text></Text>
                    )


                }}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
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

export default HorizontalScroll