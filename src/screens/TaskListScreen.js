

import React, { useState } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { toggleTask, deleteTask } from '../actions';
import Icon from 'react-native-vector-icons/FontAwesome';


const TaskListScreen = ({ tasks, navigation, onTaskToggle, onTaskDelete }) => {
  const [completedMessages, setCompletedMessages] = useState({});
  const [taskStatus, setTaskStatus] = useState({}); // Estado local para el estado de las tareas

  const handleTaskToggle = (taskId) => {
    onTaskToggle(taskId);
    //Revisamos que la tarea se ejecuto 
    // console.log('Tareas después de TOGGLE_TASK:', tasks.toJS());

    // Mostrar mensaje de "Tarea terminada" para la tarea completada
    setCompletedMessages((prevMessages) => ({
      ...prevMessages,
      [taskId]: true,
    }));

    // Cambiar el estado del botón '✓' o 'X'
    setTaskStatus((prevStatus) => ({
      ...prevStatus,
      [taskId]: !prevStatus[taskId],
    }));

    // Oculta el mensaje después de unos segundos
    setTimeout(() => {
      setCompletedMessages((prevMessages) => ({
        ...prevMessages,
        [taskId]: false,
      }));
    }, 2000);
  };

  return (
    <View style={styles.container}>
      {tasks.size === 0 && (
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: 'https://i.postimg.cc/kD9BbcMZ/todo-icon.png' }}
            style={styles.image}
          />
        </View>
      )}
      {/* <Text style={styles.title}>Lista de Tareas</Text> */}
      {tasks.size === 0 ? (
        <Text style={styles.noTasks}>No tienes tareas</Text>
      ) : (
        <FlatList
          data={tasks.toJS()}
          renderItem={({ item }) => (
            <View style={styles.taskContainer}>
              <View style={styles.buttonContainer}>
                <Button
                  title={taskStatus[item.id] ? '✓' : '✗'}
                  onPress={() => handleTaskToggle(item.id)}
                  color="orange"
                />
              </View>
              <Text
                style={[
                  styles.taskText,
                  item.completed && styles.completedTask,
                ]}
              >
                {item.text}
              </Text>
              {completedMessages[item.id] && (
                <Text style={styles.completedMessage}>
                  La tarea ha sido completada
                </Text>
              )}
              <Button
                title="Eliminar"
                onPress={() => onTaskDelete(item.id)}
                style={styles.deleteButton}
              />
            </View>
          )}
          keyExtractor={(item) => (item && item.id ? item.id.toString() : '')}
        />
      )}
      <Button
        title="Agregar Tarea"
        onPress={() => navigation.navigate('AddTask')}
        style={styles.addButtonOragnge}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  tasks: state.app.get('tasks'),
});

const mapDispatchToProps = (dispatch) => ({
  onTaskToggle: (taskId) => dispatch(toggleTask(taskId)),
  onTaskDelete: (taskId) => dispatch(deleteTask(taskId)),
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 20,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  buttonContainer: {
    marginRight: 10,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'orange',
  },
  taskContainer: {
    borderColor: 'black',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#e9eaeb',
    padding: 10,
    borderRadius: 5,
    elevation: 2,
  },
  checkbox: {
    marginRight: 10,
  },
  taskText: {
    fontStyle: 'italic',
    fontWeight: 'bold',
    flex: 1,
    fontSize: 16,
  },
  // Tacha el texto si está completado en el completedTask
  completedTask: {
    textDecorationLine: 'line-through',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
  },
  addButtonOragnge: {
    marginTop: 20,
    backgroundColor: 'red',
    color: 'white',
    borderRadius: 5,
  },
  noTasks: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    marginVertical: 20,
  },
  completedMessage: {
    position: 'absolute',
    backgroundColor: 'green',
    color: 'white',
    padding: 5,
    borderRadius: 5,
    textAlign: 'center'
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TaskListScreen);
