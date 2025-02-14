const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./userModel'); // Importamos el modelo de usuario

const Resource = sequelize.define(
  'Resource',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    link: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
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
    tableName: 'resources',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);

Resource.belongsTo(User, { foreignKey: 'fk_user_id', as: 'user' });

module.exports = Resource;
