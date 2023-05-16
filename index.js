var Account = /** @class */ (function () {
    function Account(name, accountNumber, pin) {
        this.balance = 1000;
        this.name = name;
        this.accountNumber = accountNumber;
        this.pin = pin;
    }
    Object.defineProperty(Account.prototype, "getAccountNumber", {
        get: function () {
            return this.accountNumber;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "setAccountNumber", {
        set: function (result) {
            this.accountNumber = result;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "getName", {
        get: function () {
            return this.name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "setName", {
        set: function (name) {
            this.name = name;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "getPin", {
        get: function () {
            return this.pin;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "getBalance", {
        get: function () {
            return this.balance;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Account.prototype, "setBalance", {
        set: function (balance) {
            this.balance = balance;
        },
        enumerable: false,
        configurable: true
    });
    Account.prototype.checkPin = function (pin) {
        if (this.pin === pin) {
            return true;
        }
    };
    return Account;
}());
var BankingSystem = /** @class */ (function () {
    function BankingSystem(accounts) {
        this.accounts = accounts;
    }
    Object.defineProperty(BankingSystem.prototype, "AccountList", {
        get: function () {
            return this.accounts;
        },
        enumerable: false,
        configurable: true
    });
    BankingSystem.prototype.deposit = function (accountNumber, amount, pin) {
        var matchingAccounts = this.accounts.filter(function (account) { return account.getAccountNumber === accountNumber; });
        if (matchingAccounts.length > 0) {
            var account = matchingAccounts[0];
            if (account.checkPin(pin)) {
                var newBalance = account.getBalance + amount;
                account.setBalance = newBalance;
                console.log("Successful transaction");
            }
            else {
                console.log("Error: incorrect PIN.");
            }
        }
        else {
            console.log("Error: account does not exist.");
        }
    };
    BankingSystem.prototype.withdraw = function (accountNumber, amount, pin) {
        var matchingAccounts = this.accounts.filter(function (account) { return account.getAccountNumber === accountNumber; });
        if (matchingAccounts.length > 0) {
            var account = matchingAccounts[0];
            if (account.checkPin(pin)) {
                var currentBalance = account.getBalance;
                if (amount <= currentBalance) {
                    var newBalance = currentBalance - amount;
                    account.setBalance = newBalance;
                    console.log("Successful transaction");
                }
                else {
                    console.log("Error: insufficient balance.");
                }
            }
            else {
                console.log("Error: incorrect PIN.");
            }
        }
        else {
            console.log("Error: account does not exist.");
        }
    };
    BankingSystem.prototype.getBalance = function (accountNumber) {
        var matchingAccounts = this.accounts.filter(function (account) { return account.getAccountNumber === accountNumber; });
        if (matchingAccounts.length > 0) {
            var account = matchingAccounts[0];
            var balance = account.getBalance;
            console.log("Balance for account ".concat(accountNumber, ": ").concat(balance));
        }
        else {
            console.log("Error: account does not exist.");
        }
    };
    BankingSystem.prototype.transfer = function (sourceAccountNumber, targetAccountNumber, amount, pin) {
        var sourceMatchingAccounts = this.accounts.filter(function (account) { return account.getAccountNumber === sourceAccountNumber; });
        var targetMatchingAccounts = this.accounts.filter(function (account) { return account.getAccountNumber === targetAccountNumber; });
        if (sourceMatchingAccounts.length > 0 && targetMatchingAccounts.length > 0) {
            var sourceAccount = sourceMatchingAccounts[0];
            var targetAccount = targetMatchingAccounts[0];
            if (sourceAccount.checkPin(pin)) {
                var sourceBalance = sourceAccount.getBalance;
                if (amount <= sourceBalance) {
                    var targetNewBalance = targetAccount.getBalance + amount;
                    targetAccount.setBalance = targetNewBalance;
                    var sourceNewBalance = sourceBalance - amount;
                    sourceAccount.setBalance = sourceNewBalance;
                    console.log("Successful transaction");
                }
                else {
                    console.log("Error: insufficient balance.");
                }
            }
            else {
                console.log("Error: incorrect PIN.");
            }
        }
        else {
            console.log("Error: one or both accounts do not exist.");
        }
    };
    BankingSystem.BankName = "Nithub Bank";
    return BankingSystem;
}());
var account1 = new Account("Jack", 2121427797, 1234);
var account2 = new Account("Bower", 190805505, 1234);
var account3 = new Account("Black", 303030303, 1234);
// const newArr = [account1, account2, account3, account4];
// console.log(newArr);
var bank = new BankingSystem([account1, account2, account3]);
var showAccount = document.getElementById("showAccounts"); // table body
var numberOfAccounts = document.getElementById("num-accounts");
numberOfAccounts.innerHTML = bank.AccountList.length.toString();
function renderAccounts() {
    bank.AccountList.forEach(function (acc) {
        // create an element 
        var accountData = document.createElement('tr');
        accountData.innerHTML = "\n      <td>".concat(acc.getName, "</td>\n      <td>").concat(acc.getAccountNumber, "</td>\n    ");
        showAccount.append(accountData);
    });
}
renderAccounts();
var createName = document.getElementById("create-name");
var createAccountNo = document.getElementById("create-accountNo");
var createPin = document.getElementById("create-pin");
var createBtn = document.querySelector(".form-btn");
var successMessage = document.getElementById("successMessage");
createBtn.addEventListener("click", function () {
    if (createName.value && createAccountNo.value && createPin.value) {
        var userAccount = new Account(createName.value, parseInt(createAccountNo.value), parseInt(createPin === null || createPin === void 0 ? void 0 : createPin.value));
        bank.AccountList.push(userAccount);
        var div = "\n      <tr>\n        <td>".concat(userAccount.getName, "</td>\n        <td>").concat(userAccount.getAccountNumber, "</td>\n      </tr>\n    ");
        showAccount.innerHTML += (div);
        successMessage.innerText = "Succesful";
    }
});
// deposit
var depositAccount = document.getElementById("depositAcc");
var depositAmount = document.getElementById("depositAmnt");
var depositPin = document.getElementById("accPin");
var depositButton = document.getElementById("depositBtn");
var successMessageD = document.getElementById("successMessageD");
depositButton.addEventListener("click", function () {
    if (depositAccount && depositAmount && depositPin) {
        var accountNumber = parseInt(depositAccount.value);
        var amount = parseInt(depositAmount.value);
        var pin = parseInt(depositPin.value);
        bank.deposit(accountNumber, amount, pin);
        bank.getBalance(accountNumber);
        successMessageD.innerText = "Succesful";
    }
});
//withdraw
var withdrawAccount = document.getElementById("withdrawAcc");
var withdrawAmount = document.getElementById("withdrawAmnt");
var withdrawPin = document.getElementById("withdrawPin");
var withdrawButton = document.getElementById("withdrawBtn");
var successMessageW = document.getElementById("successMessageW");
withdrawButton.addEventListener("click", function () {
    if (withdrawAccount && withdrawAmount && withdrawPin) {
        var accountNumber = parseInt(withdrawAccount.value);
        var amount = parseInt(withdrawAmount.value);
        var pin = parseInt(withdrawPin.value);
        bank.withdraw(accountNumber, amount, pin);
        bank.getBalance(accountNumber);
        successMessageW.innerText = "Succesful";
    }
});
//transfer
var senderAccount = document.getElementById("senderAcc");
var receiverAccount = document.getElementById("receiverAcc");
var transferAmount = document.getElementById("transferAmnt");
var transferPin = document.getElementById("transferPin");
var transferButton = document.getElementById("transferBtn");
var successMessageT = document.getElementById("successMessageT");
transferButton.addEventListener("click", function () {
    if (senderAccount && receiverAccount && transferAmount && transferPin) {
        var sourceAccount = parseInt(senderAccount.value);
        var targetAccount = parseInt(receiverAccount.value);
        var amount = parseInt(transferAmount.value);
        var pin = parseInt(transferPin.value);
        bank.transfer(sourceAccount, targetAccount, amount, pin);
        bank.getBalance(sourceAccount);
        bank.getBalance(targetAccount);
        setTimeout(function (h) {
            successMessageT.innerText = "Succesful";
        }, 1000);
        successMessageT.innerText = "";
    }
});
