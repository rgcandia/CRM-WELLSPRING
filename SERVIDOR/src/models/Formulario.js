const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('formulario', {
    // El id sigue siendo el email, único
    id: {
      type: DataTypes.STRING,
      allowNull: false, // El email es obligatorio
      validate: {
        isEmail: true, // Valida que sea un correo válido
      },
    },
    // Agregamos el id numérico auto-incremental
    id_numerico: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false, // Este campo no puede ser nulo
      autoIncrement: true, // Hace que el id numérico se incremente automáticamente
      unique: true, // Asegura que sea único
    },
    data: {
      type: DataTypes.JSONB, // JSONB es más eficiente en Postgres
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Inicialmente no leído
    },
    scheduled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Inicialmente sin encuentro programado
    },
    scheduleDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  }, {
    timestamps: true, // Agrega createdAt y updatedAt automáticamente
    tableName: 'formularios', // Nombre de la tabla en la DB
  });
};
