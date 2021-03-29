const express = require('express')
const app = express()
const fetch = require("node-fetch");
const bodyParser = require('body-parser') 
var fs = require('fs');
const { response, json } = require('express');
const { name } = require('ejs');
require('dotenv').config()
// app.set('view engine', 'ejs')
// app.use('/', require('./routes/hello'))
const ofirebase = require("../firebase/setData")

let A = {"A":[]}
let B = {"B":[]}
let C = {"C":[]}
let D = {"D":[]}
let E = {"E":[]}
let F = {"F":[]}
let G = {"G":[]}
let H = {"H":[]}
let I = {"I":[]}
let J = {"J":[]}
let K = {"K":[]}
let L = {"L":[]}
let M = {"M":[]}
let N = {"N":[]}
let O = {"O":[]}
let P = {"P":[]}
let Q = {"Q":[]}
let R = {"R":[]}
let S = {"S":[]}
let T = {"T":[]}
let U = {"U":[]}
let V = {"V":[]}
let W = {"W":[]}
let X = {"X":[]}
let Y = {"Y":[]}
let Z = {"Z":[]}



// var A = [{'symbol': 'abc'}, {'name': 'abc'},{'exchangeName': 'abc'}], 
// B = {'symbol': [], 'name': [],'exchangeName': []}, 
// C ={'symbol': [], 'name': [],'exchangeName': []}, 
// D={'symbol': [], 'name': [],'exchangeName': []}, 
// E={'symbol': [], 'name': [],'exchangeName': []}, 
// F={'symbol': [], 'name': [],'exchangeName': []}, 
// G={'symbol': [], 'name': [],'exchangeName': []}, 
// H={'symbol': [], 'name': [],'exchangeName': []}, 
// I={'symbol': [], 'name': [],'exchangeName': []}, 
// J={'symbol': [], 'name': [],'exchangeName': []}, 
// K={'symbol': [], 'name': [],'exchangeName': []}, 
// L={'symbol': [], 'name': [],'exchangeName': []}, 
// M={'symbol': [], 'name': [],'exchangeName': []}, 
// N={'symbol': [], 'name': [],'exchangeName': []}, 
// O={'symbol': [], 'name': [],'exchangeName': []}, 
// P={'symbol': [], 'name': [],'exchangeName': []}, 
// Q={'symbol': [], 'name': [],'exchangeName': []}, 
// R={'symbol': [], 'name': [],'exchangeName': []}, 
// S={'symbol': [], 'name': [],'exchangeName': []}, 
// T={'symbol': [], 'name': [],'exchangeName': []},
// U={'symbol': [], 'name': [],'exchangeName': []}, 
// V={'symbol': [], 'name': [],'exchangeName': []}, 
// W={'symbol': [], 'name': [],'exchangeName': []}, 
// X={'symbol': [], 'name': [],'exchangeName': []}, 
// Y={'symbol': [], 'name': [],'exchangeName': []}, 
// Z={'symbol': [], 'name': [],'exchangeName': []}


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

// * test api template: https://sandbox.iexapis.com/stable/stock/IBM/quote?token=Tpk_c8f87278dd3240558219a5616af5f143


app.post("/savedata/", function(req,res){
    ofirebase.saveData(req.body, function(err, data){
        res.send(data)
    })
})

// app.get('/getRealTimePrice', async(req, res) =>{
//     setInterval(getRealTimePrice, 5000)
// })
// var stockName
let price = 0
// app.get('/:name',function (req, res){
//     const name = req.params.name
//     res.send("hey" + name)
// })

app.post('/getStockName', async function(req, res){
    var stockName = req.body.stock
    console.log("stock name: "+stockName)

    await getOHLC(stockName)

    res.json({
        stock : stockName,
        price : price
    })
    //* price sent for that particular stock to frontend for price update below the stockname in frontend
    // res.json({
    //     name: stockName,
    //     closePrice: price
    // })
})

app.post('/getTrigger', async function(req, res){
    var triggerPrice = req.body.trigger
    console.log("stock name: "+triggerPrice)
    res.json({
        triggerPrice : triggerPrice,
    })
})


app.post('/getNotify', function(req, res){
    setInterval(getRealTimePrice, 5000)
})

// app.get('/getOHLC', async(req,res) =>{
//     await getOHLC()
//     res.json({
//         price: price
//     })
// })

async function getOHLC(stock){
    // * to get official open and close time
    // await fetch('https://sandbox.iexapis.com/stable/stock/IBM/ohlc?token=Tpk_c8f87278dd3240558219a5616af5f143')
    await fetch('https://sandbox.iexapis.com/stable/stock/'+ stock +'/ohlc?token=Tpk_c8f87278dd3240558219a5616af5f143')
        .then((response) => response.json())
        .then((json) => {
            console.log(json.close.price)
            price = json.close.price
        })
}

