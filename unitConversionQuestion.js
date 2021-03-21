var number = numGenerator(1, 999);
var answer = 0;

// Generates random unit
var units = ["grams", "liters", "meters"];
var randomUnit = units[numGenerator(0, units.length-1)];

//Generate random unit prefixes; one for a starting value; one for the conversion value.
var metricPrefixList = ["kilo", "", "deci", "centi", "milli", "micro", "nano"];
var metricMagnitudeList = [1_000, 1, 0.1, 0.01, 0.001, 0.000_001, 0.000_000_001];
var randomIndexQ = numGenerator(0, metricPrefixList.length-1);
var randomIndexA = numGenerator(0, metricPrefixList.length-1);

// Prevents starting unit and final unit from being the same.
while (true) {
    if (randomIndexQ == randomIndexA) {
        randomIndexA = numGenerator(0, metricPrefixList.length-1);
    } else
        break;
}

//Asses how to calculate unit conversion based one which units are present.
if (randomIndexQ < randomIndexA && randomIndexQ != 0)
    answer = number * (metricMagnitudeList[randomIndexQ] / (metricMagnitudeList[randomIndexA]));
else if (randomIndexQ > randomIndexA || randomIndexQ == 0)
    answer = number * metricMagnitudeList[randomIndexQ] * (1/metricMagnitudeList[randomIndexA]);


    var question = `Convert ${number} ${metricPrefixList[randomIndexQ]}${randomUnit}
                to ${metricPrefixList[randomIndexA]}${randomUnit}.`

console.log(question);
console.log(answer + " " + metricPrefixList[randomIndexA] + randomUnit);