function checkCashRegister(price, cash, cid) {
    let status= ''
    let changeRes = []
    let changeR = []
    let change = cash - price
    let arr = [...cid]
    arr.reverse()
    let numList = [100,20,10,5,1,0.25,0.1,0.05,0.01]
    let regSum = 0
    
    for (let i in arr){
      let inhand = parseInt(change.toFixed(2) / numList[i])
      if(inhand*numList[i]>=arr[i][1]){
        change = change.toFixed(2) - arr[i][1]
        change.toFixed(2)
        changeRes.push(arr[i])   
      }
      if (inhand*numList[i]<arr[i][1]){
          change = change.toFixed(2) - (inhand*numList[i])
          changeRes.push([arr[i][0],inhand*numList[i]]) 
      }
      //arrSum == sum of all the cash in theregister
      regSum += arr[i][1]
  //end of loop
  }
  //formating the answer to changeR
  
  //sum = all the cash i got in hands to give the change
  let sum = 0
  
  //getting rid of pair like "[name], 0" and summing the in hand change
    for(let i in changeRes){
      if (changeRes[i][1] != 0)changeR.push(changeRes[i]) 
      sum += changeRes[i][1]
    }
  
  // the 3 status cases for the register
    if (sum.toFixed(2) == cash - price) {
      status = "OPEN"
    }
    if(sum.toFixed(2) == regSum.toFixed(2)){
      status = "CLOSED"
      changeR = changeRes.reverse()
    }
    if(sum.toFixed(2) < cash-price){
      status= "INSUFFICIENT_FUNDS"
      changeR = []
    }
  //putting it on a object to return
  let obj = {
        status: status,
        change: changeR
            }
    return obj;
  }
  
  
  checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])