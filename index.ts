
class Account {
  private name: string;
  private accountNumber: number;
  private pin: number;
  private balance: number = 1000;

  constructor(name: string, accountNumber: number, pin: number) {
    this.name = name;
    this.accountNumber = accountNumber;
    this.pin = pin;
  }

  get getAccountNumber() {
    return this.accountNumber;
  }
  set setAccountNumber(result: number) {
    this.accountNumber = result;
  }
  get getName() {
    return this.name;
  }
  set setName(name: string) {
    this.name = name;
  }
  get getPin() {
    return this.pin;
  }
  get getBalance() {
    return this.balance;
  }

  set setBalance(balance: any) {
    this.balance = balance;
  }

  checkPin(pin: number){
    if(this.pin === pin){
      return true
    }
  }

  // deposit(amount: number, pin: number){
  //   if(this.checkPin(pin)){
  //     const newBalance = this.getBalance + amount;
  //     account.setBalance = newBalance;
  //     alert("Succesful transaction")
  //   }
  // }
}

class BankingSystem  {
  static BankName: string = "Nithub Bank";
  private accounts: Account[] ;

  constructor(accounts: Account[]){
    this.accounts = accounts
  }
  get AccountList(){
    return this.accounts
  }
  deposit(accountNumber: number,amount: number, pin: number) {
    const matchingAccounts = this.accounts.filter((account) => account.getAccountNumber === accountNumber);
    if (matchingAccounts.length > 0) {
      const account = matchingAccounts[0];
      if (account.checkPin(pin)) {
        const newBalance = account.getBalance + amount;
        account.setBalance = newBalance;
        console.log("Successful transaction");
      } else {
        console.log("Error: incorrect PIN.");
      }
    } else {
      console.log("Error: account does not exist.");
    }
  }
  
  withdraw(accountNumber: number, amount: number, pin: number ) {
    const matchingAccounts = this.accounts.filter((account) => account.getAccountNumber === accountNumber);
    if (matchingAccounts.length > 0) {
      const account = matchingAccounts[0];
      if (account.checkPin(pin)) {
        const currentBalance = account.getBalance;
        if (amount <= currentBalance) {
          const newBalance = currentBalance - amount;
          account.setBalance = newBalance;
          console.log("Successful transaction");
        } else {
          console.log("Error: insufficient balance.");
        }
      } else {
        console.log("Error: incorrect PIN.");
      }
    } else {
      console.log("Error: account does not exist.");
    }
  }

  getBalance(accountNumber: number) {
    const matchingAccounts = this.accounts.filter((account) => account.getAccountNumber === accountNumber);
    if (matchingAccounts.length > 0) {
      const account = matchingAccounts[0];
      const balance = account.getBalance;
      console.log(`Balance for account ${accountNumber}: ${balance}`);
    } else {
      console.log("Error: account does not exist.");
    }
  }

  transfer(sourceAccountNumber: number, targetAccountNumber: number, amount: number, pin: number ) {
    const sourceMatchingAccounts = this.accounts.filter((account) => account.getAccountNumber === sourceAccountNumber);
    const targetMatchingAccounts = this.accounts.filter((account) => account.getAccountNumber === targetAccountNumber);
    if (sourceMatchingAccounts.length > 0 && targetMatchingAccounts.length > 0) {
      const sourceAccount = sourceMatchingAccounts[0];
      const targetAccount = targetMatchingAccounts[0];
      if (sourceAccount.checkPin(pin)) {
        const sourceBalance = sourceAccount.getBalance;
        if (amount <= sourceBalance) {
          const targetNewBalance = targetAccount.getBalance + amount;
          targetAccount.setBalance = targetNewBalance;
          const sourceNewBalance = sourceBalance - amount;
          sourceAccount.setBalance = sourceNewBalance;
          console.log("Successful transaction");
        } else {
          console.log("Error: insufficient balance.");
        }
      } else {
        console.log("Error: incorrect PIN.");
      }
    } else {
      console.log("Error: one or both accounts do not exist.");
    }
  }
}

const account1 = new Account("Jack", 2121427797, 1234);
const account2 = new Account("Bower", 190805505, 1234);
const account3 = new Account("Black", 303030303, 1234);
const account4 = new Account("Peace", 180805024, 1234)
// const newArr = [account1, account2, account3, account4];
// console.log(newArr);

