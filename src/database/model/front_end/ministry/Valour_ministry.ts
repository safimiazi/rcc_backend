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
  title: string;
  cover: string;
  type: "men" | "women";
  createdAt?: Date;
  updatedAt?: Date;
}

export function ValourMinistryModel(sequelize: Sequelize) {
  return sequelize.define<ValourI>("Valour_ministry", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    description: {
      type: DataTypes.TEXT("long"),
    },
    title: {
      type: DataTypes.TEXT("long"),
    },
    type: {
      type: DataTypes.ENUM("men", "women"),
    },
    cover: {
      type: DataTypes.STRING,
    },
  });
}
