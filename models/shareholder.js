import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';
// Import the Sequelize instance
import Shares from '../models/shares.js'
class Shareholder extends Model { }

Shareholder.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Shareholder',
  },
);
Shareholder.hasMany(Shares, { foreignKey: 'shareholder_id' });
export default Shareholder;
