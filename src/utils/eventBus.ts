import { createEventBus, createUseEventBus } from "@kambing86/event-bus-ts";

// or just const
export const EventType = {
  CLOSE_SIDE_BAR: "closeSideBar",
} as const;

// define the payload data for Event
export type EventDataMapping = {
  [EventType.CLOSE_SIDE_BAR]: undefined;
};

export const eventBus = createEventBus<EventDataMapping>();

export const useEventBus = createUseEventBus<EventDataMapping>(eventBus);
