import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions } from 'react-native';
import LoginScreen from './loginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import axios from 'axios';
import TesteAbertas from './testeAbertas';

const DeviceWidth =  Dimensions.get('window').width

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Configuracao (){
  return(
    <View>
      <Text>
        config
      </Text>
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

function Abertas(){

//   useEffect(()=>{
//     axios.get('http://192.168.0.30:3001/comandasAbertas', {
//     })
//     .then(function (response) {
//       console.warn(response.data);
//       })
//       .catch(function (error) {
//       // alert("Login inválido")
//       console.error(error);
// });

//   },[])
  return(
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}


function Fechadas(){
  return(
    <View>
      <Text>
        comandas fechadas
      </Text>
    </View>
  )
}

function Testao () {
//   useEffect(()=>{
//     axios.get('http://192.168.0.30:3001/todasComandasAbertas')
//         .then(function (response) {
//           console.warn(response.data) // todos ids
//         });
// })
  return(
    <View style={styles.container}>
<TesteAbertas></TesteAbertas>
<TouchableOpacity style={styles.addButton}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}


function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Abertas" component={Abertas}  />

      <Tab.Screen name="Testao" component={Testao}  />
      <Tab.Screen name="Configurações" component={Configuracao}  />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
     <NavigationContainer>
    <Home><Button title="botao"></Button></Home>
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
    top:600,
    left:310,
    width:65,
    borderRadius: 100,
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

});
