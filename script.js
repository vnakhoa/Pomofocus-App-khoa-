import { updateSetting} from "./setting.js";
import { openSetting } from "./setting.js";
import { closeFormSetting } from "./setting.js";
import { darkMode } from "./setting.js";

//ArrayStorage lưu nội dung text
let arrayStorage = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//ArrayItem lưu nội dung toàn bộ các thẻ li của ul (dùng để display giao diện)
let arrayItem = localStorage.getItem('all_items') ? JSON.parse(localStorage.getItem('all_items')) : [];

//ArrayFinish lưu số lần làm việc hoàn thành của 1 item
let arrayFinish = localStorage.getItem('finish') ? JSON.parse(localStorage.getItem('finish')) : [];

// Giao diện li được hiên ra
let todo = document.querySelector('.to-do-list');

let input = document.querySelector("#input");
let add_btn = document.querySelector('#add_task');
let start_Btn = document.querySelector('#start');
let pause_Btn = document.querySelector('#pause');
let skip_Btn = document.querySelector('#skip');
let breaktime_Btn = document.querySelector('#breaktime');
let pomodoro_Btn = document.querySelector('#pomodoro');

// Giao diện mới bắt đầu ở Pomodoro
pomodoro_Btn.classList.add('active_PomodoroAndBreakTime');


//=====-====-====== SETTING ====-===-======//
let setting = localStorage.getItem('setting') ? JSON.parse(localStorage.getItem('setting')) : {
    minutePomodoro: document.querySelector(".set_time_item--minute-pomodoro").value,
    minuteBreaktime: document.querySelector(".set_time_item--minute-breaktime").value,
    autoStart_Breaktime:  document.querySelector("#toggle1_input").checked,
    autoStart_Pomodoro:  document.querySelector("#toggle2_input").checked,
    autoStart_Switch:  document.querySelector("#toggle3_input").checked,
    darkMode: document.querySelector("#toggle_dark-mode").checked,
    alarmSound: document.querySelector(".select_sound").value,
    tickingSound: document.querySelector(".select_ticking_sound").value,
}
localStorage.setItem('setting', JSON.stringify(setting));

// Form setting, lấy dữ liệu từ form setting khi nhấn OK
function settingForm() {
    let settingForm =  {
        minutePomodoro: document.querySelector(".set_time_item--minute-pomodoro").value,
        minuteBreaktime: document.querySelector(".set_time_item--minute-breaktime").value,
        autoStart_Breaktime:  document.querySelector("#toggle1_input").checked,
        autoStart_Pomodoro:  document.querySelector("#toggle2_input").checked,
        autoStart_Switch:  document.querySelector("#toggle3_input").checked,
        darkMode: document.querySelector("#toggle_dark-mode").checked,
        alarmSound: document.querySelector(".select_sound").value,
        tickingSound: document.querySelector(".select_ticking_sound").value,
    }

    localStorage.setItem('setting', JSON.stringify(settingForm));

    // Cập nhật lại minute 
    setting = JSON.parse(localStorage.getItem('setting'));
    updateSetting();
}
//click OK
let okayBtn = document.querySelector('.btn_okay');
okayBtn.addEventListener('click', settingForm);
// Cập nhật setting khi bắt đầu
updateSetting();    


