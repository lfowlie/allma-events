import { Alert, AlertStatus, Service, User } from "./types";
import { v4 as uuidv4 } from "uuid";

const users: User[] = [
  {
    userId: uuidv4(),
    name: "Timothy Black",
  },
  {
    userId: uuidv4(),
    name: "Daisy Wilson",
  },
  {
    userId: uuidv4(),
    name: "Shaun Miles",
  },
  {
    userId: uuidv4(),
    name: "Sabrina Long",
  },
];

const services: Service[] = [
    {
        serviceId: uuidv4(),
        name: "Users API"
    },
    {
        serviceId: uuidv4(),
        name: "Payments API"
    },
    {
        serviceId: uuidv4(),
        name: "Events API"
    },
    {
        serviceId: uuidv4(),
        name: "Web App"
    },
]

/**
 * Get a random user from a collection of finite initial data.
 */
const getRandomUser = () => users[Math.floor(Math.random() * users.length)];

/**
 * Get a random service from a collection of finite initial data.
 */
const getRandomService = () => services[Math.floor(Math.random() * services.length)];

/**
 * Get a random dynamically generated alert.
 */
const getRandomAlert = (count: number): Alert => {
    return {
        alertId: uuidv4(),
        responder: getRandomUser(),
        service: getRandomService(),
        status: AlertStatus.Triggered,
        name: `Random alert #${count}`,
        triggeredOn: new Date(),
    }
}

export { getRandomUser, getRandomService, getRandomAlert };
