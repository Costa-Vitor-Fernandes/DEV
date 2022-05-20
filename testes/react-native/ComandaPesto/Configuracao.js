import {View, Text,Button, StyleSheet, TouchableOpacity, Dimensions,Modal,TextInput} from 'react-native'
import { useState } from 'react'
export default function Configuracao (){

  const [exportModal,setExportModal]= useState(false)
  const [addProdutosModal,setAddProdutosModal]= useState(false)
  const [alterPreco, setAlterPreco]= useState(false)
  const [deleteProdutoModal,setDeleteProdutotModal]= useState(false)
  const [novoLoginModal,setNovoLoginModal]= useState(false)
  const [todosPedidosModal,setTodosPedidosModal]= useState(false)


  const styles = StyleSheet.create({
    mainContainer:{
      flex:1,
    },
    basicButton:{
      height:Dimensions.get('window').height/20,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#009dff',
      margin:10,
    },
    textButton:{
      color:'#fff'
    },
    
  })

  const addProdutos =(a) =>{
    
    setAddProdutosModal(a)
  }
    return(
      <View style={styles.mainContainer}>
        <Text>
          Configurações Configurações Configurações 
        </Text>
        <TouchableOpacity style={styles.basicButton}>
          <Text style={styles.textButton}>Encerrar Aba Fechadas(Exportar p/ Excel)"</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.basicButton} onPress={()=>setAddProdutosModal(true)}>
          <Text style={styles.textButton}>Adicionar Produtos</Text></TouchableOpacity>
          

          <TouchableOpacity style={styles.basicButton}>
          <Text style={styles.textButton}>Alterar Preço"</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.basicButton}>
          <Text style={styles.textButton}>Excluir Produtos"</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.basicButton}>
          <Text style={styles.textButton}>Cadastrar novo Login"</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.basicButton}>
          <Text style={styles.textButton}>Todos Pedidos Abertos e Fechados / id"</Text>
          </TouchableOpacity>
          {addProdutos? <AddProductModal state={addProdutosModal} setState={addProdutos} /> : null}

      </View>
    )


  }








  function AddProductModal (props) {

    const [aplicarColor,setAplicarColor]=useState("#ddd")
    const [produto, setProduto] =useState('')
    const [preco, setPreco] = useState('')

    const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      backgroundColor:'green',
      justifyContent: "center",
      alignItems: "center",
      marginTop: Dimensions.get('window').height*0.5,
      
    },
    modalView: {
      alignSelf:'center',
      width:Dimensions.get('screen').width*0.8,
      height:Dimensions.get('screen').height*0.77,
      marginTop:Dimensions.get('screen').height*0.05,
      backgroundColor: "green",
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
    aplicar:{
      color:'#fff',
      elevation: 5,backgroundColor: aplicarColor, borderRadius:50, height:40, justifyContent:'center', padding:5
    },
    voltar:{
      elevation: 5,backgroundColor: '#009dff', borderRadius:50, height:40, justifyContent:'center', padding:5
    },
    textWhite:{
      color:'#fff'
    }
  })
const fechar = () =>{
  props.setState(!props.state)
}
    if(props.state){
      

      return (
      <View style={styles.centeredView}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={props.state}
        onRequestClose={() => {
          //  Alert.alert("Modal has been closed."); 
          
          props.setState(!props.state)
          
        }}>
     <View style={styles.modalView}>
       <View style={{flexDirection:"row"}}>

       <TextInput  autoCapitalize={'none'} 
                  placeholder='adicione um produto' 
                  onChangeText={setProduto} 
                  value={produto} 
                  style={{backgroundColor:"#eee", width:"80%", paddingLeft:10,height:30, marginRight:10,}}/>
       <TextInput autoCapitalize={'none'} 
                  placeholder='preco' 
                  onChangeText={setPreco} 
                  value={preco} 
                  style={{backgroundColor:"#eee", width:"30%", paddingLeft:10,height:30}} />
        </View>
       

         <View style={{ backgroundColor:'orange',width:Dimensions.get('screen').width*0.8, marginBottom:10, marginTop:18,flexDirection:'row', justifyContent:'space-around'}}>
           <TouchableOpacity
           style={styles.voltar}
           onPress={fechar
          }
          >
           <Text style={styles.textWhite}>Voltar</Text>
           {/* add aqui opções de preparo pra exportar - ARQUIVAR */}
         </TouchableOpacity>
         <TouchableOpacity
           style={styles.aplicar}
           onPress={fechar
          }
          >
           <Text style={styles.textStyle}>Aplicar</Text>
           {/* add aqui opções de preparo pra exportar - ARQUIVAR */}
         </TouchableOpacity>

         </View> 
     </View>
     
 </Modal>
 </View>)
  }
  return(<View></View>)
}