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
    const [qntdAntesDaMudanca, setQntdAntesDaMudanca]= useState('')
    const [idOndeMudou, setIdOndeMudou] = useState([])
   

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

  const setQntd = (q,id)=>{
    if (!idOndeMudou.includes(id)){
      setIdOndeMudou(idOndeMudou.concat(id))
    }
    setQntdAntesDaMudanca(quantidade)
    setQuantidade(q)
  }
  
const aplicarMudanca = () =>{
  // console.log(qntdAntesDaMudanca, 'antes')
console.log(quantidade, 'qnt atual')
console.log(id)
console.log(idOndeMudou, 'idondeMudou')
// axios.post pra dar update onde mudou no banco nesses ids. tem que desmembrar provavelmente, com indexOf ids e idOndeMudou

// terminou de aplicar a mudanca fecha o modal
setModalVisible(!modalVisible)  
}
    
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
              
              {/* View do header */}
              <View style={{backgroundColor:'#000', flexDirection:"row", textAlign:'center', marginBottom:1, height:50, alignItems:'center'}}>

              <Text style={styles.linhaDaComandaHeader}>ID </Text>
              <Text style={styles.linhaDaComandaHeader}>NOME </Text>
              <Text style={styles.linhaDaComandaHeader}>PREÇO </Text>
              <Text style={styles.linhaDaComandaHeader}>QNTD </Text>
              </View>
              {/* View do resultado \/ */}

              <ListaResultadoComanda nome={nomeproduto} preco={preco} quantidade={quantidade} id={id} setQntd={setQntd} />


{/* 
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
              </View> */}
               {/* View do resultado /\ */}


              {/* botao de adicionar */}
              <View style={{flex:1, flexDirection:'row', width:'100%', textAlign: 'center', }}>
              <TextInput onChangeText={setNovoProduto} placeholder='adicionar um produto' value={novoProduto} style={{backgroundColor:"#eee", width:"100%", paddingLeft:10}}></TextInput>
              <Button title="+" />
              </View>
              {/* add aqui as coisas da conta que puxar do cliente */}
              
              
              
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                //  console.log('pressed')
                setCliente('')
                setIdOndeMudou([])
                setQuantidade("")
                setPreco('')
                setModalVisible(!modalVisible)  
                }}
              >
                <Text style={styles.textStyle}>voltar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={aplicarMudanca}>
                <Text>Aplicar Mudanças</Text>
              </TouchableOpacity>
              
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
    linhaDaComandaHeader:{
      width: Dimensions.get('window').width /5,
      margin: 1,
      textAlign:'center',
      color:"white"
    },
    linhaDaComanda:{
      width: Dimensions.get('window').width /5,
      margin: 1,
      textAlign:'center'
    },
    linhaDaComanda2:{
      width: Dimensions.get('window').width /5,
      margin: 1,
      textAlign:'center'
      
    }
  
  });
  
function ListaResultadoComanda (props) {
  

const plusButton = (i)=>{
  const arrId = props.id[i]
  const arrQntd = [...props.quantidade]
  const result = props.quantidade[i]+1
  arrQntd.splice(i,1,result)
  console.log(arrQntd, 'arr qntd', props.quantidade, 'props quantidade', arrId, 'arrids')
  props.setQntd(arrQntd, arrId)
}
const minusButton=(i)=>{

  const arrQntd = [...props.quantidade]
  const result = props.quantidade[i]-1
  if (result === 0) return 
  arrQntd.splice(i,1,result)
  console.log(arrQntd, 'arr qntd', props.quantidade, 'props quantidade')
  props.setQntd(arrQntd)
}



  if(props.id.length>1){
    const linha = []
    // console.log(props.quantidade, 'props quantidade')
    for (let i =0; i<props.id.length;i++){
      // adicionar key pra cada
      
      if(i%2 === 0){
        const obj = []
        obj.push(<Text  style={styles.linhaDaComanda}>{props.id[i]}</Text>)
        obj.push(<Text  style={styles.linhaDaComanda}>{props.nome[i]}</Text>)
        obj.push(<Text  style={styles.linhaDaComanda}>{props.preco[i]}</Text>)
        obj.push(<Button onPress={()=>minusButton(i)} title='-'></Button>)
        obj.push(<Text  style={styles.linhaDaComanda}>{props.quantidade[i]}</Text>)
        obj.push(<Button onPress={()=>plusButton(i)} title='+'></Button>)
        linha.push(<View style={{flexDirection:'row', backgroundColor:'#056252'}}>{obj}</View>)
      }
      if(i%2 !== 0){
        const obj = []
        obj.push(<Text  style={styles.linhaDaComanda2}>{props.id[i]}</Text>)
        obj.push(<Text  style={styles.linhaDaComanda2}>{props.nome[i]}</Text>)
        obj.push(<Text  style={styles.linhaDaComanda2}>{props.preco[i]}</Text>)
        obj.push(<Button onPress={()=>minusButton(i)} title='-'></Button>)
        obj.push(<Text  style={styles.linhaDaComanda2}>{props.quantidade[i]}</Text>)
        obj.push(<Button onPress={()=>plusButton(i)} title='+'></Button>)
        linha.push(<View style={{flexDirection:'row', backgroundColor:'#ddd' }}>{obj}</View>)
      }
    }
    
    return <View style={{flexDirection:'column'}}>{linha}</View>
  }
return(
  <View style={{backgroundColor:'#056252', flexDirection:'row', textAlign:"center"}}>
  <Text style={styles.linhaDaComanda}>{props.id} </Text>
  <Text style={styles.linhaDaComanda}>{props.nome} </Text>
  <Text style={styles.linhaDaComanda}>{props.preco} </Text>
  <View style={{flexDirection:'row', justifyContent:'space-between',  width: Dimensions.get('window').width /5,
margin: 1,}}>
    <Button title='-'></Button>
  <Text >{props.quantidade} </Text>
  <Button title='+'></Button>
  </View>
  </View>
)
}