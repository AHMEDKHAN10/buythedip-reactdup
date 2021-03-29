import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Dimensions, Button, TouchableOpacity, TouchableHighlight } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { IEXClient } from 'iex-api'
import { NavigationContainer,useNavigation } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// const Stack = createStackNavigator();
// bodyParser = {
//     json: {limit: '50mb', extended: true},
//     urlencoded: {limit: '50mb', extended: true}
//   };
// const MyStack = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{ title: 'Welcome' }}
//         />
//         <Stack.Screen name="Profile" component={ProfileScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

async function ButtonClick(){
    
}

function renderHeader(){
    // const [width, setWidth] = React.useState(null)
    // function getScreenWidth(){
    //     const screenWidth = Math.round(Dimensions.get('window').width);
    //     setWidth(screenWidth)
    //     return width;
    // }
    
    
    return(
        // flex:1,
        <View style={{flex:1, alignItems: 'flex-start', flexDirection: 'row', justifyContent:'space-between', width:'100%', height: 50, marginTop:50}}>
            <Ionicons name="settings-outline" size={24} color="black" style={{ paddingTop:10, paddingLeft:35, width: '40%'}}/>
            <Text style={{padding: 10, textAlign:'left', width: '60%', fontSize:23}}>
                <Text style={{fontWeight:'800'}}>DIP</Text>
                <Text style={{fontWeight:'400'}}>LIST</Text>
            </Text>
        </View>
    )
}
function Content1(otherParam, price, trigger){
    return(
        //flex:10,
        <View style={{flex:2, width:(Dimensions.get('window').width - (0.1*(Dimensions.get('window').width))), height:50}}>
            {/* <Ionicons name="settings-outline" size={24} color="black" style={{padding: 10}}/> */}
            <View  style={{width: '100%', height: 50, marginTop:50, marginLeft:'5%' ,alignItems:'left'}}>
                <Text style={{fontSize:25}}>
                    <Text style={{fontWeight:'800'}}>DIP</Text>
                    <Text style={{fontWeight:'400'}}>LIST</Text>
                </Text>
            </View>
            <View  style={{flexDirection:'row' ,width: '100%', height: 60, marginLeft:'5%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}>
                <View style={{width:'50%'}}>
                    <Text style={{fontSize:17}}>{otherParam}</Text>
                    <Text style={{marginTop:4,fontSize:14,color:'#6a6e70', fontWeight:'500'}}>Last closed {price}</Text> 
                </View>
                <TouchableHighlight  style={styles.Button} onPress={()=> console.log("Button Tapped")} underlayColor='#fff'>
                    <Text style={styles.ButtonText}>${trigger}</Text>
                </TouchableHighlight>
            </View>
        </View>
    )
}
function Content2(){
    // let companySymbol
    // const [comSymbol, setComSymbol] = useState()
    // async function ButtonClick(){
        
    //     await fetch('https://cloud.iexapis.com/stable/stock/djia/quote?token=pk_ff75f45b67ea4af8b98746be0bf5d7eb')
    //         .then((response) => response.json())
    //         .then((json) => {
    //             // companySymbol = json.symbol
    //             // setComSymbol(companySymbol)
    //             console.log("symbol:"+ json)
    //         })
        
    //     // console.log("symbol: ", comSymbol)
    //     //   navigation.navigate('Profile', { name: 'Jane' })
        
    // }
    return(
        <View style={{flex:5, width:(Dimensions.get('window').width - (0.1*(Dimensions.get('window').width))), height:50}}>
            {/* <Ionicons name="settings-outline" size={24} color="black" style={{padding: 10}}/> */}
            <View  style={{width: '100%', height: 50, marginTop:50, marginLeft:'5%' ,alignItems:'left'}}>
                <Text style={{fontSize:25}}>
                    {/* <Text style={{fontWeight:'800'}}>DIP</Text> */}
                    <Text style={{fontWeight:'400'}}>INDICES</Text>
                </Text>
            </View>
            <View  style={{marginTop:10,flexDirection:'row' ,width: '100%', height: 60, marginLeft:'5%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}>
                <View style={{width:'50%'}}>
                    <Text style={{fontSize:17}}>DJIA</Text>
                    <Text style={{marginTop:4,fontSize:14,color:'#6a6e70', fontWeight:'500'}}>Last closed $29,891</Text> 
                </View>
                <TouchableOpacity  style={styles.ButtonSet} onPress={()=> console.log("Button Tapped")} underlayColor='#fff'>
                    <Text style={styles.ButtonSetText}>Set</Text>
                </TouchableOpacity>
            </View>
            <View  style={{marginTop:40,flexDirection:'row' ,width: '100%', height: 60, marginLeft:'5%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}>
                <View style={{width:'50%'}}>
                    <Text style={{fontSize:17}}>NASDAQ</Text>
                    <Text style={{marginTop:4,fontSize:14,color:'#6a6e70', fontWeight:'500'}}>Last closed $30,000</Text> 
                </View>
                <TouchableOpacity  style={styles.ButtonSet} onPress={()=> console.log("Button Tapped")} underlayColor='#fff'>
                    <Text style={styles.ButtonSetText}>Set</Text>
                </TouchableOpacity>
            </View>
            <View  style={{marginTop:40, flexDirection:'row' ,width: '100%', height: 60, marginLeft:'5%' ,borderBottomWidth :1,borderBottomColor: '#e2e3e4', alignItems:'left'}}>
                <View style={{width:'50%'}}>
                    <Text style={{fontSize:17}}>S&P 500</Text>
                    <Text style={{marginTop:4,fontSize:14,color:'#6a6e70', fontWeight:'500'}}>Last closed $15,029</Text> 
                </View>
                <TouchableOpacity  style={styles.ButtonSet} onPress={() => navigate('HomeScreen')} underlayColor='#fff'>
                    <Text style={styles.ButtonSetText}>Set</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
function Content3(navigation){
    return(
        <View style={{flex:1, width:(Dimensions.get('window').width ), height:50, alignContent:'center', alignItems:'center'}}>
            
            <TouchableHighlight  style={styles.ButtonAddStock} onPress={()=> navigation.navigate("FirstScreen")} underlayColor='#fff'>
                <Text style={styles.ButtonAddStockText}>Add Stock</Text>
            </TouchableHighlight>
        </View>
    )
}
function Home({route}) {
    const navigation = useNavigation();
    const { otherParam, price, trigger } = route.params;
    return (
        <View style={styles.container}>
            {renderHeader()}
            {Content1(otherParam, price, trigger)}
            {Content2()} 
            {Content3(navigation)}
        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    //   width: 100%
    },
    childView: {
 
        // width: 100,
        // height: 100,
        borderBottomWidth :5,
        borderBottomColor: '#000',
        backgroundColor: '#00BCD4',
     
      },

    Button:{
    //     marginRight:40,
        marginLeft:'25%',
        width:'25%',
    //    marginTop:10,
    //     paddingTop:10,
    //     paddingBottom:10,
        backgroundColor:'#ec5d29',
        height: 35,
        borderRadius:8,
        // borderWidth: 1,
        // borderColor: '#fff'
        justifyContent: 'center'
      },
      ButtonText:{
        color:'#fff',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    ButtonSet:{
        marginLeft:'25%',
        width:'25%',
        backgroundColor:'#fff',
        height: 38,
        borderRadius:8,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#2b3033'
        },
    ButtonSetText:{
        color:'#2b3033',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
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