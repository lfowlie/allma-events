interface User {
  userId: string;
  name: string;
}

interface Service {
  serviceId: string;
  name: string;
}

interface Alert {
  alertId: string;
  name: string;
  status: AlertStatus;
  responder: User;
  service: Service;
  triggeredOn: Date;
  acknowledgedOn?: Date;
  resolvedOn?: Date;  
}

enum AlertStatus {
  Triggered = "TRIGGERED",
  Acknowledged = "ACKNOWLEDGED",
  Resolved = "RESOLVED",
}

interface Event {
  type: EventType;
  alert: Alert;
}

enum EventType {
  AlertCreated = "ALERT_CREATED",
  AlertChanged = "ALERT_CHANGED",
}

export { User, Service, Alert, AlertStatus, Event, EventType };
