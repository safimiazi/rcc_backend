import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  literal,
  Model,
  Sequelize,
} from "sequelize";

export interface ValourI
  extends Model<InferAttributes<ValourI>, InferCreationAttributes<ValourI>> {
  id: CreationOptional<string>;
  description: string;
  cover: string;
  valour_id?: ForeignKey<string>;
  createdAt?: Date;
  updatedAt?: Date;
}

export function ValourC_MinistryModel(sequelize: Sequelize) {
  return sequelize.define<ValourI>("Valour_c_ministry", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.TEXT("long"),
    },
    cover: {
      type: DataTypes.STRING,
    },
  });
}
