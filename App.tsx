import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './src/reducers';
import AppNavigator from './src/navigation/AppNavigator';
import { AppRegistry } from 'react-native'; // Importa AppRegistry

const store = createStore(rootReducer);

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

// Registra el componente principal de la aplicación con AppRegistry
AppRegistry.registerComponent('ToDoApp', () => App);

export default App;