// Click btn Toggle auto start Breaktime
document.querySelector("#toggle1_input").addEventListener('click', ()=>{
    if(document.querySelector("#toggle1_input").checked){
        document.querySelector(".break_color").classList.add("toggle_color");
        document.querySelector(".before_break").classList.add('toggle_active');
    }
    else{
        document.querySelector(".break_color").classList.remove("toggle_color");
        document.querySelector(".before_break").classList.remove('toggle_active');
    }
})
// Click btn Toggle auto start Pomodoro
document.querySelector("#toggle2_input").addEventListener('click', ()=>{
    if(document.querySelector("#toggle2_input").checked){
        document.querySelector(".pomodoro_color").classList.add("toggle_color");
        document.querySelector(".before_pomodoro").classList.add('toggle_active');
    }
    else{
        document.querySelector(".pomodoro_color").classList.remove("toggle_color");
        document.querySelector(".before_pomodoro").classList.remove('toggle_active');
    }
})
// Click btn Toggle auto start Switch
document.querySelector("#toggle3_input").addEventListener('click', ()=>{
    if(document.querySelector("#toggle3_input").checked){
        document.querySelector(".switch_color").classList.add("toggle_color");
        document.querySelector(".before_switch").classList.add('toggle_active');
    }
    else{
        document.querySelector(".switch_color").classList.remove("toggle_color");
        document.querySelector(".before_switch").classList.remove('toggle_active');
    }
})
// Click btn Toggle Dark Mode
document.querySelector("#toggle_dark-mode").addEventListener('click', ()=>{
    if(document.querySelector("#toggle_dark-mode").checked){
        document.querySelector(".darkmode_color").classList.add("toggle_color");
        document.querySelector(".before_darkmode").classList.add('toggle_active');
    }
    else{
        document.querySelector(".darkmode_color").classList.remove("toggle_color");
        document.querySelector(".before_darkmode").classList.remove('toggle_active');
    }
})
    
// ======== When click Setting btn =========//
document.querySelector(".setting").addEventListener('click', openSetting);


// ==== click (x) or click OK button to close setting form =====//
document.querySelector(".fa-times").addEventListener('click', closeFormSetting);
document.querySelector('.btn_okay').addEventListener('click', closeFormSetting);


// Click to set Alarm sound
document.querySelector('.alarm_sound_dropdown').addEventListener('click', ()=>{
    document.querySelector('.list_sound').classList.toggle('display_Block');
})
// onClick to choose Alarm Sound
let listAlarm = document.querySelector('.list_sound').childNodes;
listAlarm.forEach((sound, i) => {
    sound.addEventListener('click', getValueAlarm);
})
function getValueAlarm(){
    document.querySelector('.select_sound').value = this.innerHTML;
}


// click to set Ticking Sound
document.querySelector('.ticking_sound_dropdown').addEventListener('click', ()=>{
    document.querySelector('.list_ticking_sound').classList.toggle('display_Block');
})
// onClick to choose Ticking Sound
let listTicking = document.querySelector('.list_ticking_sound').childNodes;
listTicking.forEach((sound, i) => {
    sound.addEventListener('click', getValueTicking);
})
function getValueTicking(){
    document.querySelector('.select_ticking_sound').value = this.innerHTML;
}

//====== END SETTING ======//


// save item
function saveItem(){
    if(localStorage.getItem('saveFilter') === null){
        document.querySelector('.filter').value = 'all';
    }
    else{
        document.querySelector('.filter').value = localStorage.getItem('saveFilter');
    }

    if(Number(localStorage.getItem('score')) != 0){
        document.querySelector(".result_pomodoro").innerHTML = localStorage.getItem('score');
    }
    else{
        document.querySelector(".result_pomodoro").innerHTML = '0';
    }

    //save to-do List
    todo.innerHTML = localStorage.getItem('i');
    if(arrayStorage.length > 0){
        filterTodoList();
    }
    
    deleteItem();
    editItem();
    chooseItemToWork();
}
saveItem();


// Reset button Save or Add
function resetAddButton(){
    if(add_btn.id != 'add_task'){
        //Rsset id for add_btn if it exit
        add_btn.id = 'add_task';
        // set input = "";
        document.querySelector('#input').value = '';
        // Reset content of add_Btn card
        document.querySelector(".change-name-add-btn").innerHTML = 'Add';
    }
}

// Click AddPlus to open form input
document.querySelector('.start_add_item').addEventListener('click', ()=>{
    document.querySelector('.add_list').classList.add("display_Flex");

    document.querySelector("#type_description").value = '';
    document.querySelector("#input_date").value = '';

    resetAddButton();
})

// click Cancel
document.querySelector('#cancel').addEventListener('click', ()=> {
    document.querySelector('.add_list').classList.remove('display_Flex');

    resetAddButton();
})



