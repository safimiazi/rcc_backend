import { hash } from "@utility/encryption";
import {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
  literal,
} from "sequelize";

export interface EventI
  extends Model<InferAttributes<EventI>, InferCreationAttributes<EventI>> {
  id: CreationOptional<string>;
  event_name: string;
  event_date: Date;
  start_time: Date;
  end_time: Date;
  language: string;
  category: string;
  event_image: string;
  archive_images: Object;
  entrance: "free" | "paid";
  location: string;
  description: string;
  faqs: Object;
  status: "active" | "Deactivate";
  createdAt?: Date;
  updatedAt?: Date;
}

export function EventModel(sequelize: Sequelize) {
  return sequelize.define<EventI>(
    "event",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      event_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      start_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      end_time: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      language: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      category: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      event_image: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      event_date: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      entrance: {
        type: DataTypes.ENUM("free", "paid"),
        allowNull: false,
      },
      status: {
        type: DataTypes.ENUM("active", "Deactivate"),
        allowNull: false,
        defaultValue: "active",
      },
      location: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT("long"),
        allowNull: false,
      },

      archive_images: {
        type: DataTypes.JSON,
        get() {
          const json: string = this.getDataValue(
            "archive_images"
          ) as unknown as string;
          if (json) {
            return JSON.parse(json);
          }
          return null;
        },
        set(value) {
          if (!value) {
            value = [];
          }
          this.setDataValue("archive_images", JSON.stringify(value));
        },
      },

      faqs: {
        type: DataTypes.JSON,
        get() {
          const json: string = this.getDataValue("faqs") as unknown as string;
          if (json) {
            return JSON.parse(json);
          }
          return null;
        },
        set(value) {
          if (!value) {
            value = [];
          }
          this.setDataValue("faqs", JSON.stringify(value));
        },
        
      },
    },
    {
      defaultScope: {
        attributes: {
          include: [
            [literal("JSON_UNQUOTE(archive_images)"), "archive_images"],
            [literal("JSON_UNQUOTE(faqs)"), "faqs"],
          ],
          exclude: ["password", "session"],
        },
      },
    }
  );
}
