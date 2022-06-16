let minValue = 0;
let maxValue = 100;
let middleValue  = Math.floor(minValue + maxValue) / 2;
const questionNumberField = document.getElementById('questionNumberField');
const answerField = document.getElementById('answerField');
let questionNumber = 1;
let gameRun = true;

let phraseRandom = null;

function numToWord(intNum) {
    var result = [];

    var minus = '';

    console.log(intNum);

    if (typeof intNum === 'number') {
        if(intNum < 0){
            intNum = Math.abs(intNum).toString();
            minus = 'минус';
        } else {
            intNum = intNum.toString();
        }

    } else if (typeof intNum !== 'string') {
        intNum = '';
    }

    var names = null;

    if (intNum.length && !/[^0-9]/.test(intNum)) {
        var selectName = function (number, names) {
            return names[((parseInt(number) % 100 > 4) && (parseInt(number) % 100 < 20)) ? 2 : [2, 0, 1, 1, 1, 2][Math.min(parseInt(number) % 10, 5)]];
        };
        var name = null;
        var zero = 'ноль';

        if (intNum === '0') {
            result.push(zero);
        } else {
            var from0To2 = [zero, 'одна', 'две'];
            var from0To19 = [
                zero, 'один', 'два', 'три', 'четыре',
                'пять', 'шесть', 'семь', 'восемь', 'девять',
                'десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать',
                'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'
            ];
            var tens = [
                'десять', 'двадцать', 'тридцать', 'сорок', 'пятьдесят',
                'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'
            ];
            var hundreds = [
                'сто', 'двести', 'триста', 'четыреста', 'пятьсот',
                'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'
            ];
            var thousands = [
                ['тысяча', 'тысячи', 'тысяч']
            ];
            var unknown = '{неизвестно}';
            var numberParts = intNum.replace(/(?=(\d{3})+(?!\d))/g, ' ').split(' ');
            var i = numberParts.length - 1;
            for (var j in numberParts) {
                var numberPart = parseInt(numberParts[j]);
                if (numberPart) {
                    var numberPartResult = [];
                    var hundred = Math.floor(numberPart / 100);
                    if (hundred) {
                        numberPartResult.push(hundreds[hundred - 1]);
                        numberPart -= hundred * 100;
                    }
                    if (numberPart > 19) {
                        var ten = Math.floor(numberPart / 10);
                        numberPartResult.push(tens[ten - 1]);
                        numberPart -= ten * 10;
                    }
                    if (numberPart) {
                        numberPartResult.push(((i === 1) && ([1, 2].indexOf(numberPart) !== -1)) ? from0To2[numberPart] : from0To19[numberPart]);
                    }
                    if (thousands[i - 1] !== undefined) {
                        numberPartResult.push(selectName(numberParts[j], thousands[i - 1]));
                    } else if (i !== 0) {
                        numberPartResult.push(unknown);
                    } else if (names) {
                        name = selectName(numberParts[j], names);
                    }
                    result.push(numberPartResult.join(' '));
                }
                i--;
            }
            if (!result.length) {
                result.push(zero);
            }
        }
        if (!name && names) {
            name = selectName(0, names);
        }
        if (name) {
            result.push(name);
        }

    }
    result.unshift(minus);
    return (result.join(' ').length > 20) ? (intNum < 0 ? intNum * -1 : intNum) : result.join(' ');
}

function resetProgram(){
    minValue = parseInt(prompt('Минимальное значение числа для игры','0'));
    minValue = (isNaN(minValue)) ? 0 : (minValue < -999 ? -1000 : (minValue > 999 ? 1000 : minValue));

    maxValue = parseInt(prompt('Максимальное значение числа для игры','100'));
    maxValue = (isNaN(maxValue)) ? 100 : (maxValue < -999 ? -1000 : (maxValue > 999 ? 1000 : maxValue));

    minValue = Math.round(minValue);
    maxValue = Math.round(maxValue);

    alert(`Загадайте любое целое число от ${minValue} до ${maxValue}, а я его угадаю`);

    middleValue  = Math.round(Math.floor(minValue + maxValue) / 2);

    answerField.innerText = `Вы загадали число ${numToWord(middleValue)} ?`;
}

function ifEqual(){
    if(minValue === maxValue){
        phraseRandom = Math.round( Math.random() * 3);
        if(phraseRandom === 3){
            answerField.innerText = `Вы загадали неправильное число!\n\u{1F90C}`;
        }else if(phraseRandom === 2){
            answerField.innerText = `Я сдаюсь..\n\u{1F92F}`;
        }else{
            answerField.innerText = `Ух, я даже не знаю..\n\u{1F92F}`;
        }

        gameRun = false;
    } else {
        questionNumber++;
        questionNumberField.innerText = questionNumber;
        answerField.innerText = `Вы загадали число ${numToWord(middleValue)} ?`;
    }
}

resetProgram();

questionNumberField.innerText = questionNumber;

answerField.innerText = `Вы загадали число ${numToWord(middleValue)} ?`;

document.getElementById('btnRetry').addEventListener('click', function () {
    questionNumber = 0;
    questionNumberField.innerText = questionNumber;
    resetProgram();
    gameRun = true;
})

document.getElementById('btnOver').addEventListener('click', function () {
    if(gameRun){
        minValue = middleValue;
        middleValue = Math.round(Math.floor((minValue + maxValue) / 2));

        if(minValue === middleValue){
            middleValue++;
        }

        ifEqual();
    }
})

document.getElementById('btnLess').addEventListener('click', function (){
    if(gameRun){
        maxValue = middleValue;
        middleValue = Math.round(Math.floor((minValue + maxValue) / 2));

        if(maxValue === middleValue){
            middleValue--;
        }

        ifEqual();
    }

})

document.getElementById('btnEqual').addEventListener('click', function () {
    if (gameRun){
        phraseRandom = Math.round( Math.random() * 3);
        if(phraseRandom === 3){
            answerField.innerText = `Я всегда угадываю\n\u{1F918}`;
        }else if(phraseRandom === 2){
            answerField.innerText = `Это было легко\n\u{1F913}`;
        }else{
            answerField.innerText = `Гадаю лучше гадалок\n\u{1F92B}`;
        }
        gameRun = false;
    }
})

