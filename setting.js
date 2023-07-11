let setting;

// Cập nhật giao diện setting
export function updateSetting() {
    setting = JSON.parse(localStorage.getItem('setting'));

    //BODY background
    document.querySelector('.color_pomodoro').style.backgroundColor = setting.color_Pomodoro;
    document.querySelector('.color_breaktime').style.backgroundColor = setting.color_Breaktime;

    // Minute Pomodoro trong form setting
    document.querySelector(".set_time_item--minute-pomodoro").value = setting.minutePomodoro;
    // Minute Breaktime trong form setting
    document.querySelector(".set_time_item--minute-breaktime").value = setting.minuteBreaktime;


    // Minute của pomodoro và breaktime ngoài giao diện
    if(document.querySelector('.active_PomodoroAndBreakTime').id == 'pomodoro'){
        document.querySelector("#minute").innerHTML = setting.minutePomodoro;
        document.querySelector('#second').innerHTML = '00';

        //BODY background current
        document.body.style.backgroundColor = setting.color_Pomodoro;
    }
    else{
        document.querySelector("#minute").innerHTML = setting.minuteBreaktime;
        document.querySelector('#second').innerHTML = '00';
        
        //BODY background current
        document.body.style.backgroundColor = setting.color_Breaktime;
    }
    

    // Auto start Break (toggle)
    if(setting.autoStart_Breaktime){
        document.querySelector(".break_color").classList.add("toggle_color");
        document.querySelector(".before_break").classList.add('toggle_active');
        document.querySelector("#toggle1_input").checked = true;
        
    }
    else{
        document.querySelector(".break_color").classList.remove("toggle_color");
        document.querySelector(".before_break").classList.remove('toggle_active');
        document.querySelector("#toggle1_input").checked = false;
    }

    // Auto start Pomodoro (toggle)
    if(setting.autoStart_Pomodoro){
        document.querySelector(".pomodoro_color").classList.add("toggle_color");
        document.querySelector(".before_pomodoro").classList.add('toggle_active');
        document.querySelector("#toggle2_input").checked = true;
    }
    else{
        document.querySelector(".pomodoro_color").classList.remove("toggle_color");
        document.querySelector(".before_pomodoro").classList.remove('toggle_active');
        document.querySelector("#toggle2_input").checked = false;
    }

    // Auto start Switch (toggle)
    if(setting.autoStart_Switch){
        document.querySelector(".switch_color").classList.add("toggle_color");
        document.querySelector(".before_switch").classList.add('toggle_active');
        document.querySelector("#toggle3_input").checked = true;
    }
    else{
        document.querySelector(".switch_color").classList.remove("toggle_color");
        document.querySelector(".before_switch").classList.remove('toggle_active');
        document.querySelector("#toggle3_input").checked = false;
    }

    // Auto start Dark Mode (toggle)
    if(setting.darkMode){
        document.querySelector(".darkmode_color").classList.add("toggle_color");
        document.querySelector(".before_darkmode").classList.add('toggle_active');
        document.querySelector("#toggle_dark-mode").checked = true;
    }
    else{
        document.querySelector(".darkmode_color").classList.remove("toggle_color");
        document.querySelector(".before_darkmode").classList.remove('toggle_active');
        document.querySelector("#toggle_dark-mode").checked = false;
    }

    
    // Alarm sound
    document.querySelector('.select_sound').value = setting.alarmSound;

    // Ticking sound 
    document.querySelector('.select_ticking_sound').value = setting.tickingSound;   


    //Pomodoro color
    document.querySelector('.color_pomodoro').style.backgroundColor = setting.color_Pomodoro;
    
    //Pomodoro color
    document.querySelector('.color_breaktime').style.backgroundColor = setting.color_Breaktime;
}


// Open setting
export function openSetting() {
    document.querySelector('.form_setting').classList.toggle('display_Block');

    if(document.querySelector('.block_screen600')){
        document.querySelector('.menu').classList.remove('block_screen600');
    }

    // add position fixed for card .total_container
    document.querySelector('.total_container').classList.add("position_fixed");
}

// Close setting
export function closeFormSetting(){
    document.querySelector('.form_setting').classList.remove('display_Block');
    // Remove position fixed for card .total_container
    document.querySelector('.total_container').classList.remove("position_fixed");
}

// Dark mode
export function darkMode() {
    // Active dark mode
    document.body.classList.toggle('active_dark_mode');

    if(!document.body.classList.contains("active_dark_mode")){
        if(document.querySelector('.active_PomodoroAndBreakTime').id == 'pomodoro'){
            document.body.style.backgroundColor = setting.color_Pomodoro;
        }
        else{
            document.body.style.backgroundColor = setting.color_Breaktime;
        }
    }
    else{
        document.body.style.backgroundColor = 'black';
    }
    document.querySelector("footer").classList.toggle('color_white');
    document.querySelector('.footer_image').classList.toggle('opacity');

    // Display none
    document.querySelector('.notice').classList.toggle('display_None');
    document.querySelector('.add_item').classList.toggle('display_None');
    document.querySelector('.task').classList.toggle('display_None');

    // set Grid for Time
    if(window.innerWidth > 910){
        document.querySelector('.time').classList.toggle('grid_time');
    }
    else{
        document.querySelector('.time').classList.toggle('grid_time_screen910');
    }
    
    // Change color for a , p
    document.querySelectorAll("a").forEach((link) => {
        link.classList.toggle('color_white');
    })
    document.querySelectorAll('p').forEach((item) => {
        item.classList.toggle("color_white");
    })

}


// play Alarm sound (audio)
export function playAlarmSound() {
    let soundCurrent = "./audio/" + setting.alarmSound + ".mp3";
    let audio = new Audio(`${soundCurrent}`, );
    audio.play();
}

// Close choose color
let closeChooseColor = document.querySelector('.choose_color--closeBtn').addEventListener('click', ()=>{
    document.querySelector('.choose_color').classList.remove('display_Block');
})
export {closeChooseColor};



// Array color
export let colorArray = ['var(--light_blue)', 'var(--light_green)' , 'var(--light_red)'];

let indexColor = -1;

// Choose color
let colorShape = document.querySelectorAll('.color--form');
colorShape.forEach((color, i) => {
    color.addEventListener('click', ()=>{
        indexColor = i;
        if(document.querySelector('.active_color').classList.contains("color_pomodoro")){
            chooseColorPomodoro();
        }
        else{
            chooseColorBreaktime();
        }
        localStorage.setItem('setting', JSON.stringify(setting));
    });
})

function chooseColorPomodoro() {
    document.querySelector('.color_pomodoro').style.backgroundColor = colorArray[indexColor];
    // Cập nhật lại setting
    setting.color_Pomodoro = colorArray[indexColor];
}
function chooseColorBreaktime() {
    document.querySelector('.color_breaktime').style.backgroundColor = colorArray[indexColor];
    // Cập nhật lại setting
    setting.color_Breaktime = colorArray[indexColor];
}



//Open setting at screen <= 600px
document.querySelector('.fa-bars').addEventListener('click', () =>{
    document.querySelector('.menu').classList.toggle('block_screen600');
})