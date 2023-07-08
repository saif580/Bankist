'use strict'

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2020-05-27T17:01:17.194Z',
    '2020-07-11T23:36:17.929Z',
    '2020-07-12T10:51:36.790Z'
  ],
  currency: 'EUR',
  locale: 'pt-PT' // de-DE
}

const account2 = {
  owner: 'Jessica Davis',
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
    '2020-07-26T12:01:20.894Z'
  ],
  currency: 'USD',
  locale: 'en-US'
}

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333
}

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444
}

const accounts = [account1, account2, account3, account4]

// Elements
const labelWelcome = document.querySelector('.welcome')
const labelDate = document.querySelector('.date')
const labelBalance = document.querySelector('.balance__value')
const labelSumIn = document.querySelector('.summary__value--in')
const labelSumOut = document.querySelector('.summary__value--out')
const labelSumInterest = document.querySelector('.summary__value--interest')
const labelTimer = document.querySelector('.timer')

const containerApp = document.querySelector('.app')
const containerMovements = document.querySelector('.movements')

const btnLogin = document.querySelector('.login__btn')
const btnTransfer = document.querySelector('.form__btn--transfer')
const btnLoan = document.querySelector('.form__btn--loan')
const btnClose = document.querySelector('.form__btn--close')
const btnSort = document.querySelector('.btn--sort')

const inputLoginUsername = document.querySelector('.login__input--user')
const inputLoginPin = document.querySelector('.login__input--pin')
const inputTransferTo = document.querySelector('.form__input--to')
const inputTransferAmount = document.querySelector('.form__input--amount')
const inputLoanAmount = document.querySelector('.form__input--loan-amount')
const inputCloseUsername = document.querySelector('.form__input--user')
const inputClosePin = document.querySelector('.form__input--pin')

let isToggled = false,
  counter = 0
const displayMovements = function (acc) {
  containerMovements.innerHTML = ''
  let tempMov = acc.movements
  if (isToggled) {
    tempMov = acc.sortMov
  }
  console.log(tempMov)
  for (let i = 0; i < tempMov.length; i++) {
    const type = tempMov[i] > 0 ? 'deposit' : 'withdrawal'
    const date = new Date(acc.movementsDates[i])
    const day = `${date.getDate()}`.padStart(2, 0)
    const month = `${date.getMonth() + 1}`.padStart(2, 0)
    const year = date.getFullYear()
    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
      <div class="movements__date">${day}/${month}/${year}</div>
      <div class="movements__value">${tempMov[i]}€</div>
    </div>
    `
    containerMovements.insertAdjacentHTML('afterbegin', html)
  }
}

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur)
  labelBalance.textContent = `${acc.balance.toFixed(2)} €`
}

// calcDisplayBalance(account1.movements);

// displayMovements(account1.movements);

const calcDisplaySummary = function (accounts) {
  const incomes = accounts.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => {
      return acc + cur
    })
  labelSumIn.textContent = `${incomes.toFixed(2)} €`
  const expenses = accounts.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => {
      return acc + cur
    })
  labelSumOut.textContent = `${Math.abs(expenses).toFixed(2)} €`
  const interest = accounts.movements
    .filter(mov => mov > 0)
    .map(deposits => (deposits * accounts.interestRate) / 100)
    .filter((i, arr) => i > 1)
    .reduce((acc, cur) => {
      return acc + cur
    })
  labelSumInterest.textContent = `${interest.toFixed(2)} €`
}
// calcDisplaySummary(account1.movements)

const createUserNames = function (acc) {
  for (let i = 0; i < acc.length; i++) {
    const userinitial = acc[i].owner
      .toLowerCase()
      .split(' ')
      .map(i => i.charAt(0))
      .join('')
    acc[i].username = userinitial
  }
  return acc
}
createUserNames(accounts)

let currentAccount;
//faking loggin
currentAccount = account1
calcDisplayBalance(currentAccount)
displayMovements(currentAccount)
calcDisplaySummary(currentAccount)
containerApp.style.opacity = 100


const options={
  weekday:'long',
  year:'numeric',
  month:'long',
  day:'numeric'
};
const now=new Date();
const nowDate = new Intl.DateTimeFormat(navigator.language,options).format(now);
console.log(nowDate);
// const day = `${nowDate.getDate()}`.padStart(2, 0)
// const month = `${nowDate.getMonth() + 1}`.padStart(2, 0)
// const year = nowDate.getFullYear()
// const hour = nowDate.getHours()
// const min = nowDate.getMinutes()
// labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`

//Event handler
btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting(form reloads default behaviour)
  e.preventDefault()
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  )
  // console.log(currentAccount);
  //optional chaining to check if current account exist and prevent error in console
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`
    containerApp.style.opacity = 100

    const nowDate = new Date()
    const day = `${nowDate.getDate()}`.padStart(2, 0)
    const month = `${nowDate.getMonth() + 1}`.padStart(2, 0)
    const year = nowDate.getFullYear()
    const hour = nowDate.getHours()
    const min = nowDate.getMinutes()
    labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`

    //clear input fields
    inputLoginUsername.value = ''
    inputLoginPin.value = ''
    inputLoginPin.blur()

    //display balance
    calcDisplayBalance(currentAccount)

    //display movements
    displayMovements(currentAccount)

    //display summary
    calcDisplaySummary(currentAccount)
  }
})

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault()
  const amount = Number(inputTransferAmount.value)
  const transferDate = new Date();
  const transferTo = accounts.find(
    acc => acc.username === inputTransferTo.value
  )
  // console.log(currentAccount);
  if (
    amount >= 0 &&
    amount <= currentAccount.balance &&
    transferTo &&
    transferTo.username !== currentAccount.username
  ) {
    currentAccount.movementsDates.push(transferDate)
    transferTo.movementsDates.push(transferDate)
    currentAccount.movements.push(-amount)
    transferTo.movements.push(amount)
    calcDisplayBalance(currentAccount)
    displayMovements(currentAccount)
    calcDisplaySummary(currentAccount)
    inputTransferAmount.value = ''
    inputTransferTo.value = ''
    inputTransferTo.blur()
  } else {
    console.log('Cannot Transfer the amount')
  }
})

