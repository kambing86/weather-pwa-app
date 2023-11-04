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
const ITEM_EXAMPLE = "You can say, for example:\n12.80 Alice, Bob";
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

type State = Readonly<{
  index: number;
  history: Bill[];
  state: "bill" | "update" | "person" | "item" | "serviceTax" | "GST" | "total";
  response: string;
}>;

const initialState: State = {
  index: -1,
  history: getBillHistory(),
  state: "bill",
  response: BILL_NAME_MESSAGE,
};

const billsSlice = createSlice({
  name: "bills",
  initialState,
  reducers: {
    newBill(state) {
      state.state = "bill";
      state.response = BILL_NAME_MESSAGE;
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
      state.state = "person";
      state.response = `OK, we'll name your bill "${name}".\n\n${getParticipantsMsg()}`;
    },
    amendBill(state) {
      state.response = `Ok, let's amend the bill.\n\n${getParticipantsMsg(
        true,
      )}`;
      state.state = "update";
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
      state.response = `${addParticipantsMessage(
        persons,
        trimmed.join(", "),
      )}\n\nLet me know the first bill item amount and who share this bill item.\n${ITEM_EXAMPLE}`;
      state.state = "item";
    },
    updatePersons(state, action: PayloadAction<string>) {
      const persons = action.payload.split(",");
      const index = state.index;
      const currentBill = state.history[index];
      const trimmed = persons.map((n) => n.trim());
      for (const name of trimmed) {
        const found = currentBill.persons.find((p) => p.name === name);
        if (found) throw new Error(`Person ${name} already in the list`);
      }
      currentBill.persons = currentBill.persons.concat(
        trimmed.map((name) => ({
          name: name,
          price: 0,
        })),
      );
      state.response = `${addParticipantsMessage(
        persons,
        trimmed.join(", "),
      )}\n\n${NEXT_ITEM_MESSAGE}\n${ITEM_EXAMPLE}`;
      state.state = "item";
    },
    noUpdatePerson(state) {
      state.response = `Ok, no additional participants.
      
      ${NEXT_ITEM_MESSAGE}`;
      state.state = "item";
    },
    addItem(state, action: PayloadAction<string>) {
      const record = action.payload;
      const firstSpaceIndex = record.indexOf(" ");
      if (firstSpaceIndex === -1) throw new Error(WRONG_INPUT);

      const price = parseFloat(record.slice(0, firstSpaceIndex));
      if (Number.isNaN(price)) throw new Error(WRONG_INPUT);
      const persons = record.slice(firstSpaceIndex + 1).split(",");
      if (persons.length === 0) throw new Error(WRONG_INPUT);

      const index = state.index;
      const currentBill = state.history[index];
      const currentPersons = currentBill.persons;
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

      state.response = `OK, $${price} for ${allNames.join(
        ", ",
      )}.\n\n${NEXT_ITEM_MESSAGE}\n${ITEM_EXAMPLE}`;
    },
    finishItem(state) {
      const index = state.index;
      const currentBill = state.history[index];
      state.response = `Great! Your bill subtotal is $${getSubTotal(
        currentBill,
      ).toFixed(2)}.\n\nHow much is the service charge?`;
      state.state = "serviceTax";
    },
    setServiceTax(state, action: PayloadAction<string>) {
      const index = state.index;
      const currentBill = state.history[index];
      const serviceTax = parseFloat(action.payload);
      if (Number.isNaN(serviceTax)) throw new Error(WRONG_INPUT);
      currentBill.serviceTax = serviceTax;
      state.response = `Ok, the service charge is ${serviceTax}%. This equals to $${getServiceCharge(
        currentBill,
      ).toFixed(2)}.\n\nHow much is the GST?`;
      state.state = "GST";
    },
    setGST(state, action: PayloadAction<string>) {
      const index = state.index;
      const currentBill = state.history[index];
      const gst = parseFloat(action.payload);
      if (Number.isNaN(gst)) throw new Error(WRONG_INPUT);
      currentBill.GST = gst;
      state.response = `Ok, the GST is ${gst}%. This equals to $${getGST(
        currentBill,
      ).toFixed(2)}.\n\n${getFinalResponse(currentBill)}`;
      state.state = "total";
    },
  },
});

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
