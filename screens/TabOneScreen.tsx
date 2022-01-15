import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import SearchBar from '../components/SearchBar';
import List from '../components/List'

const TabOneScreen = ({ navigation }: any) => {
  const [searchPhrase, setSearchPhrase] = useState("");
  const [clicked, setClicked] = useState(false);
  const [data, setData] = useState();

  // get data from the fake api endpoint
  // https://api.fda.gov/drug/drugsfda.json?search=openfda.generic_name:"LEVETIRACETAM"

  useEffect(() => {
    const getData = async () => {
      const apiResponse = await fetch(
        "https://api.fda.gov/drug/drugsfda.json?count=openfda.brand_name.exact&limit=5000"
      );
      const data = await apiResponse.json();
      setData(data);
    };
    getData();
  }, []);

  return (
    <SafeAreaView style={styles.root}>
      <SearchBar
        searchPhrase={searchPhrase}
        setSearchPhrase={setSearchPhrase}
        clicked={clicked}
        setClicked={setClicked}
      />

      <List
        searchPhrase={searchPhrase}
        data={data}
        setClicked={setClicked}
        navigation={navigation}
      />


    </SafeAreaView>
  );
};

export default TabOneScreen;

const styles = StyleSheet.create({
  root: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 60
  },
  title: {
    width: "100%",
    marginTop: 20,
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: "10%",
  },
});