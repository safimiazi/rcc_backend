import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export interface AboutPageI
  extends Model<
    InferAttributes<AboutPageI>,
    InferCreationAttributes<AboutPageI>
  > {
  id: CreationOptional<string>;
  our_mission: string;
  our_value: string;
  our_roots: string;
  our_roots_pic: string;
  our_mission_pic: string;
  cover: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function AboutPageModel(sequelize: Sequelize) {
  return sequelize.define<AboutPageI>("front_about", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    our_mission: {
      type: DataTypes.TEXT("long"),
    },
    our_value: {
      type: DataTypes.TEXT("long"),
    },
    our_roots: {
      type: DataTypes.TEXT("long"),
    },
    our_roots_pic: {
      type: DataTypes.STRING,
    },
    our_mission_pic: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
  });
}