// Click Add to add work
add_btn.addEventListener('click', ()=> {

    if(input.value != ''){
        if(add_btn.id != 'add_task'){
            arrayStorage[add_btn.id].name = input.value;
            arrayStorage[add_btn.id].description = document.querySelector("#type_description").value;
            arrayStorage[add_btn.id].prioritize = document.querySelector('#type_task').value;
            arrayStorage[add_btn.id].due = document.querySelector('#input_date').value;

            //Add class ='chooseItem' => Xác định item vừa sửa
            let edit = document.querySelectorAll('.edit');
            if(edit[add_btn.id].parentElement.children[0].classList.contains('completeItem') == false){
                arrayItem[add_btn.id] = 
                `<li class= "chooseItem ${arrayStorage[add_btn.id].prioritize}">    
                    <span class="content">${input.value}</span>
                    <span class="pointFinish">${arrayFinish[add_btn.id]}</span>
                    <span class="edit"><i class="fas fa-edit"></i></span>
                    <span class="delete"><i class="fas fa-trash-alt"></i></span>
                </li>`
            }
            else{
                arrayItem[add_btn.id] = 
                `<li class= "chooseItem ${arrayStorage[add_btn.id].prioritize}">    
                    <span class="content completeItem">${input.value}</span>
                    <span class="pointFinish">${arrayFinish[add_btn.id]}</span>
                    <span class="edit"><i class="fas fa-edit"></i></span>
                    <span class="delete"><i class="fas fa-trash-alt"></i></span>
                </li>`
            }

            //Rsset id for add_btn
            add_btn.id = 'add_task';
            
            // Reset content of add_Btn card
            document.querySelector(".change-name-add-btn").innerHTML = 'Add';
        }
        else{
            const inputWork = input.value;
            const description = document.querySelector('#type_description').value;
            const prioritize = document.querySelector("#type_task").value;
            const day = document.querySelector("#input_date").value;
        
            const work = {
                name: inputWork,
                description: description,
                prioritize: prioritize,
                due: day,
            }

            arrayFinish.push(0);

            arrayStorage.push(work);
            arrayItem.push(`<li class="${work.prioritize}">
            <span class="content">${work.name}</span>
            <span class="pointFinish">0</span>
            <span class="edit"><i class="fas fa-edit"></i></span>
            <span class="delete"><i class="fas fa-trash-alt"></i></span>
            </li>`);
        }
    }
    else{
        alert('Please enter your task!');
    }

    localStorage.setItem('items', JSON.stringify(arrayStorage));
    localStorage.setItem('all_items', JSON.stringify(arrayItem));

    localStorage.setItem('finish', JSON.stringify(arrayFinish))

    showItems(arrayItem);
    
    // reset Inputbox
    input.value = '';
    document.querySelector("#input_date").value = '';
    document.querySelector("#type_description").value = '';
    
})


//show items
function showItems(arrayItem){
    let items = [];
    arrayItem.forEach((tab, i) => {
        items.push(tab);
    })

    document.querySelector('.to-do-list').innerHTML = items.join('');

    localStorage.setItem('i', todo.innerHTML);

    //Function edit and delete items
    deleteItem();
    editItem();
    chooseItemToWork();
}


function deleteItem(){

    let del = document.querySelectorAll(".delete");
    del.forEach((tab, i) => {
        tab.addEventListener('click', (e) => {
            e.stopPropagation();

            arrayStorage.splice(i, 1);
            localStorage.setItem('items', JSON.stringify(arrayStorage));

            arrayItem.splice(i, 1);
            // console.log(items,'items');
            localStorage.setItem('all_items', JSON.stringify(arrayItem));

            //Xóa số lần hoàn thành của item
            arrayFinish.splice(i,1);
            localStorage.setItem('finish', JSON.stringify(arrayFinish))
            
            showItems(arrayItem);
            localStorage.setItem('i', todo.innerHTML);

            // Reset add button
            resetAddButton();
        })
    })
    
    //Reset input box when to-do-list empty
    if(arrayStorage.length == 0){
        input.value = '';
        document.querySelector('.to-do-list').innerHTML = 'To-do-list is empty now!';
        document.querySelector('.to-do-list').style.textAlign = 'center';

        // Change score
        document.querySelector('.result_pomodoro').innerHTML = '0';
        localStorage.setItem('score', '0');

        // Change select value
        document.querySelector('.filter').value = 'all';

        // Chang save button to Add button if it's exiting
        if(add_btn.id != 'add_task'){
            //Rsset id for add_btn
            add_btn.id = 'add_task';
            
            // Reset content of add_Btn card
            document.querySelector(".change-name-add-btn").innerHTML = 'Add';
        }
    }
}


