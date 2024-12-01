import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  literal,
  Model,
  Sequelize,
} from "sequelize";

export interface becomeAJhsWorkerI
  extends Model<
    InferAttributes<becomeAJhsWorkerI>,
    InferCreationAttributes<becomeAJhsWorkerI>
  > {
  id: CreationOptional<string>;
  cover: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function become_a_jhs_workerModel(sequelize: Sequelize) {
  return sequelize.define<becomeAJhsWorkerI>("become_worker", {
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