const bank = new BankingSystem([account1, account2, account3, account4]);

const showAccount = document.getElementById("showAccounts") as HTMLTableElement // table body
const numberOfAccounts = document.getElementById("num-accounts")

numberOfAccounts.innerHTML = bank.AccountList.length.toString()
function renderAccounts(){
  bank.AccountList.forEach(acc => {
    // create an element 
    const accountData = document.createElement('tr')
  
    accountData.innerHTML = `
      <td>${acc.getName}</td>
      <td>${acc.getAccountNumber}</td>
    `
    showAccount.append(accountData)
  })
}
renderAccounts()

const createName = document.getElementById("create-name") as HTMLInputElement
const createAccountNo = document.getElementById("create-accountNo") as HTMLInputElement
const createPin = document.getElementById("create-pin") as HTMLInputElement
const createBtn = document.querySelector(".form-btn") as HTMLButtonElement
const successMessage = document.getElementById("successMessage")

createBtn.addEventListener("click", function(){
  if(createName.value && createAccountNo.value && createPin.value) {
    const userAccount = new Account(createName.value, parseInt(createAccountNo.value), parseInt(createPin?.value))
    
    bank.AccountList.push(userAccount)
    const div = `
      <tr>
        <td>${userAccount.getName}</td>
        <td>${userAccount.getAccountNumber}</td>
      </tr>
    `
    showAccount.innerHTML += (div)
    successMessage.innerText = "Succesful"
  }
})

// deposit
const depositAccount = document.getElementById("depositAcc") as HTMLInputElement
const depositAmount = document.getElementById("depositAmnt") as HTMLInputElement
const depositPin = document.getElementById("accPin") as HTMLInputElement
const depositButton = document.getElementById("depositBtn") as HTMLButtonElement
const successMessageD = document.getElementById("successMessageD")

depositButton.addEventListener("click", ()=>{
  if(depositAccount && depositAmount && depositPin){
    const accountNumber = parseInt(depositAccount.value)
    const amount = parseInt(depositAmount.value)
    const pin = parseInt(depositPin.value)
    bank.deposit(accountNumber, amount, pin)
    bank.getBalance(accountNumber)
    successMessageD.innerText = "Succesful"
  }
})

//withdraw
const withdrawAccount = document.getElementById("withdrawAcc") as HTMLInputElement
const withdrawAmount = document.getElementById("withdrawAmnt") as HTMLInputElement
const withdrawPin = document.getElementById("withdrawPin") as HTMLInputElement
const withdrawButton = document.getElementById("withdrawBtn") as HTMLButtonElement
const successMessageW = document.getElementById("successMessageW")

withdrawButton.addEventListener("click", ()=>{
  if(withdrawAccount && withdrawAmount && withdrawPin){
    const accountNumber = parseInt(withdrawAccount.value)
    const amount = parseInt(withdrawAmount.value)
    const pin = parseInt(withdrawPin.value)
    bank.withdraw(accountNumber, amount, pin)
    bank.getBalance(accountNumber)
    successMessageW.innerText = "Succesful"
  }
})

//transfer
const senderAccount = document.getElementById("senderAcc") as HTMLInputElement
const receiverAccount = document.getElementById("receiverAcc") as HTMLInputElement
const transferAmount = document.getElementById("transferAmnt") as HTMLInputElement
const transferPin = document.getElementById("transferPin") as HTMLInputElement
const transferButton = document.getElementById("transferBtn") as HTMLButtonElement
const successMessageT = document.getElementById("successMessageT")

transferButton.addEventListener("click", ()=>{
  if(senderAccount && receiverAccount && transferAmount && transferPin){
    const sourceAccount = parseInt(senderAccount.value)
    const targetAccount = parseInt(receiverAccount.value)
    const amount = parseInt(transferAmount.value)
    const pin = parseInt(transferPin.value)
    bank.transfer(sourceAccount, targetAccount,amount,pin)
    bank.getBalance(sourceAccount)
    bank.getBalance(targetAccount)
    
    setTimeout((h) => {
      successMessageT.innerText = "Succesful"
    }, 1000)
    successMessageT.innerText = ""
    
  }
})