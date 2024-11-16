import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export interface AboutCoverI
  extends Model<
    InferAttributes<AboutCoverI>,
    InferCreationAttributes<AboutCoverI>
  > {
  id: CreationOptional<string>;
  our_senior_pastors: string;
  ministerial_team: string;
  our_values: string;
  contact_us: string;

  createdAt?: Date;
  updatedAt?: Date;
}

export function AboutCoverModel(sequelize: Sequelize) {
  return sequelize.define<AboutCoverI>("front_about_cover", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    our_senior_pastors: {
      type: DataTypes.STRING,
    },
    ministerial_team: {
      type: DataTypes.STRING,
    },
    our_values: {
      type: DataTypes.STRING,
    },
    contact_us: {
      type: DataTypes.STRING,
    },
  });
}
