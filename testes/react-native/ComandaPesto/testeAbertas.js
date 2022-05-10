import React, { useEffect, Component } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity, Modal, Pressable } from 'react-native';
import axios from "axios"



const numColumns = 3;

popUpComanda = (cliente) =>{
const token = ''
console.warn(cliente)

  axios.get('http://192.168.0.30:3001/comandaCliente', {
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
          console.warn(response.data);
          }).catch(error => console.log(error));
}

export default class TesteAbertas extends Component {
  constructor(props){
    super(props);
      this.state={
        eachCliente : "",
        modalVisible: false
      }
    
    this.getClientes = this.getClientes.bind(this);
    }

    setModalVisible = (visible) => {
      this.setState({ modalVisible: visible });
    }

    getClientes(){
        axios.get("http://192.168.0.30:3001/todosClientesAbertos", {
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

  popUpComanda = (cliente) =>{
    const token = ''
    console.warn(cliente)
    
      axios.get('http://192.168.0.30:3001/comandaCliente', {
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
              console.warn(response.data);
              }).catch(error => console.log(error));

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
    // console.log('log item',item)
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    return (
        <TouchableOpacity
           style={styles.item}
           onPress={()=>popUpComanda(item.key)}
        >
            
        <Text style={styles.itemText}>{item.key}</Text>
          
      </TouchableOpacity>
    );
  };

  render(    
  ) {
    const { modalVisible } = this.state;   


      return (
        <View style={styles.viewdaflatlist}>
          <Modalzinhu></Modalzinhu>
         
        <FlatList
        data={this.formatData(this.state.eachCliente, numColumns)}
        style={styles.flatListContainer}
        renderItem={this.renderItem}
        numColumns={numColumns}
        />
        </View>
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
    height: Dimensions.get('window').height-100,
    
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
              <Text style={styles.modalText}>Hello World!</Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => this.setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
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
          <Text style={styles.textStyle}>Show Modal</Text>
        </Pressable>
      </View>
    );
  }
}