var calls =0;
var currentPrice = 0, prevPrice = 0

async function getRealTimePrice(){
    calls = calls + 1
    // * to get qoute (includes realtime price)
    await fetch('https://sandbox.iexapis.com/stable/stock/IBM/quote?token=Tpk_c8f87278dd3240558219a5616af5f143')
        .then((response) => response.json())
        // .then((json) => console.log(json.iexRealtimePrice))
        .then((json) => {
            
            if(calls == 1){
                currentPrice =json.iexRealtimePrice
                console.log("first if statement")
            }
            else if ( calls > 1){
                prevPrice = currentPrice
                currentPrice = json.iexRealtimePrice
            }
            // console.log(json.iexRealtimePrice)
            console.log("i: "+ calls + " Current: " + currentPrice + " Prev: " + prevPrice )
            //price drop notification
            var dropPercentage = ((prevPrice - currentPrice) / (prevPrice)) * 100
            console.log("drop: "+dropPercentage + "\n")

            if(dropPercentage >= 1){
                console.log("Alert!!!" + "\n")
            }
        })
}



// app.get('/', async(req, res) =>{
//     res.send('hello')
//     await fetch('https://cloud.iexapis.com/beta/ref-data/symbols?token=pk_ff75f45b67ea4af8b98746be0bf5d7eb')
//         .then((response) => response.json())
//         .then((json) => {
//             var i=0
//             while(i< json.length){
//                 var str = json[i].symbol
//                 // console.log(str.charAt(0))
//                 if(str.charAt(0) == 'A'){
//                     A["A"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'B'){
//                     B["B"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'C'){
//                     C["C"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'D'){
//                     D["D"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'E'){
//                     E["E"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'F'){
//                     F["F"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'G'){
//                     G["G"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'H'){
//                     H["H"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'I'){
//                     I["I"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'J'){
//                     J["J"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'K'){
//                     K["K"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'L'){
//                     L["L"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'M'){
//                     M["M"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'N'){
//                     N["N"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'O'){
//                     O["O"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'P'){
//                     P["P"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'Q'){
//                     Q["Q"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'R'){
//                     R["R"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'S'){
//                     S["S"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'T'){
//                     T["T"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'U'){
//                     U["U"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'V'){
//                     V["V"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'W'){
//                     W["W"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'X'){
//                     X["X"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'Y'){
//                     Y["Y"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 else if(str.charAt(0) == 'Z'){
//                     Z["Z"].push({ 
//                         "symbol":json[i].symbol,
//                         "name":json[i].name,
//                         "exchangeNam": json[i].exchangeName
//                     });
//                 }
//                 i++
//             }
//             var Astring = JSON.stringify(A);
//             var Bstring = JSON.stringify(B);
//             var Cstring = JSON.stringify(C);
//             var Dstring = JSON.stringify(D);
//             var Estring = JSON.stringify(E);
//             var Fstring = JSON.stringify(F);
//             var Gstring = JSON.stringify(G);
//             var Hstring = JSON.stringify(H);
//             var Istring = JSON.stringify(I);
//             var Jstring = JSON.stringify(J);
//             var Kstring = JSON.stringify(K);
//             var Lstring = JSON.stringify(L);
//             var Mstring = JSON.stringify(M);
//             var Nstring = JSON.stringify(N);
//             var Ostring = JSON.stringify(O);
//             var Pstring = JSON.stringify(P);
//             var Qstring = JSON.stringify(Q);
//             var Rstring = JSON.stringify(R);
//             var Sstring = JSON.stringify(S);
//             var Tstring = JSON.stringify(T);
//             var Ustring = JSON.stringify(U);
//             var Vstring = JSON.stringify(V);
//             var Wstring = JSON.stringify(W);
//             var Xstring = JSON.stringify(X);
//             var Ystring = JSON.stringify(Y);
//             var Zstring = JSON.stringify(Z);
//             // console.log(Astring)
//             fs.writeFile("A.json", Astring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("B.json", Bstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("C.json", Cstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("D.json", Dstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("E.json", Estring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("F.json", Fstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("G.json", Gstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("H.json", Hstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("I.json", Istring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("J.json", Jstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("K.json", Kstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("L.json", Lstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("M.json", Mstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("N.json", Nstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("O.json", Ostring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("P.json", Pstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("Q.json", Qstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("R.json", Rstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("S.json", Sstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("T.json", Tstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("U.json", Ustring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("V.json", Vstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("W.json", Wstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("X.json", Xstring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("Y.json", Ystring, function(err, result) { if(err) console.log('error', err); });
//             fs.writeFile("Z.json", Zstring, function(err, result) { if(err) console.log('error', err); });
//         })

        
// })




const PORT = process.env.PORT || 3000

app.listen(PORT, ()=>{
    const url = `http://localhost:${PORT}/`
    console.log(`listening on Port: ${url}`)
})