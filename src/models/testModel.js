const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Test = sequelize.define(
  'Test',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    low_threshold: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    moderate_threshold: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
    },
    high_threshold: {
      type: DataTypes.INTEGER,
      defaultValue: 20,
    },
  },
  {
    timestamps: false,
    tableName: 'tests',
  }
);

const Question = sequelize.define(
  'Question',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_test_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'tests',
        key: 'id',
      },
    },
    question_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    question_type: {
      type: DataTypes.STRING(50),
      defaultValue: 'single_choice',
    },
  },
  {
    timestamps: false,
    tableName: 'questions',
  }
);

const Answer = sequelize.define(
  'Answer',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_question_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'questions',
        key: 'id',
      },
    },
    answer_text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    timestamps: false,
    tableName: 'answers',
  }
);

const UserTest = sequelize.define(
  'UserTest',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    fk_user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fk_test_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    result: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    completed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    timestamps: false,
    tableName: 'user_tests',
  }
);

// 🔹 **Definir las relaciones correctamente**
Test.hasMany(Question, { foreignKey: 'fk_test_id', sourceKey: 'id' });
Question.belongsTo(Test, { foreignKey: 'fk_test_id', targetKey: 'id' });

Question.hasMany(Answer, { foreignKey: 'fk_question_id', sourceKey: 'id' });
Answer.belongsTo(Question, { foreignKey: 'fk_question_id', targetKey: 'id' });

UserTest.belongsTo(Test, { foreignKey: 'fk_test_id', targetKey: 'id' });
UserTest.belongsTo(Test, { foreignKey: 'fk_user_id', targetKey: 'id' });

module.exports = { Test, Question, Answer, UserTest };
