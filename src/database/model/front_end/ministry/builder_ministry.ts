import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  literal,
  Model,
  Sequelize,
} from "sequelize";

export interface BuilderI
  extends Model<InferAttributes<BuilderI>, InferCreationAttributes<BuilderI>> {
  id: CreationOptional<string>;
  description: string;
  photo: string;
  cover: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function BuilderMinistryModel(sequelize: Sequelize) {
  return sequelize.define<BuilderI>("builder_ministry", {
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
    photo: {
      type: DataTypes.STRING,
    },
  });
}
