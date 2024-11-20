import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  literal,
  Model,
  Sequelize,
} from "sequelize";

export interface ChildrenMinistryI
  extends Model<
    InferAttributes<ChildrenMinistryI>,
    InferCreationAttributes<ChildrenMinistryI>
  > {
  id: CreationOptional<string>;
  children_ministry: string;
  tots_for_christ: string;
  tots_for_christ_cover: string;
  junior_cover: string;
  junior: string;
  kids: string;
  kids_cover: string;
  teens: string;
  teens_cover: string;
  teenagers: string;
  teenagers_cover: string;
  goals: string;
  cover: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export function ChildrenMinistryModel(sequelize: Sequelize) {
  return sequelize.define<ChildrenMinistryI>(
    "children_ministry",
    {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      children_ministry: {
        type: DataTypes.TEXT("long"),
      },
      tots_for_christ: {
        type: DataTypes.TEXT("long"),
      },
      junior: {
        type: DataTypes.TEXT("long"),
      },
      kids: {
        type: DataTypes.TEXT("long"),
      },
      teens: {
        type: DataTypes.TEXT("long"),
      },
      teenagers: {
        type: DataTypes.TEXT("long"),
      },

      tots_for_christ_cover: {
        type: DataTypes.STRING,
      },
      junior_cover: {
        type: DataTypes.STRING,
      },
      kids_cover: {
        type: DataTypes.STRING,
      },
      teens_cover: {
        type: DataTypes.STRING,
      },
      teenagers_cover: {
        type: DataTypes.STRING,
      },
      cover: {
        type: DataTypes.STRING,
      },
      goals: {
        type: DataTypes.JSON,
        get() {
          const json = this.getDataValue("goals");
          if (json) {
            return JSON.parse(json);
          }
          return null;
        },
        set(value) {
          if (!value) {
            value = [];
          }
          this.setDataValue("goals", JSON.stringify(value));
        },
      },
    },
    {
      defaultScope: {
        attributes: {
          include: [[literal("JSON_UNQUOTE(goals)"), "goals"]],
        },
      },
    }
  );
}
