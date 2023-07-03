'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

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


const displayMovements=function(movements){
  containerMovements.innerHTML='';
  for(let i=0;i<movements.length;i++){
    const type=movements[i]>0?'deposit':'withdrawal';
    const html=`
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i+1} ${type}</div>
      <div class="movements__value">${movements[i]}€</div>
    </div>
    `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  }
}

const calcDisplayBalance=function(movements){
  const balance=movements.reduce((acc,cur)=>acc+cur);
  labelBalance.textContent=`${balance} EUR`;
};

// calcDisplayBalance(account1.movements);

// displayMovements(account1.movements);

const calcDisplaySummary=function(accounts){
  const incomes=accounts.movements.filter(mov=>mov>0).reduce((acc,cur)=>{
    return acc+cur;
  })
  labelSumIn.textContent=`${incomes} €`;
  const expenses=accounts.movements.filter(mov=>mov<0).reduce((acc,cur)=>{
    return acc+cur;
  })
  labelSumOut.textContent=`${Math.abs(expenses)} €`;
  const interest=accounts.movements.filter(mov=>mov>0)
  .map(deposits=>(deposits*accounts.interestRate)/100)
  .filter((i,arr)=>i>1)
  .reduce((acc,cur)=>{
    return acc+cur;
  });
  labelSumInterest.textContent=`${interest} €`;
}
// calcDisplaySummary(account1.movements)

const createUserNames=function(acc){
  for(let i=0;i<acc.length;i++){
    const userinitial=acc[i].owner.toLowerCase().split(' ').map(i=>i.charAt(0)).join("");
    acc[i].username=userinitial;
  }
  return acc;
}
createUserNames(accounts);


//Event handler
btnLogin.addEventListener('click',function(e){
  //prevent form from submitting(form reloads default behaviour)
  e.preventDefault();
  const currentAccount=accounts.find(acc=>
    acc.username===inputLoginUsername.value
  )
  //optional chaining to check if current account exist and prevent error in console
  if(currentAccount?.pin===Number(inputLoginPin.value)){
    //Display UI and welcome message
    labelWelcome.textContent=`Welcome back, ${currentAccount.owner.split(' ')[0]}`;
    containerApp.style.opacity=100;
    
    //clear input fields
    inputLoginUsername.value="";
    inputLoginPin.value="";
    inputLoginPin.blur();

    //display balance
    calcDisplayBalance(currentAccount.movements);

    //display movements
    displayMovements(currentAccount.movements);

    //display summary
    calcDisplaySummary(currentAccount);

  }
})


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
  ['INR', 'Indian Rupees']
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

const eruToUsd=1.1;

const movementsUSD=movements.map(mov=>mov*eruToUsd);
// console.log(movementsUSD);

const movementsDescriptions=movements.map(
  (mov,i)=>
    `Movement ${i+1}: You ${mov>0? 'deposited':'withdrew'} ${Math.abs(mov)}`
);
// console.log(movementsDescriptions);
 
const deposits=movements.filter(mov=>mov>0);
const withdrawals=movements.filter(mov=>mov<0);
// console.log(deposits,withdrawals);

const balance=movements.reduce(function(acc,cur){
  return acc+cur;
});
// console.log(balance);

const max=movements.reduce((acc,mov)=>{
  if(acc>mov) return acc;
  else return mov;
})
// console.log(max);



