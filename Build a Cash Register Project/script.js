const statusDiv = document.getElementById("change-due");
const button = document.getElementById("purchase-btn");
const input = document.getElementById("cash");
const cidCash = document.getElementById("cash-drawer-display");
const pElements = Array.from(cidCash.getElementsByTagName("p"));

let price = 1.87;
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
let totalCid;
let change;
const monValues = [1, 5, 10, 25, 100, 500, 1000, 2000, 10000];
const monQuantity = cid.map((el, i) => {
  return Math.ceil(el[1] / monValues[i]);
});

const monChangeQuantities = (value, monQtyArr, monValArr) => {
  let changeDueArr = [];
  let monQtyArrDuplicate = monQtyArr.map((el) => el);
  for (let i = 8; i != -1; i--) {
    if (value >= monValArr[i] && monQtyArrDuplicate[i] != 0) {
      let billsToGive = (value - (value % monValArr[i])) / monValArr[i];
      if (billsToGive <= monQtyArrDuplicate[i]) {
        monQtyArrDuplicate[i] -= billsToGive;
        value -= billsToGive * monValArr[i];
        changeDueArr.unshift(billsToGive);
      } else {
        value -= monQtyArrDuplicate[i] * monValArr[i];
        changeDueArr.unshift(monQtyArrDuplicate[i]);
        monQtyArrDuplicate[i] = 0;
      }
    } else {
      changeDueArr.unshift(0);
    }
  }
  return changeDueArr;
};

const htmlUpdate = () => {
  pElements.forEach((el, i, arr) => {
    arr[i].textContent = arr[i].textContent.split("$")[0] + `$${cid[i][1]}`;
  });
};

const totalCashFunc = () => {
  totalCid = monQuantity
    .map((el, i) => el * monValues[i])
    .reduce((acc, currVal) => {
      return acc + currVal;
    }, 0);
  change = decimalRounder(100 * (cCash - price));
};

const decimalRounder = (num) => {
  const factor = Math.pow(10, 2);
  return Math.round(num * factor) / factor;
};

const statusFunction = () => {
  if (decimalRounder(100 * (cCash - price)) === totalCid) {
    cid.forEach((el, i) => {
      return (el[1] = decimalRounder((monQuantity[i] * monValues[i]) / 100));
    });
    statusDiv.innerHTML = "Status: CLOSED";
  } else {
    let changeQtyArr = monChangeQuantities(
      decimalRounder(100 * (cCash - price)),
      monQuantity,
      monValues
    );

    let changeQtyToNominal = changeQtyArr
      .map((el, i) => el * monValues[i])
      .reduce((acc, currVal) => {
        return acc + currVal;
      }, 0);
    if (totalCid >= change && changeQtyToNominal === change) {
      for (let i = 8; i != -1; i--) {
        monQuantity[i] -= changeQtyArr[i];
      }
      cid.forEach((el, i) => {
        return (el[1] = decimalRounder((monQuantity[i] * monValues[i]) / 100));
      });
      statusDiv.innerHTML = `<p>Status: OPEN</p>`;
      for (i = 8; i != -1; i--) {
        if (changeQtyArr[i] > 0) {
          statusDiv.innerHTML += `<p>${cid[i][0]}: $${decimalRounder(
            (changeQtyArr[i] * monValues[i]) / 100
          )}</p>`;
        }
      }
    } else {
      statusDiv.innerHTML = `<p>Status: INSUFFICIENT_FUNDS</p>`;
    }
  }
};

const activateBtn = () => {
  cCash = Number(input.value);
  totalCashFunc();
  statusFunction();
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
