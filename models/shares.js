import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database.js';  // Import the Sequelize instance
import MonthlyPayments  from './monthlyPayments.js';

class Shares extends Model {
  static associate(models) {
    Shares.belongsTo(models.Shareholder, { foreignKey: 'shareholder_id' });
  }
}

Shares.init(
  {
    total_amount: DataTypes.DECIMAL,
    duration: DataTypes.INTEGER,
    installment_type: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    due_amount: DataTypes.DECIMAL,
    paid_amount: DataTypes.DECIMAL,
    shareholder_id: DataTypes.INTEGER
  },
  {
    sequelize,
    modelName: 'Shares',
  }
);
Shares.hasMany(MonthlyPayments, { foreignKey: 'share_id' });

export default Shares;
