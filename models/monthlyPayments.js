import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js'; 

class MonthlyPayments extends Model {
  static associate(models) {
    MonthlyPayments.belongsTo(models.Shares, { foreignKey: 'shareholder_id' });
  }
}

MonthlyPayments.init(
  {
    due_amount: DataTypes.DECIMAL,
    due_date: DataTypes.DATE,
    balance_amount: DataTypes.DECIMAL,
    share_id: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'MonthlyPayments',
  }
);

export default MonthlyPayments;
