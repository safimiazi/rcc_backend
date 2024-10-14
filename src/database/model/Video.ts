import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";

export interface VideoI
  extends Model<InferAttributes<VideoI>, InferCreationAttributes<VideoI>> {
  id: CreationOptional<string>;
  video_title: string;
  video_url: string;
  video_date: Date;
  video_category: string;
  status: "active" | "Deactivate";
  createdAt?: Date;
  updatedAt?: Date;
}

export function VideoModel(sequelize: Sequelize) {
  return sequelize.define<VideoI>("video", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    video_title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    video_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    video_category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("active", "Deactivate"),
      allowNull: false,
      defaultValue: "active",
    },
  });
}
