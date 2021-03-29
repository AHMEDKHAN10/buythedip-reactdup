import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TextInput,
  Dimensions,
  Button,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import stocks from "../constants";
import { Menu } from "react-native-paper";
import axios from 'axios'
// const A = require('../constants/CompanyDeets/A.json');
// const B = require('../constants/CompanyDeets/B.json');
// const C = require('../constants/CompanyDeets/C.json');
// const D = require('../constants/CompanyDeets/D.json');
// const E = require('../constants/CompanyDeets/E.json');
// const F = require('../constants/CompanyDeets/F.json');
// const G = require('../constants/CompanyDeets/G.json');
// const H = require('../constants/CompanyDeets/H.json');
// const I = require('../constants/CompanyDeets/I.json');
// const J = require('../constants/CompanyDeets/J.json');
// const K = require('../constants/CompanyDeets/K.json');
// const L = require('../constants/CompanyDeets/L.json');
// const M = require('../constants/CompanyDeets/M.json');
// const N = require('../constants/CompanyDeets/N.json');
// const O = require('../constants/CompanyDeets/O.json');
// const P = require('../constants/CompanyDeets/P.json');
// const Q = require('../constants/CompanyDeets/Q.json');
// const R = require('../constants/CompanyDeets/R.json');
// const S = require('../constants/CompanyDeets/S.json');
// const T = require('../constants/CompanyDeets/T.json');
// const U = require('../constants/CompanyDeets/U.json');
// const V = require('../constants/CompanyDeets/V.json');
// const W = require('../constants/CompanyDeets/W.json');
// const X = require('../constants/CompanyDeets/X.json');
// const Y = require('../constants/CompanyDeets/Y.json');
// const Z = require('../constants/CompanyDeets/Z.json');

import Autocomplete from "react-native-autocomplete-input";

const height = Dimensions.get("screen").height;
// let companySymbol
function FirstScreen() {
  const [symbols, setSymbols] = useState();
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [data, setData] = useState([]);
  const [price, setPrice] = useState([])
  
  const StockName = async (name) => {
    let url = 'http://localhost:3000'
    let Name = JSON.stringify(name)
    let request = JSON.stringify({
      stock : name,
    })
    const options = {
      method: "POST",
      headers: {
        Accept: 'application/json',
        "Content-Type" : "application/json"
      },
      body: request
    };
    // console.log("name: "+ options.body.stock)
    const response = await fetch('http://127.0.0.1:3000/getStockName', options)
    const json = await response.json();
    console.log(json)
    // setPrice(json.price)
    var p = json.price
    setPrice(p)
  }
  useEffect(()=>{
    console.log(price)
  })

  function renderHeader(navigation) {
    return (
      // flex:1,
      <View
        style={{
          flex: 1,
          paddingRight: 20,
          flexDirection: "row",
          justifyContent: "center",
          justifyContent: "space-between",
          width: "100%",
          height: 10,
        }}
      >
        <Text
          style={{
            padding: 10,
            textAlign: "right",
            width: "67%",
            fontSize: 23,
            height: 50,
          }}
        >
          <Text style={{ fontWeight: "800" }}>DIP</Text>
          <Text style={{ fontWeight: "400" }}>LIST</Text>
        </Text>
        <Text
          style={{
            padding: 10,
            paddingTop: 15,
            textAlign: "right",
            width: "33%",
            fontSize: 18,
            height: 50,
            color: "#6fcc51",
          }}
          onPress={() => {
            navigation.navigate("Home", {
            StockName: 'No specific stock selected',
          });
          }}
        >
          Skip
        </Text>
      </View>
    );
  }
  
  function StalkHeader() {
    return (
      <View
        style={{ flex: 3, padding: 10, width: Dimensions.get("window").width }}
      >
        <TextInput
          placeholder="GME"
          style={{
            fontWeight: "400",
            letterSpacing: 4,
            textAlign: "center",
            fontSize: 80,
            height: 90,
            color: "#c6c8c9",
          }}
          autoCapitalize="characters"
        >
          {/* <Text style={{fontWeight:'400',letterSpacing:4, textAlign:'center', fontSize:80,height: 90, color:'#c6c8c9'}}>GME</Text> */}
        </TextInput>
        <Text
          style={{
            fontWeight: "400",
            marginTop: 4,
            color: "#c6c8c9",
            textAlign: "center",
          }}
        >
          Last close $567.99
        </Text>
      </View>
    );
  }

  useEffect(() => {
    const stuff = [];
    if (query === "") {
      setData([]);
    } 
    else if (query.length === 1) {
      stocks[query].map((element) => {
        stuff.push(element);
      });
    } 
    else if (query.length > 1) {
      stocks[query[0]].forEach((element) => {
        if (element.symbol.search(query) === 0) {
          stuff.push(element);
        }
      });
    }
    if (stuff === [] || stuff.length === 1) {
      setData([]);
    } else {
      setData(stuff);
    }
  }, [query]);

  // console.log("query: "+query)
  return (
    <SafeAreaView
      style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
    >
      {renderHeader(navigation)}
      {/* {StalkHeader()} */}

      <View
        style={{ flex: 3, padding: 10, width: Dimensions.get("window").width }}
      >
       <Autocomplete
          data={data}
          defaultValue={query}
          placeholder="GME"
          onChangeText={(value) => setQuery(value)}
          renderItem={({ item, index }) => (
            <Menu.Item
              key={index}
              onPress={() => {
                setQuery(item.symbol);
                setData([])
                //* to send company name to next screen
                navigation.navigate("SetAlert", {
                  otherParam: item.symbol,
                  price : '$'+price
                })
                // console.log("query: "+query)
                StockName(item.symbol)
              }}
              title={
                <Text style={{ fontWeight: "bold" }}>
                  {item.symbol}{" "}
                  <Text style={{ fontSize: 10 }}>{item.name}</Text>
                </Text>
              }
            />
          )}
          style={{
            fontWeight: "400",
            letterSpacing: 4,
            textAlign: "center",
            fontSize: 80,
            height: 90,
          }}
          listStyle={{maxHeight:0.4*height, borderColor:"transparent"}}
          flatListProps={{showsVerticalScrollIndicator:false}}
          inputContainerStyle={{ borderColor: "transparent"}}
          keyExtractor={(item,index)=>{
            return item.symbol;
          }}

          autoCapitalize="characters"
        />
        <Text
          placeholder='abc'
          style={{
            fontWeight: "400",
            marginTop: 4,
            // color: "#c6c8c9",
            color: "#000",
            textAlign: "center",
          }}
        >
          last closed at ${price}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5FCFF",
    flex: 1,
    padding: 16,
    marginTop: 40,
  },
  autocompleteContainer: {
    backgroundColor: "#ffffff",
    borderWidth: 0,
  },
  descriptionContainer: {
    flex: 1,
    justifyContent: "center",
  },
  itemText: {
    fontSize: 15,
    paddingTop: 5,
    paddingBottom: 5,
    margin: 2,
  },
  infoText: {
    textAlign: "center",
    fontSize: 16,
  },
  ButtonAddStock:{
    width:'85%',
    backgroundColor:'#2b3033',
    height: 58,
    borderRadius:40,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#2b3033'
    },
ButtonAddStockText:{
    color:'#ffe6d2',
    fontSize: 20,
    textAlign:'center',
    paddingLeft : 10,
    paddingRight:10
}
});

export default FirstScreen;
