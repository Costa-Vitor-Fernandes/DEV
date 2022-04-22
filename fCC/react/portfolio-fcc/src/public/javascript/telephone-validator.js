function telephoneCheck(str) {
    // s is a manual state switch
    let s = 0
    //acc is acumulating '-' cuz if it gets 3 its wrong i guess
    //thats one of the rule case 
    let acc = 0
    let arr = [...str]
    
    for (let i in arr){
    if (arr[i] == "(" ){
       for (let j in arr){
            if (arr[j] == ')' && j-i == 4){
            s = 1
          }}
        if (s!=1) return false
    }
    // one more time cuz we have to check both occurrencies
    if (arr[i] == ")" ){
       for (let j in arr){
            if (arr[j] == '('){
            s = 1
       }}
        if (s!=1) return false
        }
    
       //other cases  
      if(arr[i] == "?" || arr[i]== "!" || arr[0] == '-') return false
      //acc rule
      if(arr[i] == "-") acc++
    }
      if (acc == 3) return false
    
    //i guess this is pretty self explanatory
    let onlynums = arr
    .map((x)=> x.match(/[0-9]/g))
    .filter((x)=> x !=null)
    console.log(onlynums)
    if (onlynums[0] != 1 && onlynums.length == 10) return true
    if (onlynums[0] == 1 && onlynums.length == 11) return true
    return false
    }
    
    console.log(telephoneCheck("(6054756961)"))