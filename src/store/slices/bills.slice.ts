import { type PayloadAction, createSlice } from "@reduxjs/toolkit";
import Decimal from "decimal.js";

type Person = { name: string; price: number };

type Bill = {
  name: string;
  date: string;
  persons: Person[];
  serviceTax: number;
  GST: number;
};

const BILLS_KEY = "bills";
const WRONG_INPUT = "Wrong input";
const BILL_NAME_MESSAGE = "What do you want to name your bill?";
const NEXT_ITEM_MESSAGE =
  "Let me know the next bill item amount and who share this bill item.";
const ITEM_EXAMPLE =
  "You can say, for example:\n12.80 Alice, Bob\n50 All\n30 except Charlie";
function getParticipantsMsg(update = false) {
  return `Who are the ${
    update ? "additional " : ""
  }participants?\nYou can say, for example:\nAlice, Bob, Charlie`;
}

function getBillHistory() {
  let history: Bill[] = [];
  try {
    const saved = localStorage.getItem(BILLS_KEY);
    if (saved != null) {
      history = JSON.parse(saved) as Bill[];
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
  return history;
}

export enum BillState {
  Init = "init",
  Bill = "bill",
  Update = "update",
  Person = "person",
  Item = "item",
  ServiceTax = "serviceTax",
  GST = "GST",
  Total = "total",
}

type State = Readonly<{
  index: number;
  history: Bill[];
  state: BillState;
  messages: Array<{ msg: string; isUser?: boolean }>;
}>;

const initialState: State = {
  index: -1,
  history: getBillHistory(),
  state: BillState.Bill,
  messages: [{ msg: BILL_NAME_MESSAGE }],
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    addUserMessage(state, action: PayloadAction<string>) {
      state.messages.push({ msg: action.payload, isUser: true });
    },
    newBill(state) {
      state.state = BillState.Bill;
      state.messages.push({ msg: BILL_NAME_MESSAGE });
    },
    addBill(state, action: PayloadAction<string>) {
      const name = action.payload;
      state.history.push({
        name,
        date: new Date().toUTCString(),
        persons: [],
        serviceTax: 0,
        GST: 0,
      });
      state.index = state.history.length - 1;
      state.state = BillState.Person;
      state.messages.push({
        msg: `OK, we'll name your bill "${name}".`,
      });
      state.messages.push({
        msg: getParticipantsMsg(),
      });
    },
    amendBill(state) {
      state.messages.push({
        msg: `Ok, let's amend the bill.`,
      });
      state.messages.push({
        msg: getParticipantsMsg(true),
      });
      state.state = BillState.Update;
    },
    addPersons(state, action: PayloadAction<string>) {
      const persons = action.payload.split(",");
      const uniqueSet = new Set(persons);
      if (persons.length !== uniqueSet.size)
        throw new Error("Cannot have duplicate name");
      const index = state.index;
      const currentBill = state.history[index];
      const trimmed = persons.map((n) => n.trim());
      currentBill.persons = trimmed.map((name) => ({
        name: name,
        price: 0,
      }));
      state.messages.push({
        msg: addParticipantsMessage(persons, trimmed.join(", ")),
      });
      state.messages.push({
        msg: `Let me know the first bill item amount and who share this bill item.\n${ITEM_EXAMPLE}`,
      });
      state.state = BillState.Item;
    },
    updatePersons(state, action: PayloadAction<string>) {
      const persons = action.payload.split(",");
      const index = state.index;
      const currentBill = state.history[index];
      const trimmed = persons.map((n) => n.trim());
      for (const name of trimmed) {
        const found = currentBill.persons.find((p) => p.name === name);
        if (found) throw new Error(`Person "${name}" is already in the list`);
      }
      currentBill.persons = currentBill.persons.concat(
        trimmed.map((name) => ({
          name: name,
          price: 0,
        })),
      );
      state.messages.push({
        msg: addParticipantsMessage(persons, trimmed.join(", ")),
      });
      state.messages.push({ msg: `${NEXT_ITEM_MESSAGE}\n${ITEM_EXAMPLE}` });
      state.state = BillState.Item;
    },
    noUpdatePerson(state) {
      state.messages.push({
        msg: `Ok, no additional participants.`,
      });
      state.messages.push({
        msg: `${NEXT_ITEM_MESSAGE}\n${ITEM_EXAMPLE}`,
      });
      state.state = BillState.Item;
    },
    addItem(state, action: PayloadAction<string>) {
      const record = action.payload;
      const firstSpaceIndex = record.indexOf(" ");
      if (firstSpaceIndex === -1) throw new Error(WRONG_INPUT);

      const price = parseFloat(record.slice(0, firstSpaceIndex));
      if (Number.isNaN(price)) throw new Error(WRONG_INPUT);

      const index = state.index;
      const currentBill = state.history[index];
      const currentPersons = currentBill.persons;

      const personsStr = record
        .slice(firstSpaceIndex + 1)
        .trim()
        .toLowerCase();
      const persons = getPersons(currentPersons, personsStr);
      if (persons.length === 0) throw new Error(WRONG_INPUT);

      const pricePerPerson = price / persons.length;
      const allNames: string[] = [];
      for (const person of persons) {
        const filtered = currentPersons.filter((p) =>
          p.name.toLowerCase().startsWith(person.trim().toLowerCase()),
        );
        if (filtered.length !== 1) {
          throw new Error(WRONG_INPUT);
        }
        const thePerson = currentPersons.find(
          (p) => p.name === filtered[0].name,
        );
        if (thePerson == null) throw new Error(WRONG_INPUT);
        thePerson.price += pricePerPerson;
        allNames.push(thePerson.name);
      }

      state.messages.push({
        msg: `OK, $${price} for ${allNames.join(", ")}.`,
      });
      state.messages.push({
        msg: NEXT_ITEM_MESSAGE,
      });
    },
    finishItem(state) {
      const index = state.index;
      const currentBill = state.history[index];
      state.messages.push({
        msg: `Great! Your bill subtotal is $${getSubTotal(currentBill).toFixed(
          2,
        )}.`,
      });
      state.messages.push({
        msg: `How much is the service charge?`,
      });
      state.state = BillState.ServiceTax;
    },
    setServiceTax(state, action: PayloadAction<string>) {
      const index = state.index;
      const currentBill = state.history[index];
      const serviceTax = parseFloat(action.payload);
      if (Number.isNaN(serviceTax)) throw new Error(WRONG_INPUT);
      currentBill.serviceTax = serviceTax;
      state.messages.push({
        msg: `Ok, the service charge is ${serviceTax}%. This equals to $${getServiceCharge(
          currentBill,
        ).toFixed(2)}.`,
      });
      state.messages.push({
        msg: `How much is the GST?`,
      });
      state.state = BillState.GST;
    },
    setGST(state, action: PayloadAction<string>) {
      const index = state.index;
      const currentBill = state.history[index];
      const gst = parseFloat(action.payload);
      if (Number.isNaN(gst)) throw new Error(WRONG_INPUT);
      currentBill.GST = gst;
      state.messages.push({
        msg: `Ok, the GST is ${gst}%. This equals to $${getGST(
          currentBill,
        ).toFixed(2)}.`,
      });
      state.messages.push({
        msg: getFinalResponse(currentBill),
      });
      state.state = BillState.Total;
    },
  },
});

