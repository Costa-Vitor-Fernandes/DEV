import React, { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import axios from "axios"



const numColumns = 3;
const data = [
  { key: 'Bruno' }
];

// const formatData = (data, numColumns) => {
//   const numberOfFullRows = Math.floor(data.length / numColumns);

//   let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
//   while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
//     data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
//     numberOfElementsLastRow++;
//   }

//   return data;
// };

const popUpComanda = (cliente) =>{
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
    super(props)
    axios.get('http://192.168.0.30:3001/todosClientesAbertos', {
    })
    .then(function (response) {
      const arrClientes = response.data
      console.warn(arrClientes)
      arrClientes.forEach((e, i, arrClientes) =>{
         
        data.push({key : arrClientes[i]})
      });
      })
      .catch(function (error) {
      alert("Nao tem ngm ainda")
      console.error(error)
    })
    this.state = { }



  }

  // componentDidMount() {
  //   axios.get('http://192.168.0.30:3001/todosClientesAbertos', {
  //   })
  //   .then(function (response) {
  //     const arrClientes = response.data
  //     console.warn(arrClientes)
  //     arrClientes.forEach((e, i, arrClientes) =>{
  //       data.push({key : arrClientes[i]})
  //     });
  //     })
  //     .catch(function (error) {
  //     alert("Nao tem ngm ainda")
  //     console.error(error);
  //   })
  // }


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
        data={this.formatData(data, numColumns)}
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