function editItem() {

    let edit = document.querySelectorAll('.edit');
    edit.forEach((tab, i) => {
        tab.addEventListener('click', ()=> {
            // show input
            document.querySelector('.add_list').classList.add("display_Flex");

            input.value = arrayStorage[i].name;
            document.querySelector('#type_description').value = arrayStorage[i].description;
            document.querySelector('#type_task').value = arrayStorage[i].prioritize;
            document.querySelector('#input_date').value = arrayStorage[i].due;
            
            //Set id for add_btn
            add_btn.id = `${i}`;

            // Set content of add_Btn card
            document.querySelector(".change-name-add-btn").innerHTML = 'Save';
            document.querySelector(".change-name-add-btn").style.border = 'none';

            // Change font-family for input
            document.querySelector('#input').style.fontFamily = "'Josefin Sans', sans-serif";
            document.querySelector('#input').style.fontSize = '18px';
            
            localStorage.setItem('all_items', JSON.stringify(arrayItem));
            localStorage.setItem('i', todo.innerHTML);
        })

        // Filter it again
        filterTodoList();
    })
}

function chooseItemToWork() {
    
    let work = document.querySelector('.to-do-list').childNodes;
    work.forEach((tab, i) => {
        tab.addEventListener('click', () => {
        
            for(let k =0; k < arrayItem.length; k++){
                if(i == k){
                    if(document.querySelector('.to-do-list').childNodes[k].children[0].className.includes('completeItem')){
                        //Add class ='completeItem' for span.content
                        arrayItem[k] = `<li class="chooseItem ${arrayStorage[k].prioritize}">
                        <span class="content completeItem">${arrayStorage[k].name}</span>
                        <span class="pointFinish">${arrayFinish[k]}</span>
                        <span class="edit"><i class="fas fa-edit"></i></span>
                        <span class="delete"><i class="fas fa-trash-alt"></i></span>
                    </li>`;
                    }
                    else{
                        arrayItem[k] = `<li class= "chooseItem ${arrayStorage[k].prioritize}">
                        <span class="content">${arrayStorage[k].name}</span>
                        <span class="pointFinish">${arrayFinish[k]}</span>
                        <span class="edit"><i class="fas fa-edit"></i></span>
                        <span class="delete"><i class="fas fa-trash-alt"></i></span>
                    </li>`; 
                    }
                }
                else{
                    if(document.querySelector('.to-do-list').childNodes[k].children[0].className.includes('completeItem')){
                        //Add class ='completeItem' for span.content
                        arrayItem[k] = `<li class="${arrayStorage[k].prioritize}">
                        <span class="content completeItem">${arrayStorage[k].name}</span>
                        <span class="pointFinish">${arrayFinish[k]}</span>
                        <span class="edit"><i class="fas fa-edit"></i></span>
                        <span class="delete"><i class="fas fa-trash-alt"></i></span>
                    </li>`;
                    }
                    else{
                        arrayItem[k] = `<li class="${arrayStorage[k].prioritize}">
                        <span class="content">${arrayStorage[k].name}</span>
                        <span class="pointFinish">${arrayFinish[k]}</span>
                        <span class="edit"><i class="fas fa-edit"></i></span>
                        <span class="delete"><i class="fas fa-trash-alt"></i></span>
                    </li>`;
                    }
                }
            }

            localStorage.setItem('all_items', JSON.stringify(arrayItem));

            localStorage.setItem('i', todo.innerHTML);

            //ShowItem
            showItems(arrayItem); 
        })
    })
}



//=========== Time ===========//
start_Btn.style.display = 'inline-block';
pause_Btn.style.display = 'none';
skip_Btn.style.display = 'none';


