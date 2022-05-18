import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, Dimensions, Modal, Pressable, TextInput  } from 'react-native';
import LoginScreen from './loginPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useEffect, useLayoutEffect, useState } from 'react';
import axios from 'axios';
import Configuracao from './Configuracao';
import Abertas from './Abertas';

const DeviceWidth =  Dimensions.get('window').width

const token = ''
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



function TabAbertas ({navigation}) {
  const [quantidade,setQuantidade]= useState("")
  const [novoCliente, setNovoCliente] = useState("")
  const [modalVisible,setModalVisible] = useState(false)
  const [refresh, setRefresh] = useState(false)
  const [produto,setProduto] = useState("")
  const [color,setColor]= useState("#24a0ed")

  
      useLayoutEffect(()=>{
        navigation.setOptions({
          headerRight: ()=> (<View
             style={styles.botaoheader}
              >
                <Button onPress={()=>setRefresh(!refresh)} title="Atualizar" />
              </View>)
        })
        setTimeout(()=>{
          setRefresh(false)
        
        },1000) // checar esse tempo de porta dps
      },[navigation, refresh])
  

const addClientePopUp = () =>{
  setModalVisible(!modalVisible) 
  setColor("#24a0ed")
  // axios.get produtos e precos da lista de produtos e setar um estado
  // esse estado vai pra Lista que vai renderizar no lugar do textinput de listinha de produto
}
const adicionarNovoCliente = () =>{
  setColor("green")
  


  console.log('info do que da sendo adicionado', novoCliente, quantidade, produto)
  axios.post('http://192.168.0.17:3001/addToComanda', {
        cliente:novoCliente,
        quantidade:quantidade,
        nomeproduto:produto,
        token: token
    })
    .then(function (response) {
        if (response.data.auth){
            token = response.data.token
            navigation.navigate("Home")
            // redirect to main page / home page whatever
        }
        // console.warn(response.data.token);
      })
      .catch(function (error) {
      alert("Login inválido")
        // console.error(error);
  });
}
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
    
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor:"#999"
    
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  viewAntesDoModal:{
    backgroundColor: "#999",
  },
  adicionar:{
    backgroundColor: color,
    borderRadius:50,
    height:30,
    justifyContent:'center',
  }

});

  return(
    <View style={styles.container}>
<Abertas refresh={refresh} />
<Modal
       animationType="fade"
       transparent={true}
       visible={modalVisible}
       onRequestClose={() => {
        //  Alert.alert("Modal has been closed."); 
         setModalVisible(!modalVisible)
       }}>
         <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Adicionar</Text>
              {/* add aqui as coisas pra adicionar o cliente // style**** */}
              <TextInput
        style={styles.input}
        onChangeText={setNovoCliente}
        placeholder="Nome/Mesa do Cliente"
      />
      {/* esse text input aqui tem que ser uma lista dos produtos q eu dei get quando cliquei o botao do modal,
       mas por enquanto vai ser um input, e vai da merda no banco se não tiver esse produto lá */}
      <TextInput
        style={styles.input}
        placeholder="Listinha de produtos"
        onChangeText={setProduto}
      />
      <TextInput
        style={styles.input}
        placeholder="Qntd"
        type='numeric'
        keyboardType="numeric"
        onChangeText={setQuantidade}
      />
              <TouchableOpacity
                style={styles.adicionar}
                onPress={() => {
                  adicionarNovoCliente()}}
              >
                <Text style={styles.textStyle}>adicionar</Text>
              </TouchableOpacity>
              
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                //  console.log('pressed')
               setModalVisible(!modalVisible)}}
              >
                <Text style={styles.textStyle}>voltar</Text>
              </Pressable>
            </View>
          </View>
      </Modal>

<TouchableOpacity style={styles.addButton} onPress={addClientePopUp}>
        <Text style={styles.buttonText}>+</Text>
      </TouchableOpacity>
    </View>
  )
}


function Home() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Abertas" component={TabAbertas}
      />
      <Tab.Screen name="Configurações" component={Configuracao}  />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
     <NavigationContainer>
    {/* <Home></Home> */}
    
       <Stack.Navigator>
         <Stack.Screen
           name="Login"
           component={LoginScreen}
           options={{ headerShown: false }}
         />
         <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
       
         </Stack.Navigator>
     </NavigationContainer>
  );
}





