import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export interface AboutSeniorPastorsI
  extends Model<
    InferAttributes<AboutSeniorPastorsI>,
    InferCreationAttributes<AboutSeniorPastorsI>
  > {
  id: CreationOptional<string>;
  name: string;
  des: string;
  facebook: string;
  instagram: string;
  x: string;
  photo: string;
  youtube: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function AboutSeniorPastorsModel(sequelize: Sequelize) {
  return sequelize.define<AboutSeniorPastorsI>("front_about_senior", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.TEXT("long"),
    },
    des: {
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
