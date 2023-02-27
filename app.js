const demo = document.getElementById('demo')
const buttons = document.querySelector('.buttons')
const cancelBtn = document.getElementById('cancel')

let calculator = '0';

const numbers = ev =>{
    let button = ev.dataset.value;
    
    if(demo.innerHTML == '0'){
        demo.innerHTML = button
        calculator = button;
        cancelBtn.innerHTML = 'c'
    }else {
        demo.innerHTML += button
        calculator += button;
    }
}

const operators = ev =>{

    let arithmetic = ev;

    if(calculator.endsWith('* ') || calculator.endsWith('+ ') || calculator.endsWith('/ ') || calculator.endsWith('- ')){
        
        let demo_data = Array.from(demo.textContent);
        demo_data[demo_data.length-2] = arithmetic.innerHTML;
        let demo_result = demo_data.join('').split(',').join()
        demo.innerHTML =  demo_result;

        let calc_data = Array.from(calculator)
        calc_data[calc_data.length-2] = arithmetic.dataset.value;
        let calc_result = calc_data.join('').split(',').join()
        calculator =  calc_result;

    }else{

        cancelBtn.innerHTML = 'C'
        demo.innerHTML += ' ' +arithmetic.innerHTML + ' ' 
        calculator += ' ' + arithmetic.dataset.value + ' ' 

    }

}

const cancel = btn =>{
    demo.innerHTML = 0;
    calculator = '0'
    btn.innerHTML = 'ac'
}
const result = () =>{
    let result
    if(demo.innerHTML.endsWith('% ')){
        result = +demo.innerHTML.split('% ')[0] / 100;
        demo.innerHTML = result
    }
    else{
        result = eval(calculator)
        demo.innerHTML = result
        calculator = demo.innerHTML
        console.log(calculator)
    }

}

const negative = data =>{
    let symbol = data.dataset.value.split('/')[1]

    if(demo.textContent.endsWith(' ')){
        demo.textContent += symbol;
    }else {
        demo.textContent = symbol + demo.textContent
    }
}

buttons.addEventListener('click', ev => {

    let btn = ev.target
    if(btn.className.includes('number')) numbers(btn);
    else if(btn.className.includes('operator')) operators(btn)
    else if(btn.className.includes('cancel')) cancel(btn)
    else if(btn.className.includes('negative')) negative(btn)
    else if(btn.className.includes('equal')) result();
    

})

const banner = document.querySelector('.banner')
const switch_bgColor = document.querySelector('.toggle')
const first = document.querySelectorAll('.first')

const modes = () =>{
    banner.classList.toggle('banner_whitemode')
    demo.classList.toggle('demo_whitemode')
    first.forEach(btn => btn.classList.toggle('demo_whitemode'))
}

switch_bgColor.addEventListener('click',modes)


