import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


export default function TabAbertas () {

const [data,setData] = useState(false)
const eachClient = []
  
// useEffect(()=>{
//     axios.get('http://192.168.0.30:3001/todosClientesAbertos', {
//     })
//     .then(function (response) {
//         const arrClientes = response.data
//           console.warn(arrClientes)

//         arrClientes.forEach((e, i, arrClientes) =>{
//             eachClient.push({key : arrClientes[i]})
//         });
//     })
//     .catch(function (error) {
//         alert("Nao tem ngm ainda")
//         console.error(error)
//     })
    
// })

    return(
        <View><Text>{data}</Text></View>
        )
}

