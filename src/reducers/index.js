import { combineReducers } from 'redux';
import { List, Map } from 'immutable';

const initialState = Map({
  tasks: List([]), 
});

const appReducer = (state = initialState, action) => {
  switch (action.type) {

    case 'ADD_TASK':
      // Generar un id único para la nueva tarea
      const newTaskId = Math.random().toString(36).substr(2, 9);

      // Agregar una nueva tarea a la lista con el id único
      return state.update('tasks', (tasks) =>
        tasks.push(Map({ id: newTaskId, text: action.payload.text, completed: false }))
      );

   
    case 'TOGGLE_TASK':
      return state.update('tasks', (tasks) =>
        tasks.map((task) =>
          task.get('id') === action.payload.taskId
            ? task.set('completed', !task.get('completed'))
            : task
        )
      );


    case 'DELETE_TASK':
      // Eliminar una tarea de la lista
      return state.update('tasks', (tasks) =>
        tasks.filter((task) => task.get('id') !== action.payload.taskId)
      );



    default:
      return state;
  }
};

const rootReducer = combineReducers({
  app: appReducer,
});

export default rootReducer;
