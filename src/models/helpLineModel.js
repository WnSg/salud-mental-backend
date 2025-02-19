const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');
const User = require('./userModel'); // Importamos el modelo de usuario

const HelpLine = sequelize.define(
  'HelpLine',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    tableName: 'help_lines',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

HelpLine.belongsTo(User, { foreignKey: 'fk_user_id', as: 'user' });
module.exports = HelpLine;
