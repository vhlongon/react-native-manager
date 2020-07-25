import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
  container: { marginHorizontal: 10, marginVertical: 40 },
  listItemContainer: {
    backgroundColor: '#f2f2f2',
  },
});

const EmployeeList = ({ data }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={({ id }) => id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('EmployeeDetails', { ...item });
            }}
          >
            <ListItem
              title={item.name}
              bottomDivider
              containerStyle={styles.listItemContainer}
              chevron
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default EmployeeList;