//Click nút Pomodoro
pomodoro_Btn.addEventListener('click', pomodoro_Funct);
function pomodoro_Funct() {
    //clearInterval
    clearInterval(countDownTime);

    //Đổi màu nền
    document.querySelector('body').classList.remove('color');
    
    document.querySelector('.active_PomodoroAndBreakTime').classList.remove('active_PomodoroAndBreakTime');
    pomodoro_Btn.classList.add('active_PomodoroAndBreakTime');
    
    document.querySelector('#minute').innerHTML = setting.minutePomodoro;
    document.querySelector('#second').innerHTML = '00';
    
    start_Btn.style.display = 'inline-block';
    pause_Btn.style.display = 'none';
    skip_Btn.style.display = 'none';
}

//Click nút BreakTime
breaktime_Btn.addEventListener('click', breakTime_Funct);
function breakTime_Funct() {
    //clearInterval
    clearInterval(countDownTime);

    //Đổi màu nền
    document.querySelector('body').classList.add('color');
    
    document.querySelector('.active_PomodoroAndBreakTime').classList.remove('active_PomodoroAndBreakTime');
    breaktime_Btn.classList.add('active_PomodoroAndBreakTime');
    
    document.querySelector('#minute').innerHTML = setting.minuteBreaktime;
    document.querySelector('#second').innerHTML = '00';
    
    start_Btn.style.display = 'inline-block';
    pause_Btn.style.display = 'none';
    skip_Btn.style.display = 'inline-block';
};


let countDownTime; //Biến setInterval đếm giờ
let score;  //Số việc hoàn thành
let second;
let minute;


//Click nút START
start_Btn.addEventListener('click', starting);
function starting() {
    // Dark Mode
    if(setting.darkMode && document.body.classList.contains('active_dark_mode') == false){
        darkMode();
    }

    //update interface
    start_Btn.style.display = 'none';
    pause_Btn.style.display = 'inline-block';
    skip_Btn.style.display = 'inline-block';

    
    minute = Number(document.querySelector('#minute').innerHTML);
    second = Number(document.querySelector('#second').innerHTML);
    //setInterval
    countDownTime = setInterval(() => {
        if(second == 0){ 
            second =5;           
            if(minute >0){
                minute--;
            }
            
            // interface
            if(second < 10){
                document.querySelector('#second').innerHTML = `0${second}`;
                document.querySelector('#minute').innerHTML = `${minute}`;
            }
            else{
                document.querySelector('#second').innerHTML = `${second}`;
                document.querySelector('#minute').innerHTML = `${minute}`;
            }
        }
        else{
            //Giảm second
            second--;

            // Interface
            if(second < 10){
                document.querySelector('#second').innerHTML = `0${second}`;
                document.querySelector('#minute').innerHTML = `${minute}`;
            }
            else{
                document.querySelector('#second').innerHTML = `${second}`;
                document.querySelector('#minute').innerHTML = `${minute}`;
            }
        }

        if(second == 0 && minute == 0){
            //clearInterval
            clearInterval(countDownTime);

            //Reset lại darkmode
            if(document.body.classList.contains('active_dark_mode')){
                darkMode();
            }

            //Chuyển đổi giao diện giữa Pomodoro và Breaktime
            if(document.querySelector('.active_PomodoroAndBreakTime').id == 'pomodoro'){
                if(document.querySelector('.chooseItem')){
                    score = Number(document.querySelector(".result_pomodoro").innerHTML);
                    score++;
                    localStorage.setItem('score', JSON.stringify(score));

                    document.querySelector(".result_pomodoro").innerHTML = `${score}`;
                }
                complete();
                breakTime_Funct();

                // Auto start Breaktime
                if(setting.autoStart_Breaktime){
                    starting();
                }

                // Auto Switch task
                if(setting.autoStart_Switch){
                    switchTask();
                }
            }
            else{
                pomodoro_Funct();

                // Auto start Pomodoro 
                if(setting.autoStart_Pomodoro){
                    starting();
                }
            }
        }
    }, 1000);

    document.querySelector('.add_list').classList.remove('display_Flex');
    // Reset add button
    resetAddButton();
}

