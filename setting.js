let setting;

// Cập nhật giao diện setting
export function updateSetting() {
    setting = JSON.parse(localStorage.getItem('setting'));

    // Minute Pomodoro trong form setting
    document.querySelector(".set_time_item--minute-pomodoro").value = setting.minutePomodoro;
    // Minute Breaktime trong form setting
    document.querySelector(".set_time_item--minute-breaktime").value = setting.minuteBreaktime;


    // Minute của pomodoro và breaktime ngoài giao diện
    if(document.querySelector('.active_PomodoroAndBreakTime').id == 'pomodoro'){
        document.querySelector("#minute").innerHTML = setting.minutePomodoro;
        document.querySelector('#second').innerHTML = '00';
    }
    else{
        document.querySelector("#minute").innerHTML = setting.minuteBreaktime;
        document.querySelector('#second').innerHTML = '00';
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

    // Ticking sound    
}


// Open setting
export function openSetting() {
    document.querySelector('.form_setting').classList.toggle('display_Block');

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
    document.body.classList.toggle('active_dark_mode');
    document.querySelector("footer").classList.toggle('color_white');
    document.querySelector('.footer_image').classList.toggle('opacity');

    // Display none
    document.querySelector('.notice').classList.toggle('display_None');
    document.querySelector('.add_item').classList.toggle('display_None');
    document.querySelector('.task').classList.toggle('display_None');

    // set Grid for Time
    document.querySelector('.time').classList.toggle('grid_time');
    
    // Change color for a , p
    document.querySelectorAll("a").forEach((link) => {
        link.classList.toggle('color_white');
    })
    document.querySelectorAll('p').forEach((item) => {
        item.classList.toggle("color_white");
    })

}