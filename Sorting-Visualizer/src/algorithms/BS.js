import {swap} from './helpers';
const bs = (array,position,arraySteps,colorSteps)=>{
let colorKey = colorSteps[colorSteps.length-1].slice();// it makes the copy of first array in the color steps array

for(let i =0 ; i<array.length-1; i++){
    for(let j =0 ; j<array.length-i-1; j++){
        if(array[j]>array[j+1]){
            array = swap(array,j,j+1);
        }
        arraySteps.push(array.slice());
        colorKey[j]=1;// currently this elem have been veiwed 
        colorKey[j+1]=1;
        colorSteps.push(colorKey.slice());
        colorKey[j]=0;//  we are done reviweing them
        colorKey[j+1]=0;// removing the colors 
        
    }
    colorKey[arraySteps.lenght-1-i]=2;// after the swapping..setting the last elem to be 2
    arraySteps.push(array.slice());
    colorSteps.push(colorKey.slice());


}
colorSteps[colorSteps.lenght-1]= new Array(array.length).fill(2);// setting color to green
return;

};
export default bs;

    
