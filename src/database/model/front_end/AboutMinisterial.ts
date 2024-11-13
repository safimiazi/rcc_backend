import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export interface AboutMinisterialI
  extends Model<
    InferAttributes<AboutMinisterialI>,
    InferCreationAttributes<AboutMinisterialI>
  > {
  id: CreationOptional<string>;
  name: string;
  designation: string;
  facebook: string;
  instagram: string;
  x: string;
  photo: string;
  youtube: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function AboutMinisterialModel(sequelize: Sequelize) {
  return sequelize.define<AboutMinisterialI>("front_ministerial", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.TEXT("long"),
    },
    designation: {
      type: DataTypes.TEXT("long"),
    },
    facebook: {
      type: DataTypes.STRING,
    },
    instagram: {
      type: DataTypes.STRING,
    },
    x: {
      type: DataTypes.STRING,
    },
    youtube: {
      type: DataTypes.STRING,
    },
    photo: {
      type: DataTypes.STRING,
    },
  });
}
