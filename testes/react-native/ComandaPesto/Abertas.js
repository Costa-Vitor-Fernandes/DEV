import React, { useState, useEffect } from 'react';
import {
 StyleSheet,
 Text,
 View,
 TextInput,
 Image,
 Dimensions,
 TouchableOpacity,
 Button,
 TouchableWithoutFeedback,
 Keyboard, FlatList, Modal, Pressable, ProgressViewIOSComponent, Touchable
} from 'react-native';
import axios from 'axios';
 
const numColumns = 3;

export default function Abertas (props){
    const [eachCliente,setEachCliente] = useState("")
    const [modalVisible,setModalVisible]=useState(false)
    const [cliente,setCliente] = useState('')
    const [id,setId] = useState('')
    const [nomeproduto,setNomeProduto]=useState("")
    const [quantidade,setQuantidade]=useState('')
    const [preco,setPreco] = useState("")
    const [novoProduto,setNovoProduto] = useState("")
   


    //useEffect on getClientes()
    // componentDidMount() {
    //     this.getClientes()
        
    //     }
    useEffect(()=>{
            getClientes()
    },[props.refresh])

const getClientes = ()=>{
        axios.get("http://192.168.0.17:3001/todosClientesAbertos", {
        }).then((res) => {
          const obj = []
            const arrClientes = res.data
            arrClientes.forEach((e, i, arrClientes)=>{
              obj.push({key : arrClientes[i]})
            })
    setEachCliente(obj)
});
}

const getComandaCliente =(cliente)=>{
    console.log('getComandacliente')
  
    axios.get("http://192.168.0.17:3001/comandaCliente", {
        params: {
        cliente: cliente,
        // token: token,
      },  
  
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
    }).then((res) => {
      const obj = []
      res.data.id.forEach((e,i, res)=>{
        obj.push(res[i])
      })
      console.log(obj)
      setId(obj)
      setNomeProduto(res.data.nomeproduto)
      setPreco(res.data.preco)
      setQuantidade(res.data.quantidade)
  })
  }
const  popUpComanda = (cliente) =>{
    getComandaCliente(cliente)
    const token = '' 
    setModalVisible(!modalVisible)
      axios.get('http://192.168.0.17:3001/comandaCliente', {
        // body da req deve conter nome do cliente: nome e token: "TOKEN"
        params: {
          cliente: cliente,
          token: token,
        },  
    
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
            })
            .then(function (response) {
              // console.warn(response.data);
              }).catch(error => console.log(error));

            setCliente(cliente)
}
const formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    
  
    return data;
  };

  

    
 const renderItem = ({ item, index }) => {
    
    // console.log('log item',item)

    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
      <View style={styles.viewdaflatlist} >

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
              <Text style={styles.modalText}>Conta de {cliente}</Text>
              {/* add aqui as coisas da conta que puxar do cliente */}
              <View style={{backgroundColor:'#ccc', flexDirection:"row", textAlign:'center'}}>

              <Text style={styles.linhaDaComanda}>id </Text>
              <Text style={styles.linhaDaComanda}>nome </Text>
              <Text style={styles.linhaDaComanda}>preco </Text>
              <Text style={styles.linhaDaComanda}>quantidade </Text>
              </View>
              <View style={{backgroundColor:'#056252', flexDirection:'row', textAlign:"center"}}>

              <Text style={styles.linhaDaComanda}>{id} </Text>
              <Text style={styles.linhaDaComanda}>{nomeproduto} </Text>
              <Text style={styles.linhaDaComanda}>{preco} </Text>
              <View style={{flexDirection:'row', justifyContent:'space-between',  width: Dimensions.get('window').width /5,
      margin: 1,}}>
                <Button title='-'></Button>
              <Text >{quantidade} </Text>
              <Button title='+'></Button>
              </View>
              </View>
              <View style={{flex:1, flexDirection:'row', width:'100%', textAlign: 'center', }}>
              <TextInput onChangeText={setNovoProduto} placeholder='adicionar um produto' value={novoProduto} style={{backgroundColor:"#eee", width:"100%", paddingLeft:10}}></TextInput>
              <Button title="+" />
              </View>
              {/* add aqui as coisas da conta que puxar do cliente */}
              
              
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                //  console.log('pressed')
                setModalVisible(!modalVisible)  
                }}
              >
                <Text style={styles.textStyle}>voltar</Text>
              </Pressable>
              <TouchableOpacity><Text>Adicionar produto</Text></TouchableOpacity>
              <TouchableOpacity><Text>Pagar</Text></TouchableOpacity>
              <Text>Total R$</Text>
            </View>
          </View>
      </Modal>
        <Pressable
           style={styles.item}
           onPress={()=>
            popUpComanda(item.key)
          }
           >
            
        <Text style={styles.itemText}>{item.key}</Text>
          
      </Pressable>
          </View>
    );
  };


 return(
    <FlatList

    data={formatData(eachCliente, numColumns)}
    style={styles.flatListContainer}
    renderItem={renderItem}
    numColumns={numColumns}
    extraData={[modalVisible, preco,nomeproduto,id,quantidade, novoProduto ]}
    />
 )   
}
  
const styles = StyleSheet.create({
    flatListContainer: {
      flex: 1,
      marginTop: 5,
      marginHorizontal:5,
      
    },
    item: {
      backgroundColor: '#4B7C6F',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      margin: 2,
      height: Dimensions.get('window').width/numColumns,
      borderRadius:20, 
    },
    itemInvisible: {
      backgroundColor: 'transparent',
    },
    itemText: {
      color: '#fff',
    },
    viewdaflatlist:{
      height: Dimensions.get('window').width/numColumns,
      width: Dimensions.get('window').width/3 - 5,
      
      
    },
    modalContainer:{
      height: Dimensions.get('window').height-300,
      backgroundColor: '#999',
  
    },
    /*
    exemplo
    */
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
      shadowColor: "#555",
      shadowOffset: {
        width: 0,
        height: 1
      },
      shadowOpacity: 0.45,
      shadowRadius: 2,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      marginTop:10,
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
    idList:{
      backgroundColor:"#777"
    },
    linhaDaComanda:{
      width: Dimensions.get('window').width /5,
      margin: 1,
    }
  
  });
  
