import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
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

export default class TesteAbertas extends React.Component {
  constructor(props){
    super(props);
    this.state={
        eachCliente : "",
    }
     this.getClientes = this.getClientes.bind(this);
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


      return (
        
        <FlatList
        data={this.formatData(this.state.eachCliente, numColumns)}
        style={styles.flatListContainer}
        renderItem={this.renderItem}
        numColumns={numColumns}
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

});