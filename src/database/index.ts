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
import { AboutPageModel } from "./model/front_end/About";
import { AboutSeniorPastorsModel } from "./model/front_end/AboutSeniorPastors";
import { AboutMinisterialModel } from "./model/front_end/AboutMinisterial";
import { AboutCoverModel } from "./model/front_end/AboutCover";
import { ChildrenMinistryModel } from "./model/front_end/ministry/children_ministry";
import { BuilderMinistryModel } from "./model/front_end/ministry/builder_ministry";
import { ValourMinistryModel } from "./model/front_end/ministry/Valour_ministry";
import { ValourC_MinistryModel } from "./model/front_end/ministry/Valour_c_ministry";
import { become_a_new_believersModel } from "./model/front_end/get_involved/become_a_new_believers";
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
const AboutPage = AboutPageModel(sequelize);
const AboutSeniorPastors = AboutSeniorPastorsModel(sequelize);
const AboutMinisterial = AboutMinisterialModel(sequelize);
const AboutCover = AboutCoverModel(sequelize);
const ChildrenMinistry = ChildrenMinistryModel(sequelize);
const BuilderMinistry = BuilderMinistryModel(sequelize);
const ValourMinistry = ValourMinistryModel(sequelize);
const ValourC_Ministry = ValourC_MinistryModel(sequelize);
const become_a_new_believers = become_a_new_believersModel(sequelize);

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

// relation with ValourMinistry <  ValourC_Ministry

ValourMinistry.hasMany(ValourC_Ministry, {
  foreignKey: "valour_id",
});

ValourC_Ministry.belongsTo(ValourMinistry, {
  foreignKey: "valour_id",
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
  AboutPage,
  AboutSeniorPastors,
  AboutMinisterial,
  AboutCover,
  ChildrenMinistry,
  BuilderMinistry,
  ValourC_Ministry,
  ValourMinistry,
  become_a_new_believers,
} as const;
