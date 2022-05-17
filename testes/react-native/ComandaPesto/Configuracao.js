import {View, Text,Button} from 'react-native'
export default function Configuracao (){
    return(
      <View>
        <Text>
          Configurações Configurações Configurações
        </Text>
        <Button title="Encerrar o Dia(Exportar p/ Excel)"></Button>
        <Button title="Adicionar Produtos"></Button>
        <Button title="Alterar Preço"></Button>
        <Button title="Excluir Produtos"></Button>
        <Button title="Cadastrar novo Login"></Button>
        <Button title="Todos Pedidos Abertos e Fechados / id"></Button>
      </View>
    )
  }