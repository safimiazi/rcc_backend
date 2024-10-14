import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export interface SermonsI
  extends Model<InferAttributes<SermonsI>, InferCreationAttributes<SermonsI>> {
  id: CreationOptional<string>;
  sermons_title: string;
  sermons_url: string;
  sermons_date: Date;
  sermons_category: string;
  status: "active" | "Deactivate";
  createdAt?: Date;
  updatedAt?: Date;
}

export function SermonsModel(sequelize: Sequelize) {
  return sequelize.define<SermonsI>("sermons", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    sermons_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sermons_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sermons_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    sermons_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "Deactivate"),
      allowNull: false,
      defaultValue: "active",
    },
  });
}
