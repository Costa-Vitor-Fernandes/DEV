import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import LoginScreen from './loginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useState } from 'react';
import axios from 'axios';
import TesteAbertas from './testeAbertas';
const DeviceWidth =  Dimensions.get('window').width

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Configuracao (){
  return(
    <View>
      <Text>
        Configurações Configurações Configurações
      </Text>
      <Button title="Encerrar o Dia(Exportar p/ Excel)"></Button>
      <Button title="Adicionar Produtos"></Button>
      <Button title="Alterar Preço"></Button>
      <Button title="Excluir Produtos"></Button>
      <Button title="Cadastrar novo Login"></Button>
      <Button title="Todos Pedidos Abertos e Fechados / id"></Button>
    </View>
  )
}

function Comanda (){
  return (
    <View style={styles.ComandaContainer}>
      <Text>Nome da comanda</Text>
    </View>
  )
}

// function Abertas(){

// //   useEffect(()=>{
// //     axios.get('http://192.168.0.30:3001/comandasAbertas', {
// //     })
// //     .then(function (response) {
// //       console.warn(response.data);
// //       })
// //       .catch(function (error) {
// //       // alert("Login inválido")
// //       console.error(error);
// // });

// //   },[])
//   return(
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.addButton}>
//         <Text style={styles.buttonText}>+</Text>
//       </TouchableOpacity>
//     </View>
//   )
// }


function Fechadas(){
  return(
    <View>
      <Text>
        comandas fechadas
      </Text>
    </View>
  )
}

function Testao (props) {
//   useEffect(()=>{
//     axios.get('http://192.168.0.30:3001/todasComandasAbertas')
//         .then(function (response) {
//           console.warn(response.data) // todos ids
//         });
// })


const addCliente = () =>{
  console.log('addClientes')
  // axios.post novo cliente e produto
}

  return(
    <View style={styles.container}>
<TesteAbertas params={props.route.params}  logic={props.route.params.logic} ></TesteAbertas>
<TouchableOpacity style={styles.addButton} onPress={addCliente}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}


function Home() {

  const [eachCliente,setEachCliente] = useState('')
  const [logic,setLogic] = useState('a')

  const refreshData = (f) =>{
    console.warn('refreshData')
    f
    
    
}
const atualizar =()=>{
  setTimeout(()=>{
    console.log("atualizar")

    setLogic('paugroso')
    console.log(logic,"logic")
  },2000)
}
  return (
    <Tab.Navigator>
      

      <Tab.Screen name="Abertas" component={Testao}
       initialParams={()=>logic}
       options={{headerRight: (props)=>
        <View
        style={styles.botaoheader}
         >
           <Button title="Atualizar" />
         </View> }}
      />
      <Tab.Screen name="Configurações" component={Configuracao}  />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
     <NavigationContainer>
    <Home></Home>
     </NavigationContainer>
    //   <Stack.Navigator>
    //     <Stack.Screen
    //       name="Login"
    //       component={LoginScreen}
    //       options={{ headerShown: false }}
    //     />
    //     <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    //     {/* <Stack.Screen name="Settings" component={Messages} />  */}
    //   </Stack.Navigator>
    // </NavigationContainer>
  );
}


// export default function App() {
//   return (
// <LoginScreen1></LoginScreen1>
//   );
// }

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width ,
    height: Dimensions.get("window").height, 
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  addButton:{
    position:"absolute",
    top:Dimensions.get("window").height-200,
    left:Dimensions.get("window").width-100,
    width:65,
    borderRadius: 50,
    backgroundColor: "#ddd",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.46,
    shadowRadius: 11.14,
    
    elevation: 17,
  },
  buttonText:{
    margin:0,
    paddingBottom:5,
    textAlign:'center',
    fontSize:40,
  },
  ComandaContainer:{
    margin:5,
    width:Dimensions.get('window').width/3 - 5,
    height:Dimensions.get("window").height/4-10,
    position:'relative',
    backgroundColor:"#aaa",

  },
  botaoheader:{
  height:40,
  position: 'absolute',
  textAlign:'center',
  right:15,
  width:Dimensions.get('window').width/4 +5,
  backgroundColor:"blue",
  },
  refreshbutton:{
    
  }

});
