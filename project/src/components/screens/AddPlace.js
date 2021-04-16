import React , {useState} from 'react';
import { TouchableOpacity, View, Text, Image, TextInput } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import {useDispatch, useSelector} from 'react-redux'
function AddPlace(props) {
    const [fullName, setFullName] = useState("")
    return (
       <View style ={{flex: 1}}>
           {/* Header */}
            <View style = {{height:60, backgroundColor:'#34a4eb',  alignItems: "center", flexDirection:"row", justifyContent:"center"}}>
                <Text style = {{color: "white", fontSize: 18}}>Thêm đơn hàng</Text>
            </View>

            {/* body */}
            <View style ={{width: "90%", alignSelf :"center"}}>
            <View style={{ width: "90%", alignSelf: "center" , flexDirection :"row",
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "gray",
            marginTop: 10,}}>
        <View style ={{width:"10%", justifyContent:"center",alignItems:"center"}}> 
          <Feather name = "user" color="blue" size={24}/>
        </View>
        <TextInput
        placeholder = "Họ tên"
          value={fullName}
          onChangeText={setFullName}
          style={{
            height: 50,
            width: "100%",
            
          }}
        />
         </View>
            </View>
       </View>
    );
}

export default AddPlace;