btnLoan.addEventListener('click', function (e) {
  e.preventDefault()
  const inputLoan = Number(inputLoanAmount.value)
  const loanDate=new Date();
  const loanCondition = currentAccount.movements.some(
    arr => arr > 0 && arr >= inputLoan
  )
  if (loanCondition) {
    currentAccount.movementsDates.push(loanDate)
    currentAccount.movements.push(Number(inputLoan))
    calcDisplayBalance(currentAccount)
    displayMovements(currentAccount)
    calcDisplaySummary(currentAccount)
  } else {
    alert('Cannot Santion Loan')
  }
  inputLoanAmount.value = ''
  inputLoanAmount.blur()
})

btnClose.addEventListener('click', function (e) {
  e.preventDefault()

  const closeAccount = accounts.find(
    acc => acc.username === inputCloseUsername.value
  )
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    )
    accounts.splice(index, 1)
    containerApp.style.opacity = 0
  }

  inputCloseUsername.value = inputClosePin.value = ''
})

btnSort.addEventListener('click', function (e) {
  e.preventDefault()
  currentAccount.sortMov = currentAccount.movements
    .slice()
    .sort((a, b) => a - b)
  if (isToggled === true) {
    displayMovements(currentAccount)
    isToggled = false
  } else {
    if (counter === 0) {
      isToggled = true
      displayMovements(currentAccount)
      counter++
      isToggled = false
    } else {
      displayMovements(currentAccount)
      isToggled = true
    }
  }
})

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
  ['INR', 'Indian Rupees']
])

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300]

/////////////////////////////////////////////////

const eruToUsd = 1.1

const movementsUSD = movements.map(mov => mov * eruToUsd)
// console.log(movementsUSD);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
)
// console.log(movementsDescriptions);

const deposits = movements.filter(mov => mov > 0)
const withdrawals = movements.filter(mov => mov < 0)
// console.log(deposits,withdrawals);

const balance = movements.reduce(function (acc, cur) {
  return acc + cur
})
// console.log(balance);

const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc
  else return mov
})
// console.log(max);
