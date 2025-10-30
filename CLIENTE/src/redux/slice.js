import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formularios: [],
  selectedFormulario: null,
};

export const formularioSlice = createSlice({
  name: 'formularios',
  initialState,
  reducers: {
    // Cargar todos los formularios y actualizar selectedFormulario si corresponde
    uploadFormularios: (state, action) => {
      state.formularios = action.payload;

      // Verificar si selectedFormulario sigue presente en los formularios
      if (state.selectedFormulario) {
        const updatedSelected = state.formularios.find(
          (f) => f.id_numerico === state.selectedFormulario.id_numerico
        );
        state.selectedFormulario = updatedSelected || null;
      }
    },

    // Seleccionar un formulario
    selectFormulario: (state, action) => {
      state.selectedFormulario = action.payload;
    },

    // Agregar un nuevo formulario
    addFormulario: (state, action) => {
      state.formularios.push(action.payload);
    },

    // Actualizar un formulario individual y sincronizar selectedFormulario
    updateFormulario: (state, action) => {
      const updatedForm = action.payload;
      const index = state.formularios.findIndex(f => f.id_numerico === updatedForm.id_numerico);

      if (index !== -1) {
        state.formularios[index] = updatedForm;
      }

      if (state.selectedFormulario?.id_numerico === updatedForm.id_numerico) {
        state.selectedFormulario = updatedForm;
      }
    },
  },
});

// Exportar acciones
export const { uploadFormularios, selectFormulario, addFormulario, updateFormulario } = formularioSlice.actions;

// Exportar reducer
export default formularioSlice.reducer;
