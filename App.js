import React, {useState} from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { AutoDragSortableView } from 'react-native-drag-sort'
import { range } from 'lodash'; 

export default function App() {
  const originalContent = range(0, 4).map(x => ({ id: x }));
  const [content, setContent] = useState(originalContent);
  const parentWidth = Dimensions.get('window').width;
  const childrenWidth = (parentWidth / 2) - 50;
  const childrenHeight = childrenWidth;
  
  const renderItem = (item, index) => {
    return ( 
      <View style={[{ height: childrenHeight, width: childrenWidth }, styles.item]}>
        <Text style={{ fontSize: 40 }}>{item.id}</Text>
      </View>
    );
  }

  const handleDataChange = (data) => {
    console.log('handleDataChange - data', data);
  }

  const handlePress = (data) => {
    console.log('handlePress');
    setContent([...originalContent])
  }

  return (
    <View style={styles.container}>
      <AutoDragSortableView
        dataSource={content}
        parentWidth={parentWidth}
        childrenWidth= {childrenWidth}
        childrenHeight={childrenHeight}
        keyExtractor={(item,index)=> item.id}
        renderItem={renderItem}
        onDataChange={handleDataChange}
      />
      <TouchableOpacity onPress={handlePress}> 
        <Text>{'Undo'}</Text> 
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 50
  },
  item: {
    backgroundColor: 'grey', 
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'white',
    borderWidth: 3
  }
});
