const { DataTypes } = require('sequelize');
const sequelize = require('./index');

const Music = sequelize.define('Music', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  type: {
      type: DataTypes.ENUM(
        'Ordinário',
        'Próprio',
        'Ofício',
        'Sequência',
        'Hino',
        'Antífona',
        'Gradual',
        'Aleluia',
        'Trato',
        'Responsório',
        'Outros'
      ),
      allowNull: false,
    },
  audioUrl: {
    type: DataTypes.STRING,
  },
  sheetUrl: {
    type: DataTypes.STRING,
  },
}, {
    timestamps: true,
  });

module.exports = Music;
