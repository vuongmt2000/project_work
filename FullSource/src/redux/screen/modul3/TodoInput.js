import React, {useState} from 'react';
import {TouchableOpacity, View, Text, TextInput} from 'react-native';
export default function TodoInput(props) {
  const [text, setText] = useState(null);

  // Render
  return (
    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
      <TextInput
        style={{
          flex: 1,
          height: 40,
          borderColor: '#212121',
          borderWidth: 1,
          borderRadius: 8,
        }}
        onChangeText={text => setText(text)}
        value={text}
        placeholder={props.contentItem || 'Todo....'}
        placeholderTextColor="gray"
        multiline={true}
      />
      <TouchableOpacity
        style={{
          marginLeft: 8,
          padding: 8,
          backgroundColor: '#b50000',
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 8,
        }}
        onPress={() => {
          props.onPress(text);
          setText(null);
        }}>
        <Text style={{color: 'white'}}>Add</Text>
      </TouchableOpacity>
    </View>
  );
}
