function calculator(input) { //funkce calculator rozhodne o akci, které se bude dít po stisknutí buttonu podle value
    if (input === '=') { //pokud je value buttonu '=' funkce použije jinou funkci calculate a celá hodnota (display.value) se vypočítá. A použije funkci changeAC()
        changeAC();
        calculate();
    } else if(input === '%') { //pokud je value buttonu '%' funkce použije jinou funkci percent a z celé hodnoty (display.value) se stane 1% celé hodnoty. A použije funkci changeAC()
        changeAC();
        percent();
    } else if (input.includes('/')) { //pokud je value buttonu '/' vymění value za '÷'
        display.value += input.replace('/','÷')
    } else if(input.includes('*')) { //pokud je value buttonu '*' vymění value za '×'
        display.value += input.replace('*', '×')
    }  else if (input.includes('²')){ //pokud je value buttonu '²' použije funcki squared(). A použije funkci changeAC()
        changeAC();
        squared();
    } else { //pokud value button není ani '=' ani '%', tak calculator bude dále pokračovat v zadávání hodnotě. A použije funkci changeAC()
        changeAC();
        display.value += input;
        adjustFontSize();
    }
}

function clearCalculator() { //funkce clearcalculator při použití vymaže celou hodnotu display.value (vymaže kalkulačku na prázdno).A použije funkci changeC()
    display.value = "";
    changeC();
    adjustFontSize();
}

function calculate() { //funkce calculate vypočítá celou hodnotu display.value
    try {
        if (display.value.includes(('÷'))) { //kvůli odlišnosti znaků v kalkulačce, které se nedají použít ve funkci "eval" je potřeba nahradit znak '÷' na '/', který vydělí hodnotu
            display.value = display.value.replace(/÷/g, '/');
        } else if(display.value.includes(('×'))) { //kvůli odlišnosti znaků v kalkulačce, které se nedají použít ve funkci "eval" je potřeba nahradit znak '×' na '*', který vydělí hodnotu
            display.value = display.value.replace(/×/g, '*');
        } else if(display.value.includes((','))) { //kvůli odlišnosti znaků v kalkulačce, které se nedají použít ve funkci "eval" je potřeba nahradit znak ',' na '.', který je desetinná čárka
            display.value = display.value.replace(/,/g, '.');
        }

        let val = parseFloat(eval(display.value).toFixed(4));
        display.value = val.toString().replace('.', ',');
    } catch(error) { //pokud se nepodaří vypočítat hodnotu funkce vyhodí "Error"
        display.value = "Error";
    }
    adjustFontSize();
}

function percent() { //funcke percent vytvoří 1% ze zadané hodnoty
    try {
        var input = display.value;
        input = input.replace(/×/g, "*");
        input = input.replace(/÷/g, "/");
        display.value = eval(input) / 100;
    } catch (error) {
        display.value = "Error";
    }
    adjustFontSize();
}

function plusminus() { //funkce, která změní display.value na mínusovou hodnotu (vynasobí ji -1)
        try {
            display.value = eval(display.value * (-1));
        } catch (error) {
            display.value = "Error";
        }
    adjustFontSize();
}

function squared() { //funkce změní '×' na '*' a '÷' na '/' a vynásobí display.value na druhou (hodnoutou display.value)
    try {
        var input = display.value;
        input = input.replace(/×/g, "*");
        input = input.replace(/÷/g, "/");
        display.value = eval(input) ** 2;
    } catch (error) {
        display.value = "Error";
    }
    adjustFontSize();
}
function clearLastCharacter() { //funkce, která při provedení smaže poslední charakter z display.value
    display.value = display.value.slice(0, -1);
    adjustFontSize();
}

function changeAC() { //funkce, která při provedení změní button AC na C
    document.getElementById("clearbutton").textContent = 'C';
}

function changeC() { //funkce, která při provedení změní button C na AC
    document.getElementById("clearbutton").textContent = 'AC';
}

document.addEventListener('DOMContentLoaded', (event) => {

    document.addEventListener('keydown', (event) => { //event použití kláves na klávesnici a zobrazení použitého znaku / čísla v kalkulačce
        const key = event.key;

        if (['Enter', 'Backspace', 'Escape', 'Delete'].includes(key) || !isNaN(key) || ['+', '-', '*', '/', ',', '%', '(', ')'].includes(key)) {
            event.preventDefault();
        }

        if (!isNaN(key) || ['+', '-', '*', '/', ',', '%', '(', ')'].includes(key)) {
            calculator(key);
        } else if (key === 'Enter') {
            calculate();
        } else if (key === 'Backspace') {
            clearLastCharacter();
        } else if (key === 'Escape' || key === 'Delete') {
            clearCalculator();
        }
    });
});
function adjustFontSize() { //funkce na změnu velikosti textu ve display. Při zadání více znaků, než se vejde do display se velikost textu zmenší, aby se vešlo více znaků
    const display = document.getElementById('display');
    const maxFontSize = 5; // rem
    const minFontSize = 1; // rem
    let fontSize = maxFontSize;

    display.style.fontSize = `${fontSize}rem`;

    while (display.scrollWidth > display.clientWidth && fontSize > minFontSize) {
        fontSize -= 0.1;
        display.style.fontSize = `${fontSize}rem`;
    }
}
