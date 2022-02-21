'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Utkarsh Gupta',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2022-01-16T17:01:17.194Z',
    '2022-01-13T23:36:17.929Z',
    '2022-01-15T10:51:36.790Z',
  ],
  currency: 'INR',
  locale: 'en-IN', // de-DE
};

const account2 = {
  owner: 'Dhruv gupta',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const account3 = {
  owner: 'Shoumik verma',
  movements: [3000, 400, -1950, -790, -3210, -1400, 8500, -930],
  interestRate: 1.5,
  pin: 3333,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const account4 = {
  owner: 'Shoumik verma',
  movements: [400, 700, -1750, -790, -3210, -1100, 8508, -930],
  interestRate: 1.5,
  pin: 4444,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2020-06-25T18:49:59.371Z',
    '2020-07-26T12:01:20.894Z',
  ],
  currency: 'INR',
  locale: 'en-IN',
};

const accounts = [account1, account2, account3, account4];

/////////////////////////////////////////////////

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//FUNCTIONS

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);

  if (daysPassed === 0) return 'today';
  if (daysPassed === 1) return 'yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  // const day = `${date.getDate()}`.padStart(2, 0);
  // const year = date.getFullYear();
  // const month = `${date.getMonth() + 1}`.padStart(2, 0);
  // return `${day}/${month}/${year}`;
  return new Intl.DateTimeFormat(locale).format(date);
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach((mov, i) => {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);
    const formattedMov = formatCur(mov, account.locale, account.currency);

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
          <div class="movements__value">${formattedMov}</div>
        </div>`;
    // const div = document.createElement('div');
    // div.innerHTML = html;
    // containerMovements.appendChild(div);
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
// displayMovements(account1.movements);

const createUserNames = function (accs) {
  accs.forEach(function (el) {
    el.username = el.owner
      .toLowerCase()
      .split(' ')
      .map(el => el[0])
      .join('');
  });
};
createUserNames(accounts);
// console.log(accounts);

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);

  labelBalance.textContent = formatCur(
    account.balance,
    account.locale,
    account.currency
  );
};

// calcDisplayBalance(account1.movements);

const calcDisplaySummary = function (account) {
  const income = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(income, account.locale, account.currency);

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(
    Math.abs(out),
    account.locale,
    account.currency
  );

  const interest = account.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * account.interestRate) / 100)
    .filter(mov => mov >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = formatCur(
    interest,
    account.locale,
    account.currency
  );
};
// calcDisplaySummary(account1.movements);
const updateUI = function (acc) {
  //DISPLAY MOVEMENTS OF CURRENT ACCOUNT
  displayMovements(acc);

  //DISPLAY BALANCE OF CURRENT ACCOUNT
  calcDisplayBalance(acc);

  //DISPLAY SUMMARY OF CURRENT ACCOUNT
  calcDisplaySummary(acc);
};

const startLogoutTimer = function () {
  let time = 600;
  const tick = function () {
    const minutes = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${minutes}:${seconds}`;

    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = 'Log in to get started';
      containerApp.style.opacity = 0;
    }

    time--;
  };
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

//EVENT HANDLER
let currentAccount;
let timerVariable;

//FAKE LOGGED IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    // const now = new Date();
    // const date = `${now.getDate()}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const mins = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${date}/${month}/${year}, ${hour}:${mins}`;
    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      year: 'numeric',
      month: 'numeric',
    };
    // const locale = navigator.language;
    // console.log(locale);

    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    inputLoginPin.value = inputLoginUsername.value = '';
    inputLoginPin.blur(); // to remove cursor after logging in

    if (timerVariable) clearInterval(timerVariable);
    timerVariable = startLogoutTimer();
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferTo.value = inputTransferAmount.value = '';
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc.username !== currentAccount.username
  ) {
    //DOING THE TRANSFER
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //ADD TRANSFER DATE
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    //UPDATE UI
    updateUI(currentAccount);

    //CLEAR TIMER
    clearInterval(timerVariable);
    timerVariable = startLogoutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Math.floor(inputLoanAmount.value);
  setTimeout(function () {
    if (
      amount > 0 &&
      currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
      //ADD MOVEMENT
      currentAccount.movements.push(amount);

      //ADD LOAN DATE
      currentAccount.movementsDates.push(new Date().toISOString());

      //UPDATE UI
      updateUI(currentAccount);
    }
  }, 2500);

  //CLEAR TIMER
  clearInterval(timerVariable);
  timerVariable = startLogoutTimer();
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();
  const us = inputCloseUsername.value;
  const pin = Number(inputClosePin.value);
  if (us === currentAccount.username && pin == currentAccount.pin) {
    const index = accounts.findIndex(acc => acc.username === us);

    accounts.splice(index, 1);
    containerApp.style.opacity = 0;
  }
});

let sort = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sort);
  sort = !sort;
});

//LECTURES

// console.log(0.1 + 0.2);
// console.log(Number.parseInt('7.6'));
// console.log(Number.parseFloat('7.6'));
// console.log(isNaN(20));
// console.log(isNaN('20'));
// console.log(isNaN(3 / 0));
// console.log(Math.PI);

//DATES
// const now = new Date();
// console.log(now);
// console.log(new Date('july 16 1997'));
// console.log(new Date(1997, 6, 16));
// console.log(new Date(7348924923));

//FUTURE
const future = new Date(2027, 6, 16, 20, 32, 3);
// console.log(+future);

// console.log(future.getFullYear());
// console.log(future.getMonth());
// console.log(future.getDate());
// console.log(future.getDay());
// console.log(future.getHours());
// console.log(future.getMinutes());
// console.log(future.getSeconds());
// console.log(future.getMilliseconds());
// console.log(future.toISOString());
// console.log(future.getTime());
// console.log(new Date(1815750123000));
// console.log(future.setFullYear(2032));
// console.log(Date.now());
// // console.log(new Date());

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
const days1 = calcDaysPassed(new Date(2027, 6, 16), new Date(2027, 6, 26));
// console.log(days1);

const num = 6473323.564;
const options = {
  style: 'currency', //STYLE CAN BE PERCENT,UNIT,CURRENCY, but if we have currency, then we will have to define currency!
  unit: 'celsius',
  currency: 'EUR',
  // useGrouping: false,// it does not add commas or separators
};
console.log('US:', new Intl.NumberFormat('en-IN', options).format(num));
console.log('INDIA:', new Intl.NumberFormat('hi-IN', options).format(num));
console.log('SYRIA:', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);

const ings = ['Spinach', 'Tomato'];
const pizzaTimer = setTimeout(
  (arg1, arg2) => console.log(`Your Pizza is ready with ${arg1} And ${arg2}🍕`),
  2000,
  ...ings
);
console.log('Waiting..');

if (ings.includes('Spinach')) clearTimeout(pizzaTimer);

//CLOCK
// setInterval(function () {
//   const date = new Date();
//   const hour = date.getHours();
//   const mins = date.getMinutes();
//   const secs = date.getSeconds();
//   console.log(`${hour}:${mins}:${secs}`);
// }, 1000);
