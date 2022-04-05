function convertToRoman(num) {
    let romanNums={
      M : 1000,
      CM: 900,
      D: 500,
      CD : 400,
      C: 100,
      XC: 90,
      L: 50,
      XL: 40,
      X:10,
      IX: 9,
      V:5,
      IV:4,
      I:1
    }
    let romanized = ''
    for(let i in romanNums){
    while(num>=romanNums[i]){
      romanized += i
      num -= romanNums[i]
    }
    }
    
     return romanized;
    }
    console.log(convertToRoman(3))
    // convertToRoman(36);