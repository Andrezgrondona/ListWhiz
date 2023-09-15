

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { addTask } from '../actions';

const AddTaskScreen = ({ navigation, onAddTask }) => {
  const [taskText, setTaskText] = useState('');

  const handleAddTask = () => {
    if (taskText) {
      onAddTask(taskText);
      setTaskText('');
      navigation.goBack(); //Navega de regreso a la pantalla de lista de tareas
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Nueva Tarea</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe una tarea"
        value={taskText}
        onChangeText={(text) => setTaskText(text)}
      />
      <Button
        title="Agregar Tarea"
        onPress={handleAddTask}
        color="#007AFF" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    fontStyle: 'italic',
  },
});

const mapDispatchToProps = (dispatch) => ({
  onAddTask: (text) => dispatch(addTask(text)),
});

export default connect(null, mapDispatchToProps)(AddTaskScreen);

