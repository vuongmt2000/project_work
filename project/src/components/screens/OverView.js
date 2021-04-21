import React from 'react';
import { View, ScrollView, Text } from 'react-native';

function OverView(props) {
    return (
       <ScrollView style ={{ flex: 1}}>
           <View style ={{backgroundColor: "#b50000",height: 220, width:"100%", flex :1, borderBottomLeftRadius:100, justifyContent: "center", alignItems:"center"}}>
            <View style = {{height: 130, width: 300, backgroundColor:"white", borderRadius: 10}}>
                <View style ={{width:"60%"}}>
                    <Text style ={{alignSelf:"center", marginTop:10, fontSize :18, fontWeight: "bold", color: "gray"}}>Doanh thu</Text>
                    <Text style ={{alignSelf:"center"}}>0 Đ</Text>
                </View>
                <View style ={{borderTopWidth: 0.5, borderTopColor: "gray", width: "95%", alignItems:"center",flexDirection: "row",
                justifyContent:"space-between", alignSelf:"center", marginTop:5}}> 
                <View style ={{}}>
                    <Text style ={{alignSelf:"center", marginTop:10}}>Đơn hàng mới</Text>
                    <Text style ={{alignSelf:"center",fontWeight: "bold"}}>0</Text>
                </View>
                <View style ={{}}>
                    <Text style ={{alignSelf:"center", marginTop:10}}>Đơn hủy</Text>
                    <Text style ={{alignSelf:"center",fontWeight: "bold"}}>0</Text>
                </View>
                <View style ={{}}>
                    <Text style ={{alignSelf:"center", marginTop:10}}>Đơn hoàn thành</Text>
                    <Text style ={{alignSelf:"center",fontWeight: "bold"}}>0</Text>
                </View>
                </View>
            </View>
           </View>
       </ScrollView>
    );
}

export default OverView;