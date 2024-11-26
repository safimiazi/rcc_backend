import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  literal,
  Model,
  Sequelize,
} from "sequelize";

export interface BecomeANewBelieversI
  extends Model<
    InferAttributes<BecomeANewBelieversI>,
    InferCreationAttributes<BecomeANewBelieversI>
  > {
  id: CreationOptional<string>;
  cover: string;
  description: string;
  photos: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function become_a_new_believersModel(sequelize: Sequelize) {
  return sequelize.define<BecomeANewBelieversI>(
    "new_believers",
    {
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
      photos: {
        type: DataTypes.JSON,
        get() {
          const json = this.getDataValue("photos");
          if (json) {
            return JSON.parse(json);
          }
          return null;
        },
        set(value) {
          if (!value) {
            value = [];
          }
          this.setDataValue("photos", JSON.stringify(value));
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          include: [[literal("JSON_UNQUOTE(photos)"), "photos"]],
        },
      },
    }
  );
}
