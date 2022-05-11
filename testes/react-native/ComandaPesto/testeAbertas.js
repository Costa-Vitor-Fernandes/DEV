import React, { useEffect, Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Modal, Pressable } from 'react-native';
import axios from "axios"



const numColumns = 3;


// popUpComanda = (cliente) =>{
// const token = ''
// console.warn(cliente)

//   axios.get('http://192.168.0.30:3001/comandaCliente', {
//     // body da req deve conter nome do cliente: nome e token: "TOKEN"
//     params: {
//       cliente: cliente,
//       token: token,
//     },  

//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json;charset=UTF-8'
//     },
//         })
//         .then(function (response) {
//           console.warn(response.data);
//           }).catch(error => console.log(error));
// }

export default class TesteAbertas extends Component {
  constructor(props){
    super(props);
      this.state={
        eachCliente : "",
        modalVisible: false,
        cliente: "",
        comandaCompleta: "",
      }
    
    this.getClientes = this.getClientes.bind(this);
    }

setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
}
// getfunctionGetClientes = ()=>{
//   return
// }

getClientes(){
        axios.get("http://192.168.0.17:3001/todosClientesAbertos", {
        }).then((res) => {
          const obj = []
            const arrClientes = res.data
            arrClientes.forEach((e, i, arrClientes)=>{
              obj.push({key : arrClientes[i]})
            })
    this.setState({
        eachCliente: obj,
    })
});
      

}
componentDidMount() {
this.getClientes()

}


getComandaCliente(cliente){
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
    console.log(res.data)
    const obj = []
      const comandaClienteCompleta = Object.entries(res.data)
      //Object.keys and Object.Values pode ser interessante
      
      // comandaClienteCompleta.forEach((e, i, comandaClienteCompleta)=>{
      //   obj.push(comandaClienteCompleta[i])
      // })
      this.setState({comandaCompleta: comandaClienteCompleta })
      console.log(this.state.comandaClienteCompleta, 'obj setState')
})
}

  popUpComanda = (cliente) =>{
    // puxar a comanda completa
    //this.getComandaCliente(cliente)
    this.getComandaCliente(cliente)
    // console.log(this.props.logic)
    const token = '' 
    this.setState({
      modalVisible: !this.state.modalVisible
    })
    
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

            this.setState({
              cliente: cliente
            })
}

  formatData = (data, numColumns) => {
    const numberOfFullRows = Math.floor(data.length / numColumns);
  
    let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
    while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    
  
    return data;
  };

  

    
  renderItem = ({ item, index }) => {
    const modalVisible = this.state.modalVisible
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
         this.setState({modalVisible:!modalVisible});
         
       }}>
         <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Conta de {this.state.cliente}</Text>
              {/* add aqui as coisas da conta que puxar do cliente */}
              <Text>{this.state.comandaCompleta} comanda</Text>
              {/* add aqui as coisas da conta que puxar do cliente */}
              
              
              
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => {
                //  console.log('pressed')
                  this.setState({ modalVisible: !modalVisible})}}
              >
                <Text style={styles.textStyle}>voltar</Text>
              </Pressable>
            </View>
          </View>
      </Modal>
        <Pressable
           style={styles.item}
           onPress={()=>
            this.popUpComanda(item.key)
          }
           >
            
        <Text style={styles.itemText}>{item.key}</Text>
          
      </Pressable>
          </View>
    );
  };

  render(    
  ) {
    const { modalVisible } = this.state;   


      return (
       
         
        <FlatList
        data={this.formatData(this.state.eachCliente, numColumns)}
        style={styles.flatListContainer}
        renderItem={this.renderItem}
        numColumns={numColumns}
        extraData={[this.state.modalVisible, this.state.comandaCompleta]}
        />
        
        );
      }
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
    elevation: 2
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
  }

});


class Modalzinhu extends Component {
  state = {
    modalVisible: false
  };

  setModalVisible = (visible) => {
    this.setState({ modalVisible: visible });
  }

  render() {
    const { modalVisible } = this.state;
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            this.setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>conta do vitor</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>voltar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        {/* </View> */}

{/* isso aqui é meu render item de lá */}

        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => this.setModalVisible(true)}
        >
          <Text style={styles.textStyle}>vitor</Text>
        </Pressable>
      </View>
    );
  }
}
