const allSizes = ["PP", "P", "M", "G", "GG", "XG"];

const regraAltPP = 'x'

const regraAltXG = 'y'

const dollOptions = [0,1,2,3,4]

const imcRanges = [
  [14,20],
  [20,23.5],
  [23.5,28.7],
  [28.7, 30],
  [30, 32.5],
  [32.5, 35.5],
];

const PP = {
  busto: { min: 75, med: 80.5, max: 86 },
  cintura: { min: 65, med: 67.5, max: 70 },
  quadril: { min: 92, med: 95, max: 98 },
};
const P = {
  busto: { min: 87, med: 91.5, max: 96 },
  cintura: { min: 70, med: 73, max: 76 },
  quadril: { min: 99, med: 102, max: 105 },
};
const M = {
  busto: { min: 97, med: 99.5, max: 102 },
  cintura: { min: 77, med: 79, max: 81 },
  quadril: { min: 106, med: 108.5, max: 111 },
};
const G = {
  busto: { min: 103, med: 106, max: 109 },
  cintura: { min: 82, med: 84.5, max: 87 },
  quadril: { min: 112, med: 115, max: 118 },
};
const GG = {
  busto: { min: 110, med: 114.5, max: 119 },
  cintura: { min: 88, med: 90.5, max: 93 },
  quadril: { min: 119, med: 121.5, max: 124 },
};
const XG = {
  busto: { min: 120, med: 125, max: 130 },
  cintura: { min: 94, med: 96.5, max: 99 },
  quadril: { min: 125, med: 127.5, max: 130 },
};

const chooseSizeDoll = (imc, busto, cintura, quadril) => {
    imcRanges.forEach((v,i,arr)=>{
        if(imc < 14 || imc > 35.5){
           router.push({ pathname: '/medidas/NotFound', query: { encodedImgUrl: encodedImgUrl } })
        }else{
            if(imc> v[0] && imc<v[1]){
                if(i===0 || i === arr.length){
                    //if PP or XG clause
                }
                //imc range clause

            }
        }





    })
};
