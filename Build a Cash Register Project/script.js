const statusDiv = document.getElementById("change-due");
const button = document.getElementById("purchase-btn");
const input = document.getElementById("cash");
const cidCash = document.getElementById("cash-drawer-display");
const pElements = cidCash.getElementsByTagName("p");
const pArray = Array.from(pElements);

let price = 187;
let cid = [
  ["Pennies: $", 101],
  ["Nickels: $", 205],
  ["Dimes: $", 310],
  ["Quarters: $", 425],
  ["Ones: $", 9000],
  ["Fives: $", 5500],
  ["Tens: $", 2000],
  ["Twenties: $", 6000],
  ["Hundreds: $", 10000],
];

const cashInCid = cid.map((el) => el[1]);
const monValues = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
let totalCashInCid = cashInCid.reduce((acc, currentVal) => {
  return acc + currentVal;
}, 0);
let i;

const recursive = (cashInCid, changeDue) => {
  if (changeDue > 0) {
    if (changeDue >= monValues[i] && cashInCid[i] != 0) {
      cashInCid[i] -= monValues[i];
      changeDue -= monValues[i];
      recursive(cashInCid, changeDue);
    } else {
      i--;
      recursive(cashInCid, changeDue);
    }
  } else {
    return;
  }
};

const calculate = () => {
  let cCash = Number(input.value) * 100;
  let changeDue = cCash - price;
  i = 8;

  recursive(cashInCid, changeDue);
};

const activateBtn = () => {
  calculate();
  pArray.forEach((p, index) => {
    p.textContent = cid[index][0] + cashInCid[index] / 100;
  });
};

const isBtnPressed = (e) => {
  if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
    activateBtn();
    e.preventDefault();
  }
};

button.addEventListener("click", isBtnPressed);
document.addEventListener("keydown", isBtnPressed);
