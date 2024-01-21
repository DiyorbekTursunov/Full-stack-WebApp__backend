import { DataTypes, Model } from "sequelize";
import sequelize from "../config/db_config.js";
import ProductModels from "../model/product.model.js";

class CategoryModels extends Model {}

CategoryModels.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    category_image: DataTypes.STRING,
  },
  {
    sequelize,
    tableName: "category",
    underscored: true,
  }
);

CategoryModels.hasMany(ProductModels, { foreignKey: "categoryId" });
ProductModels.belongsTo(CategoryModels);

export default CategoryModels;
