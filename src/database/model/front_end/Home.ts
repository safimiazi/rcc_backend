import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export interface HomePageI
  extends Model<
    InferAttributes<HomePageI>,
    InferCreationAttributes<HomePageI>
  > {
  id: CreationOptional<string>;
  titel: string;
  tag: string;
  des: string;
  value: string;
  involved: string;
  i_new: string;
  cover: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function HomePageModel(sequelize: Sequelize) {
  return sequelize.define<HomePageI>("front_home", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    titel: {
      type: DataTypes.STRING,
    },
    tag: {
      type: DataTypes.STRING,
    },
    des: {
      type: DataTypes.STRING,
    },
    value: {
      type: DataTypes.STRING,
    },
    involved: {
      type: DataTypes.STRING,
    },
    i_new: {
      type: DataTypes.STRING,
    },
    cover: {
      type: DataTypes.STRING,
    },
  });
}
