import { createSlice } from '@reduxjs/toolkit';

// Estado inicial: un array vacío para los formularios
const initialState = {
  formularios: [], // Aquí se almacenarán los formularios
  selectedFormulario: null, // Para almacenar el formulario seleccionado (si es necesario)
};

export const formularioSlice = createSlice({
  name: 'formularios',
  initialState,
  reducers: {
    // Reducer para cargar los formularios desde la base de datos
    uploadFormularios: (state, action) => {
      state.formularios = action.payload; // Cargar el array de formularios
    },

    // Reducer para actualizar el formulario seleccionado (si es necesario)
    selectFormulario: (state, action) => {
      state.selectedFormulario = action.payload;
    },

    // Reducer para agregar un nuevo formulario (opcional)
    addFormulario: (state, action) => {
      state.formularios.push(action.payload); // Agregar un formulario al array
    },
  },
});

// Exportar las acciones
export const { uploadFormularios, selectFormulario, addFormulario } = formularioSlice.actions;

// Exportar el reducer
export default formularioSlice.reducer;
