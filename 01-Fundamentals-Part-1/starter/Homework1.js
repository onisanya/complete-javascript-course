const Mark_height = 1.69;
const Mark_weight = 78;
const John_height = 1.88;
const John_weight = 95;

let bmi_Mark = Mark_weight / (Mark_height ** 2);
let bmi_John = John_weight / (John_height ** 2);
let is_Mark_BMI_Bigger = bmi_Mark > bmi_John;


console.log("Mark's BMI is " + bmi_Mark);
console.log("John's BMI is " + bmi_John);
let difference;

if (bmi_Mark > bmi_John) {
    difference = bmi_Mark - bmi_John;
    console.log(`Mark's BMI is higher than John's of ${bmi_Mark - bmi_John}`);
}
else {
    difference = bmi_John - bmi_Mark;
    console.log(`John's BMI is higher than Mark's of ! ${bmi_John - bmi_Mark}`);
}