//Click PAUSE
pause_Btn.addEventListener('click', ()=> {
    //clearInterval
    clearInterval(countDownTime);

    //Update Interface
    start_Btn.style.display = 'inline-block';
    skip_Btn.style.display = 'inline-block';
    pause_Btn.style.display = 'none';
})

//click SKIP
skip_Btn.addEventListener('click', ()=> {
    //clearInteral
    clearInterval(countDownTime);

    //Reset lại darkmode
    if(document.body.classList.contains('active_dark_mode')){
        darkMode();
    }

    //Chuyển đổi giao diện giữa Pomodoro và Breaktime
    if(document.querySelector('.active_PomodoroAndBreakTime').id == 'pomodoro'){
        if(document.querySelector('.chooseItem')){
            score = Number(document.querySelector(".result_pomodoro").innerHTML);
            score++;
            localStorage.setItem('score', JSON.stringify(score));

            document.querySelector(".result_pomodoro").innerHTML = `${score}`;
        }
        complete();
        breakTime_Funct();

        // Auto start Breaktime
        if(setting.autoStart_Breaktime){
            starting();
        }

         // Auto Switch task
         if(setting.autoStart_Switch){
            switchTask();
        }
    }
    else{
        pomodoro_Funct();

        // Auto start Pomodoro  
        if(setting.autoStart_Pomodoro){
            starting();
        }
    }
})


// Auto Switch Task
function switchTask(){
    let task = document.querySelector(".to-do-list").childNodes;
    console.log(task);
    let index = -1;
    for(let i = 0; i < task.length; i++){
        if(task[i].className.includes('chooseItem')){
            index = i;
            // task[index].classList.remove('chooseItem');
            arrayItem[index] =  `<li class="${arrayStorage[index].prioritize}">
            <span class="content completeItem">${arrayStorage[index].name}</span>
            <span class="pointFinish">${arrayFinish[index]}</span>
            <span class="edit"><i class="fas fa-edit"></i></span>
            <span class="delete"><i class="fas fa-trash-alt"></i></span>
        </li>`;
        }
    }
    console.log(index, 'index');

    if(index != -1 && (index +1) <= task.length){
        // task[index +1].classList.add('chooseItem');
        arrayItem[index + 1] =  `<li class=" chooseItem ${arrayStorage[index +1].prioritize}">
        <span class="content completeItem">${arrayStorage[index+1].name}</span>
        <span class="pointFinish">${arrayFinish[index+1]}</span>
        <span class="edit"><i class="fas fa-edit"></i></span>
        <span class="delete"><i class="fas fa-trash-alt"></i></span>
    </li>`;
    }

    localStorage.setItem('all_items', JSON.stringify(arrayItem));
    localStorage.setItem('i', todo.innerHTML);

    //ShowItem
    showItems(arrayItem); 
}

//Complete function đánh dấu việc hoàn thành
function complete() {
    for(let i = 0; i < arrayItem.length; i++) {
        if(document.querySelector('.to-do-list').childNodes[i].classList.contains('chooseItem')){
            let countComplete = arrayFinish[i];
            countComplete++;
            arrayFinish[i] = countComplete;
            
            //Add class ='completeItem' for span.content
            arrayItem[i] = `<li class="chooseItem ${arrayStorage[i].prioritize}">
            <span class="content completeItem">${arrayStorage[i].name}</span> 
            <span class="pointFinish">${arrayFinish[i]}</span>
            <span class="edit"><i class="fas fa-edit"></i></span>
            <span class="delete"><i class="fas fa-trash-alt"></i></span>
            </li>`;
        }
    }
    localStorage.setItem('finish', JSON.stringify(arrayFinish));
    
    localStorage.setItem('all_items', JSON.stringify(arrayItem));
    
    showItems(arrayItem);
    
    localStorage.setItem('i', todo.innerHTML);
}
// Click done now
document.querySelector('#done_now').addEventListener('click', ()=>{
    complete();
    if(document.querySelector('.chooseItem')){
        score = Number(document.querySelector(".result_pomodoro").innerHTML);
        score++;
        localStorage.setItem('score', JSON.stringify(score));

        document.querySelector(".result_pomodoro").innerHTML = `${score}`;
    }
});


