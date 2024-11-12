import { ENV } from "@config/env";

import { logger } from "@utility/logger";
import { Sequelize, HasMany, Transaction } from "sequelize";

import { log } from "console";
import { AdminModel } from "./model/Admin";
import { EventModel } from "./model/Event";
import { VideoModel } from "./model/Video";
import { SermonsModel } from "./model/Sermons";
import { EventUserModel } from "./model/EventUser";
import { HomePageModel } from "./model/front_end/Home";
const LogQuery = false;

const sequelize = new Sequelize({
  dialect: "mysql",
  host: ENV.DATABASE_HOST,
  port: ENV.DATABASE_PORT,
  database: ENV.DATABASE_NAME,
  password: ENV.DATABASE_PASSWORD,
  username: ENV.DATABASE_USER,
  // timezone: "+06:00",
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_general_ci",
    underscored: true,
  },
  pool: {
    min: 0,
    max: 5,
  },
  logQueryParameters: ENV.NODE_ENV === "development",
  logging:
    ENV.NODE_ENV === "development" && LogQuery
      ? (query, time) => {
          log("\n ☢ " + time + "ms:" + " " + query);
        }
      : false,
  // logging: false,
  benchmark: true,
});

sequelize.authenticate();
const Admin = AdminModel(sequelize);
const Event = EventModel(sequelize);
const Video = VideoModel(sequelize);
const Sermons = SermonsModel(sequelize);
const EventUser = EventUserModel(sequelize);
// front-end page
const HomePage = HomePageModel(sequelize);

Event.hasMany(EventUser, {
  foreignKey: "event_id",
  as: "event_users",
  onDelete: "CASCADE",
});

EventUser.belongsTo(Event, {
  foreignKey: "event_id",
  as: "event",
  onDelete: "CASCADE",
});

export const db = {
  sequelize,
  Admin,
  Event,
  Video,
  Sermons,
  EventUser,
  // frontend
  HomePage,
} as const;
