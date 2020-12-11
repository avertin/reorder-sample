import React, {useState} from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { AutoDragSortableView } from 'react-native-drag-sort'
import { range } from 'lodash'; 

export default function App() {
  const [content, setContent] = useState(range(0, 4).map(x => ({ id: x })));
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

  const handleDragEnd = (fromIndex, toIndex) => {
    // update the content order 
    console.log('handleDragEnd - fromIndex', fromIndex);
    console.log('handleDragEnd - toIndex', toIndex);
    let updatedContent = [...content];
    updatedContent.splice(toIndex, 0, updatedContent.splice(fromIndex, 1)[0]);
    console.log('handleDragEnd - updatedContent', updatedContent);
    setContent(updatedContent)
  }

  const handleDataChange = (data) => {
    console.log('handleDataChange - data', data);
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
        onDragEnd={handleDragEnd}
        onDataChange={handleDataChange}
      />
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
