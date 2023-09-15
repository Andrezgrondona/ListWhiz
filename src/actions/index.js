
// Acción para agregar una nueva tarea
export const addTask = (text) => ({
  type: 'ADD_TASK',
  payload: { text },
});

// Acción para marcar o desmarcar una tarea como completada
export const toggleTask = (taskId) => ({
  type: 'TOGGLE_TASK',
  payload: { taskId },
});

// Acción para eliminar una tarea
export const deleteTask = (taskId) => ({
  type: 'DELETE_TASK',
  payload: { taskId },
});
