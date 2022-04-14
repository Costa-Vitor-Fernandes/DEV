function rot13(str) {
    // making the alphabets
    //Array(32) cuz there are 6 'invalid' chars in the middle
    const alpha = Array.from(Array(32)).map((e, i) => i + 65);
    //caesars rot Alphabet
    const rotAlpha = alpha
    .map((x) => String.fromCharCode(x+13))
    .filter((x, i) => x.match(/[A-Za-z]/) );
    const rotAlphabet = rotAlpha.map(x=>
     x.toUpperCase()
    )
    // console.log(rotAlphabet)
    
    //original alphabet
    let alphabet = alpha
    .map((x) => String.fromCharCode(x))
    .filter((x, i) => x.match(/[A-Za-z]/) );
    
    //translate the str argument into numbers indexed to my rotAlphabet
    let numRes =[] 
    let resposta = []
      for(let i in str){
        if (rotAlphabet.indexOf(str[i]) == -1)numRes.push(str[i])
        if (rotAlphabet.indexOf(str[i]) != -1)numRes.push(rotAlphabet.indexOf(str[i]))
    }
    console.log(numRes)
    for (let i =0; i<numRes.length;i++){
        if (alphabet[numRes[i]] !== undefined){
        resposta.push(alphabet[numRes[i]])
    }
    if (alphabet[numRes[i]] === undefined) resposta.push(str[i])
    // console.log(resposta)
    }
    
    return resposta.join("")
    }
    rot13("SERR PBQR PNZC!") // FREE CODE CAMP