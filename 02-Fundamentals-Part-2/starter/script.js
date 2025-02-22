'use strict';
/*
const averageScore = (s1, s2, s3) => Number((s1 + s2 + s3) / 3);


const scoreDolphins = averageScore(85, 54, 41);
const scoreKoalas = averageScore(23, 34, 27);
console.log("Average scores: ", scoreDolphins, scoreKoalas);

let result = (team1, team2, score1, score2) => {
    if (score1 / score2 > 2) {
        result = `${team1} wins the cup!`;
    } else if (score2 / score1 > 2) {
        result = `${team2} wins the cup!`;
    } else result = `None team is victorious`;
    return result;
}

console.log(result("Dolpins", "Koalas", scoreDolphins, scoreKoalas));

*/

const bills = [22, 295, 176, 440, 37, 105, 10, 1100, 86, 52];
const tips = [];
const totals = [];

const calcTip = function (bill) {
    return bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
}
function calcAverage(arr) {
    let sum = 0;
    for (let i = 0; i <= arr.length - 1; i++) {
        sum += arr[i];
    }
    return sum / arr.length;
}


console.log(`Average bill is ${calcAverage(bills)}`);

function calcTips(arr_bills, arr_tips, arr_tot) {
    for (let i = 0; i < arr_bills.length; i++) {
        arr_tips.push(calcTip(arr_bills[i]))
        console.log(`Tip of ${arr_bills[i]} is ${arr_tips[i]}`);
        arr_tot.push(arr_bills[i] + arr_tips[i]);
        console.log(`Total is ${arr_tot[i]}`);
    }
}

calcTips(bills, tips, totals);