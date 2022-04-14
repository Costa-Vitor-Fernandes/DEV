import { useState } from "react"

export default function JavascriptProjects (){

   function Palindrome () {

    const [palindromeInput, setPalindromeInput] = useState("")
    const [checker,setChecker] = useState(true)


    const handleChange = (e) =>{
        console.log(e.target.value)
        setPalindromeInput(e.target.value)
        
    }
    
    const palindromeChecker = () =>{

       
     function palindrome(str) {
     let regex = /[a-zA-Z0-9]/gi
     let matches= str.match(regex)
    
    
    if(matches.reverse().join("").toLowerCase() !== str.match(regex).join("").toLowerCase()) return false
    
    return true
    }
    setChecker(palindrome(palindromeInput))
    
    
    }
    
    return(
        <div>
            Javascript Algorithms and Data Structures
            <div id="palindrome">
                <h1>Is This word a Palindrome?</h1>
                <textarea id="textarea-palindrome-input" placeholder="eye" onChange={handleChange}></textarea>
                <button onClick={palindromeChecker}>Check</button>
                {checker ? "Is Palindrome" : "Is Not Palindrome"}
            </div>
        </div>
    )
}
function CaesarsCypher (){

    const [criptoText,setCriptoText] =  useState("")

    const handleChange = (e) =>{
        
              
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
    let criptography = rot13(e.target.value)
    setCriptoText(criptography)
}


    return (<div>
    <h1>CaesarsCypher : Middle-Age Criptography</h1>
    <h5>WRITE IN UPPER-CASE TO SEE IT</h5>
    <textarea placeholder="FREE CODE CAMP free code camp" onChange={handleChange}></textarea>
    <textarea placeholder="SERR PBQR PNZC free code camp" readOnly={true} value={criptoText}></textarea>
    </div>)
}

function TelephoneValidator () {
    
const [telephone, setTelephone] = useState("")
const [boo, setBoo] = useState(true)
const handleChange =  (e) =>{
setTelephone(e.target.value)
}


const checkPhone = ()=>{

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
        
     setBoo(telephoneCheck(telephone))
     console.log(boo)
}

    return (<div>
        <h1>Enter a VALID US Telephone Number</h1>
        <textarea placeholder="6054756961" onChange={handleChange}></textarea>
        <button onClick={checkPhone}>Check</button>
        {boo ? "yes" : "no"}
    </div>)
}
function RomanNumeral (){

    const [romanNumeral, setRomanNumeral] = useState("")
    const [num,setNum] = useState('')

const handleChange=(e)=>{
setRomanNumeral(e.target.value)

}

const romanNumeralConverter = ()=>{
   
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
  setNum(convertToRoman(romanNumeral))    
}

    return(<div>
        <h1>Roman Numeral Converter</h1>
        <h4>Enter a number</h4>
        <textarea placeholder="36" onChange={handleChange}></textarea>
        <button onClick={romanNumeralConverter}>Convert</button>
        {num}
    </div>)
}
















return (<><Palindrome></Palindrome><CaesarsCypher></CaesarsCypher><RomanNumeral></RomanNumeral><TelephoneValidator></TelephoneValidator></>)
}