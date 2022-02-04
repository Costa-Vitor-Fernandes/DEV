

//fazer os botão funfar
const home = () =>{
console.log('foi pra home')

}


// Setup
const contacts = [
  {
    firstName: "Akira",
    lastName: "Laine",
    number: "0543236543",
    likes: ["Pizza", "Coding", "Brownie Points"],
  },
  {
    firstName: "Harry",
    lastName: "Potter",
    number: "0994372684",
    likes: ["Hogwarts", "Magic", "Hagrid"],
  },
  {
    firstName: "Sherlock",
    lastName: "Holmes",
    number: "0487345643",
    likes: ["Intriguing Cases", "Violin"],
  },
  {
    firstName: "Kristian",
    lastName: "Vos",
    number: "unknown",
    likes: ["JavaScript", "Gaming", "Foxes"],
  },
];

function lookUpProfile(name, prop) {
  // Only change code below this line
for(let i = 0; i<contacts.length; i++){

      if(contacts[i]==name){
        console.log("oi");
      }

}
  // Only change code above this line
}

lookUpProfile("Akira", "likes");




function numeroDriven (num){
let numer =0
  for(let n=0;n<num;n++){
   numer=Math.pow(n,5)-2
  if (numer == num) return true
}
return false
}
numeroDriven(3) //return true
numeroDriven(23) //return true
numeroDriven(10) //return false
