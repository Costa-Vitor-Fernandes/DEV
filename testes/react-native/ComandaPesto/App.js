import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import LoginScreen from './loginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



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

function Abertas(){
  return(
    <View style={styles.container}>
      <Text>
        comandas abertas
      </Text>
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
function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Abertas" component={Abertas}  />
      <Tab.Screen name="Fechadas" component={Fechadas}  />
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
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addButton:{
    
    width:65,
    borderRadius: 100,
    backgroundColor: "#999"
  },
  buttonText:{
    margin:0,
    paddingBottom:5,
    textAlign:'center',
    fontSize:40,

  }
});
