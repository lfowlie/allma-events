import { AlertStatus, Event, EventType } from "./types";
import { getRandomAlert } from "./data";
import fetch from "cross-fetch";

const TIME_BETWEEN_ALERT_CREATED_MS = 10000;
const TIME_BETWEEN_ALERT_CHANGED_MIN_MS = 10000;
const TIME_BETWEEN_ALERT_CHANGED_MAX_MS = 30000;

// Load .env file into environment variables
require("dotenv").config();

// Load environment variables and exit program if misconfigured
const endpoint = process.env.EVENT_POST_ENDPOINT_URL;
if (!endpoint) {
  console.error(
    "The EVENT_POST_ENDPOINT_URL variable must be set either in the environment or in the .env file in the root of the project directory."
  );
  process.exit(1);
}

const randomBetweenRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Emits an alert event to the HTTP endpoint url specified in configuration.
 * @param alert
 */
const emitEvent = async (event: Event) => {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });
    console.info(`[✅] Event: ${event.type} | AlertId: ${event.alert.alertId} | Status: ${response.status} ${response.statusText}`);
  } catch (err) {
    console.error(`[⛔] Event: ${event.type} | AlertId: ${event.alert.alertId} | ${err.stack || err}`);
  }
};

/**
 * Emit the alert events.
 */
let emittedAlertCount = 0;
setInterval(async () => {
  const alert = getRandomAlert(emittedAlertCount);
  await emitEvent({
    type: EventType.AlertCreated,
    alert,
  });

  setTimeout(async () => {
    alert.status = AlertStatus.Acknowledged;
    alert.acknowledgedOn = new Date();
    await emitEvent({
      type: EventType.AlertChanged,
      alert,
    });
  }, randomBetweenRange(TIME_BETWEEN_ALERT_CHANGED_MIN_MS, TIME_BETWEEN_ALERT_CHANGED_MAX_MS));

  setTimeout(async () => {
    alert.status = AlertStatus.Triggered;
    alert.resolvedOn = new Date();
    await emitEvent({
      type: EventType.AlertChanged,
      alert,
    });
  }, randomBetweenRange(TIME_BETWEEN_ALERT_CHANGED_MIN_MS, TIME_BETWEEN_ALERT_CHANGED_MAX_MS));
}, TIME_BETWEEN_ALERT_CREATED_MS);

console.log(`[🏃] Allma alert event emitter started. Events will begin in ${TIME_BETWEEN_ALERT_CREATED_MS / 1000}s!`);