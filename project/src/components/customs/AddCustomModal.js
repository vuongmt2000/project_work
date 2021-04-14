import React, {useState} from 'react';
import Modal from 'react-native-modal'
import {View, Text} from 'react-native'
function AddCustomModal(props) {
    console.log(props)
    const [isVisible, setIsVisible] = useState(false)
    function open(){
        setIsVisible(true);
    }
    return (
       <Modal isOpen = {isVisible}>
           <View style={{flex: 1, backgroundColor:"white"}}>
          <Text>I am the modal content!</Text>
        </View>
       </Modal>
    );
}

export default AddCustomModal;