let a = '';
let b = '';
let sign = ''; //знак
let finish = false;

const digit = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const action = ['-', '+', 'x', '/', '+/-', '%'];

const out = document.querySelector('.calc-screen p');
const max_len = 8;

function clearAll(){
    a = '';
    b = '';
    sign = '';
    finish = false;
    out.textContent = 0;
    out.style.fontSize = "4rem";
}

function check_a(){
    if(a.length == max_len){
        out.style.fontSize = "3rem";
    }
    else if (a.length > max_len){
        a = '';
        out.textContent = a;
        return;
    }
}
function check_b(){
    if(b.length == max_len){
        out.style.fontSize = "3rem";
    }
    else if (b.length > max_len){
        b = '';
        out.textContent = b;
        return;
    }
}

document.querySelector('.ac').onclick = clearAll;

document.querySelector('.buttons').onclick = (event) =>{
    //не нажата кнопка
    if(!event.target.classList.contains('btn')) return;
    //нажата кнопка AC
    if(event.target.classList.contains('ac')) return;

    out.textContent = '';
    //получаю нажатую кнопку
    const key = event.target.textContent;

    //нажата [0..9] или .
    if (digit.includes(key)){
        if (b === '' && sign === ''){
            check_a();
            if (key === '.' && a.includes('.')){
                a += '';
                out.textContent = a;
            }
            else{
                a += key;
                out.textContent = a;
            } 
        }
        else if (a!== '' && b!== '' && finish){
            b = key;
            finish = false;
            out.textContent = b;
        }
        else{
            check_b();
            b += key;
            out.textContent = b;
        }
        console.table(a, b, sign);
        return;
    }  
    
    //нажата + - / x
    if (action.includes(key)){
        sign = key;
        out.textContent = sign;
        console.table(sign);
        return;
    }

    // =
    if (key === '='){
        if (b === '') b = a;
        switch (sign){
            case "+":
                a = (+a)+(+b);
                break;
            case "-":
                a = a-b;
                break;
            case "x":
                a = +a*b;
                break;
            case "/":
                if (b === '0'){
                    out.textContent = 'Error';
                    a = '';
                    b = '';
                    sign = '';
                    return;
                }
                a = a/b;
                break;
            case "+/-":
                a = a * (-1);
                break;
            case "%":
                a = a/100;
                break;
        }
        finish = true;
        out.textContent = a;
        console.table(a,b,sign);
    }
};
