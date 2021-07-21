// Setting up moment-timezone
import moment from "moment-timezone";
moment.locale("en");
moment.tz.setDefault("Europe/Istanbul");

// Starting client
import client from "./client";
client.login(client.config.token);