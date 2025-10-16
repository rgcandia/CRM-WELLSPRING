const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('formulario', {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false, // el email es obligatorio
      validate: {
        isEmail: true, // valida que sea un correo válido
      },
    },
    data: {
      type: DataTypes.JSONB, // JSONB es más eficiente en Postgres
      allowNull: false,
    },
    read: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // inicialmente no leído
    },
    scheduled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // inicialmente sin encuentro programado
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
    timestamps: true, // agrega createdAt y updatedAt automáticamente
    tableName: 'formularios', // nombre de la tabla en la DB
  });
};
