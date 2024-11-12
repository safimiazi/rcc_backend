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
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    des: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    involved: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    i_new: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    cover: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
}
