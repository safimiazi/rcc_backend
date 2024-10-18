import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export interface EventUserI
  extends Model<
    InferAttributes<EventUserI>,
    InferCreationAttributes<EventUserI>
  > {
  id: CreationOptional<string>;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  payment_status: "pending" | "paid" | "failed";
  payment_id?: string;
  event_id?: ForeignKey<string>;
  createdAt?: Date;
  updatedAt?: Date;
}

export function EventUserModel(sequelize: Sequelize) {
  return sequelize.define<EventUserI>("event_user", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payment_status: {
      type: DataTypes.ENUM("pending", "paid", "failed"),
      allowNull: false,
      defaultValue: "pending",
    },
    payment_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  });
}