function getPersons(persons: Person[], personsStr: string) {
  const isAll = personsStr === "all";
  const isExcept =
    personsStr.startsWith("except") || personsStr.startsWith("all except");
  if (isAll) return persons.map((p) => p.name);
  if (isExcept) {
    const exceptPersons = personsStr
      .replace(/^(all\s)?except\s/, "")
      .split(",");
    let names: string[] = persons.map((p) => p.name);
    for (const personToRemove of exceptPersons) {
      const filtered = names.filter((name) =>
        name.toLowerCase().startsWith(personToRemove.trim().toLowerCase()),
      );
      if (filtered.length !== 1) throw new Error(WRONG_INPUT);
      const index = names.findIndex((n) => n === filtered[0]);
      names = names.toSpliced(index, 1);
    }
    return names;
  }
  return personsStr.split(",");
}

function addParticipantsMessage(persons: string[], message: string) {
  return `I have added ${persons.length} participant${
    persons.length > 1 ? "s" : ""
  }: ${message}`;
}

function getSubTotal(bill: Bill) {
  let total = 0;
  bill.persons.forEach((p) => {
    total += p.price;
  });
  return total;
}

function getServiceCharge(bill: Bill) {
  return (getSubTotal(bill) * bill.serviceTax) / 100;
}

function getGST(bill: Bill) {
  const subTotal = getSubTotal(bill);
  const service = getServiceCharge(bill);
  return ((subTotal + service) * bill.GST) / 100;
}

function getFinalResponse(bill: Bill) {
  const totalStr = getTotal(bill).toFixed(2);
  let remainingDecimal = new Decimal(totalStr);
  let returnString = `Here is your bill "${bill.name}":\n\n`;
  bill.persons
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    })
    .forEach((p) => {
      const personCharge = getPersonCharge(bill, p).toFixed(2);
      remainingDecimal = remainingDecimal.minus(new Decimal(personCharge));
      returnString += `${p.name}: $${getPersonCharge(bill, p).toFixed(2)}\n`;
    });
  returnString += `\nRemaining: $${remainingDecimal.toString()}`;
  returnString += `\nTotal: $${totalStr}`;
  return returnString;
}

function getPersonCharge(bill: Bill, person: Person) {
  const serviceTax = (person.price * bill.serviceTax) / 100;
  const GST = ((person.price + serviceTax) * bill.GST) / 100;
  return person.price + serviceTax + GST;
}

function getTotal(bill: Bill) {
  const subTotal = getSubTotal(bill);
  const serviceCharge = getServiceCharge(bill);
  const gst = getGST(bill);
  return subTotal + serviceCharge + gst;
}

export default billsSlice;
