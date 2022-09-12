const btns = document.querySelectorAll('.btn')
const demo = document.getElementById('demo')

let calc = '0';

const characters = ev =>{

    let n = ev.target.textContent;
    if(demo.value == 0) demo.value = n
    else demo.value += n

}

btns.forEach( btn => {
    btn.addEventListener('click',characters)
})

const result = () =>{

    let result
    if(demo.value.endsWith('%')){
        result = +demo.value.split('%')[0] / 100;
        demo.value = result
    }
    else{
        
        result = eval(demo.value)
        demo.value = result

    }

}

const equalBtn = document.getElementById('equalBtn')
equalBtn.addEventListener('click', result)

const cancelBtn = document.getElementById('btnC')
cancelBtn.addEventListener('click', () => demo.value = 0)

const deleteBtn = document.getElementById('btnD')
deleteBtn.addEventListener('click',()=> demo.value = demo.value.substring(-1, demo.value.length-1))

