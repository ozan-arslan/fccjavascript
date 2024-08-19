const statusDiv = document.getElementById("change-due");
const button = document.getElementById("purchase-btn");
const input = document.getElementById("cash");
const cidCash = document.getElementById("cash-drawer-display");
const pElements = Array.from(cidCash.getElementsByTagName("p"));

const decimalRounder = (num) => {
  const factor = Math.pow(10, 2);
  return Math.round(num * factor) / factor;
};

let price = 0;
let cid = [
  ["PENNY", 101],
  ["NICKEL", 205],
  ["DIME", 310],
  ["QUARTER", 425],
  ["ONE", 9000],
  ["FIVE", 5500],
  ["TEN", 2000],
  ["TWENTY", 6000],
  ["ONE HUNDRED", 10000],
];

let cCash;
const monValues = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
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
      } else {
        changeDue -= monQuantity[i] * monValues[i];
        monQuantity[i] = 0;
      }
    }
  }
  cid.forEach((el, i) => {
    return (el[1] = decimalRounder((monQuantity[i] * monValues[i]) / 100));
  });
};

const htmlUpdate = () => {
  pElements.forEach((el, i, arr) => {
    arr[i].textContent = arr[i].textContent.split("$")[0] + `$${cid[i][1]}`;
  });
};

const activateBtn = () => {
  cCash = Number(input.value);
  calculate(decimalRounder(100 * (cCash - price)));
  htmlUpdate();
};

const isBtnPressed = (e) => {
  if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
    activateBtn();
    e.preventDefault();
  }
};

button.addEventListener("click", isBtnPressed);
document.addEventListener("keydown", isBtnPressed);
