const statusDiv = document.getElementById("change-due");
const button = document.getElementById("purchase-btn");
const input = document.getElementById("cash");
const cidCash = document.getElementById("cash-drawer-display");
const pElements = cidCash.getElementsByTagName("p");
const pArray = Array.from(pElements);

let price = 0;
let cid = [
  ["PENNY", 1.01],
  ["NICKEL", 2.05],
  ["DIME", 3.1],
  ["QUARTER", 4.25],
  ["ONE", 90],
  ["FIVE", 55],
  ["TEN", 20],
  ["TWENTY", 60],
  ["ONE HUNDRED", 100],
];

let cCash;
const monValues = [0.01, 0.05, 0.1, 0.25, 1, 5, 10, 20, 100];
const monQuantity = cid.map((el, i) => {
  return Math.ceil(el[1] / monValues[i]);
});

const calculate = (changeDue) => {
  for (let i = 8; i != -1 && changeDue > 0; i--) {
    if (changeDue >= monValues[i] && monQuantity[i] != 0) {
      let billsToGive = (changeDue - (changeDue % monValues[i])) / monValues[i];
      if (billsToGive <= monQuantity[i]) {
        monQuantity[i] -= billsToGive;
        changeDue -= billsToGive * monValues[i];
        console.log(billsToGive * monValues[i]);
      } else {
        changeDue -= monQuantity[i] * monValues[i];
        monQuantity[i] = 0;
        console.log(monQuantity[i] * monValues[i]);
      }
    }
    console.log(monQuantity);
    console.log(changeDue);
  }
};

const activateBtn = () => {
  cCash = Number(input.value);
  calculate(cCash - price);
};

const isBtnPressed = (e) => {
  if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
    activateBtn();
    e.preventDefault();
  }
};

button.addEventListener("click", isBtnPressed);
document.addEventListener("keydown", isBtnPressed);