//Uncomplete function đánh dấu việc chưa được hoàn thành
function unComplete() {
    for(let i = 0; i < arrayItem.length; i++) {
        if(document.querySelector('.to-do-list').childNodes[i].classList.contains('chooseItem')){
            let countComplete = arrayFinish[i];
            countComplete--;
            if(countComplete < 0){
                countComplete = 0;
            }
            arrayFinish[i] = countComplete;
            
            //Add class ='completeItem' for span.content
            if(countComplete == 0){
                arrayItem[i] = `<li class="chooseItem ${arrayStorage[i].prioritize}">
                <span class="content">${arrayStorage[i].name}</span> 
                <span class="pointFinish">${arrayFinish[i]}</span>
                <span class="edit"><i class="fas fa-edit"></i></span>
                <span class="delete"><i class="fas fa-trash-alt"></i></span>
                </li>`;
            }
            else{
                arrayItem[i] = `<li class="chooseItem ${arrayStorage[i].prioritize}">
                <span class="content completeItem">${arrayStorage[i].name}</span> 
                <span class="pointFinish">${arrayFinish[i]}</span>
                <span class="edit"><i class="fas fa-edit"></i></span>
                <span class="delete"><i class="fas fa-trash-alt"></i></span>
                </li>`;
            }
        }
    }
    localStorage.setItem('finish', JSON.stringify(arrayFinish));
    
    localStorage.setItem('all_items', JSON.stringify(arrayItem));
    
    showItems(arrayItem);
    
    localStorage.setItem('i', todo.innerHTML);
}
// click Un_done
document.querySelector("#un_done").addEventListener('click', ()=> {
    unComplete();

    if(document.querySelector('.chooseItem')){
        score = Number(document.querySelector(".result_pomodoro").innerHTML);
        score--;
        if(score < 0){
            score = 0;
        }
        localStorage.setItem('score', JSON.stringify(score));

        document.querySelector(".result_pomodoro").innerHTML = `${score}`;
    }
} )



// Filter
document.querySelector(".filter").addEventListener('change', filterTodoList);
// document.querySelector(".filter_prioritize").addEventListener('change', filterTodoList);

function filterTodoList(){
    let filterTodo = todo.childNodes;
    let filterContent = document.querySelector('.filter');
    switch(filterContent.value){
        case 'all':
            filterTodo.forEach((todos, index) =>{
                todos.style.display = 'flex';
            })
            break;
            
            case 'done':
                filterTodo.forEach((todos, index) =>{
                    if(todos.children[0].classList.contains('completeItem')){
                        todos.style.display = 'flex';
                    }
                    else{
                    todos.style.display = 'none';
                }
            })
            break;
            
            case 'undone':
                filterTodo.forEach((todos, index) =>{
                    if(todos.children[0].classList.contains('completeItem') == false){
                        todos.style.display = 'flex';
                    }
                    else{
                        todos.style.display = 'none';
                    }
                })
                break;
                case 'prioritize_1':
                    filterTodo.forEach((todos, index) =>{
                        if(todos.classList.contains('prioritize_1')){
                            todos.style.display = 'flex';
                        }
                        else{
                            todos.style.display = 'none';
                        }
                    })
                    break;
                    case 'prioritize_2':
                        filterTodo.forEach((todos, index) =>{
                            if(todos.classList.contains('prioritize_2')){
                                todos.style.display = 'flex';
                            }
                            else{
                                todos.style.display = 'none';
                            }
                        })
                        break;
                        case 'prioritize_3':
                            filterTodo.forEach((todos, index) =>{
                                if(todos.classList.contains('prioritize_3')){
                                    todos.style.display = 'flex';
                                }
                                else{
                                    todos.style.display = 'none';
                                }
                            })
                            break;
                            case 'another':
                                filterTodo.forEach((todos, index) =>{
                if(todos.classList.contains('another')){
                    todos.style.display = 'flex';
                }
                else{
                    todos.style.display = 'none';
                }
            })
            break;
    }

    localStorage.setItem('saveFilter', filterContent.value);
}
    
    

