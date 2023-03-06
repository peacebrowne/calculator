/**
 * returning node element based on the specified class or id value;
 * @param {value} - class or id attribute value;
 * @returns {node element} - node element
 */
const element = value => {
    return document.querySelector(value)
}

const screen = element('.screen textarea')
const buttons_div = element('.buttons')
const cancel_btn = element('.cancel-btn')
const c = 'c';
const ac = 'ac';
const zero = '0';

let rolling_values = zero;

/**
 * returning node element based on the specified class or id value;
 * @param {node element} - node element
 * @returns {void} 
 */
const display_numbers_on_screen = ele =>{

    const btn_value = ele.dataset.value;
    
    if(screen.value == zero ){

        screen.value = btn_value;
        rolling_values = btn_value;
        cancel_btn.textContent = c;

    }else {

        screen.value += btn_value;
        rolling_values += btn_value;

    }
}

/**
 * Displaying the value of the operator button on the screen.
 * if the screen initial value doesn't ends with an operator, it should append new value.
 * @param {ele} - arithmetic operator button
 * @returns {void}
 */
const display_operator_on_screen = ele =>{


    const operator_btn = ele;

    // if screen or rolling value ends with [+ ,/ ,* ,- ]
    if(rolling_values.endsWith('* ') || rolling_values.endsWith('+ ') || rolling_values.endsWith('/ ') || rolling_values.endsWith('- ')){
        
        // concatenate screen values under the hood
        const screen_data = Array.from(screen.value);
        screen_data[screen_data.length-2] = operator_btn.textContent;


        // screen result
        const screen_result = screen_data.join('').split(',').join()
        screen.value =  screen_result;

        // concatenate screen values under the hood
        const calc_data = Array.from(rolling_values)
        calc_data[calc_data.length-2] = operator_btn.dataset.value;

        // rolling value result
        const calc_result = calc_data.join('').split(',').join()
        rolling_values =  calc_result;

    }
    else{
        
        screen.value += ` ${operator_btn.textContent} `
        rolling_values += ` ${operator_btn.dataset.value} `
        cancel_btn.textContent = c

    }

}

/**
 * Changes ac button value to c value
 * @param btn - cancel button
 * @returns {void}
 */
const reset_cancelbtn_value = btn => {

    screen.value = zero;
    rolling_values = zero
    btn.textContent = ac

}

// result from the calculations
const result = () =>{
    let result
    if(screen.value.endsWith('% ')){
        result = +screen.value.split('% ')[0] / 100;
        screen.value = result
    }
    else{
        result = eval(rolling_values)
        screen.value = result
        rolling_values = screen.value
    }

}

/**
 * Display negative number on screen
 * @param {data} - nagetive button
 * @returns {void}
 */
const negative = data =>{
    const symbol = data.dataset.value.split('/')[1]

    if(screen.value.endsWith(' ')){
        screen.value += symbol;
    }else {
        screen.value = symbol + screen.value
    }
}

/**
 * Handles all click events on he calculator
 * @param ev - cancel button
 * @returns {void}
 */
onclick = ev => {

    const btn = ev.target
    if(btn.className.includes('number-btn')) display_numbers_on_screen(btn);
    if(btn.className.includes('operator-btn')) display_operator_on_screen(btn)
    if(btn.className.includes('cancel-btn')) reset_cancelbtn_value(btn)
    if(btn.className.includes('negative-btn')) negative(btn)
    if(btn.className.includes('equal-btn')) result();
    
}

const banner = document.querySelector('.banner')
const switch_bgColor = document.querySelector('.toggle')
const body = element('body')

/**
 * @param data - switches between color
 */
const modes = () =>{
    body.classList.toggle('light')
}

switch_bgColor.addEventListener('click',modes)


