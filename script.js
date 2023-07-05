//ArrayStorage lưu nội dung text
let arrayStorage = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//ArrayItem lưu nội dung toàn bộ các thẻ li của ul (dùng để display giao diện)
let arrayItem = localStorage.getItem('all_items') ? JSON.parse(localStorage.getItem('all_items')) : [];

//ArrayFinish lưu số lần làm việc hoàn thành của 1 item
let arrayFinish = localStorage.getItem('finish') ? JSON.parse(localStorage.getItem('finish')) : [];

let input = document.querySelector("#input");
let add_btn = document.querySelector('#add_task');

let todo = document.querySelector('.to-do-list');

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
    filterTodoList();
    

    deleteItem();
    editItem();
    chooseItemToWork();
}
saveItem();


// Click Add 
add_btn.addEventListener('click', ()=> {
    if(input.value != ''){
        if(add_btn.id != 'add_task'){
            arrayStorage[add_btn.id] = input.value;

            //Add class ='chooseItem' => Xác định item vừa sửa
            let edit = document.querySelectorAll('.edit');
            if(edit[add_btn.id].parentElement.children[0].classList.contains('completeItem') == false){
                arrayItem[add_btn.id] = 
                `<li class= "chooseItem">    
                    <span class="content">${input.value}</span>
                    <span class="pointFinish">${arrayFinish[add_btn.id]}</span>
                    <span class="edit"><i class="fas fa-edit"></i></span>
                    <span class="delete"><i class="fas fa-trash-alt"></i></span>
                </li>`
            }
            else{
                arrayItem[add_btn.id] = 
                `<li class= "chooseItem">    
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
            arrayFinish.push(0);

            arrayStorage.push(input.value);
            arrayItem.push(`<li>
            <span class="content">${input.value}</span>
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
    input.value = ''
    
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
        tab.addEventListener('click', () => {
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
        localStorage.setItem('saveFilter', 'all');

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
            input.value = arrayStorage[i];
            
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
                        arrayItem[k] = `<li class="chooseItem">
                        <span class="content completeItem">${arrayStorage[k]}</span>
                        <span class="pointFinish">${arrayFinish[k]}</span>
                        <span class="edit"><i class="fas fa-edit"></i></span>
                        <span class="delete"><i class="fas fa-trash-alt"></i></span>
                    </li>`;
                    }
                    else{
                        arrayItem[k] = `<li class= "chooseItem">
                        <span class="content">${arrayStorage[k]}</span>
                        <span class="pointFinish">${arrayFinish[k]}</span>
                        <span class="edit"><i class="fas fa-edit"></i></span>
                        <span class="delete"><i class="fas fa-trash-alt"></i></span>
                    </li>`; 
                    }
                }
                else{
                    if(document.querySelector('.to-do-list').childNodes[k].children[0].className.includes('completeItem')){
                        //Add class ='completeItem' for span.content
                        arrayItem[k] = `<li>
                        <span class="content completeItem">${arrayStorage[k]}</span>
                        <span class="pointFinish">${arrayFinish[k]}</span>
                        <span class="edit"><i class="fas fa-edit"></i></span>
                        <span class="delete"><i class="fas fa-trash-alt"></i></span>
                    </li>`;
                    }
                    else{
                        arrayItem[k] = `<li>
                        <span class="content">${arrayStorage[k]}</span>
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
let start_Btn = document.querySelector('#start');
let pause_Btn = document.querySelector('#pause');
let skip_Btn = document.querySelector('#skip');

let breaktime_Btn = document.querySelector('#breaktime');
let pomodoro_Btn = document.querySelector('#pomodoro');

pomodoro_Btn.classList.add('active_PomodoroAndBreakTime');
document.querySelector('#minute').innerHTML = '1';
document.querySelector('#second').innerHTML = '00';
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
    
    document.querySelector('#minute').innerHTML = '1';
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
    
    document.querySelector('#minute').innerHTML = '2';
    document.querySelector('#second').innerHTML = '00';
    
    start_Btn.style.display = 'inline-block';
    pause_Btn.style.display = 'none';
    skip_Btn.style.display = 'inline-block';
};


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

let countDownTime; //Biến setInterval đếm giờ
let score;  //Số việc hoàn thành

//Click nút START
start_Btn.addEventListener('click', ()=> {
    //update interface
    start_Btn.style.display = 'none';
    pause_Btn.style.display = 'inline-block';
    skip_Btn.style.display = 'inline-block';

    minute = Number(document.querySelector('#minute').innerHTML);
    second = Number(document.querySelector('#second').innerHTML);
    
    if(second == 0){
        second = 5;
        if(minute > 0){
            minute--;
        }
        if(second < 10){
            document.querySelector('#second').innerHTML = `0${second}`;
            document.querySelector('#minute').innerHTML = `${minute}`;
        }
        else{
            document.querySelector('#second').innerHTML = `${second}`;
            document.querySelector('#minute').innerHTML = `${minute}`;
        }
    }

    //Giảm second
    second--;
    
    //setInterval
    countDownTime = setInterval(() => {
        if(second < 10){
            document.querySelector('#second').innerHTML = `0${second}`;
            document.querySelector('#minute').innerHTML = `${minute}`;
        }
        else{
            document.querySelector('#second').innerHTML = `${second}`;
            document.querySelector('#minute').innerHTML = `${minute}`;
        }
        
        second--;
        if(second == 0 && minute > 0){
            if(second < 10){
                document.querySelector('#second').innerHTML = `0${second}`;
                document.querySelector('#minute').innerHTML = `${minute}`;
            }
            else{
                document.querySelector('#second').innerHTML = `${second}`;
                document.querySelector('#minute').innerHTML = `${minute}`;
            }
            
            second = 5;
            minute--;
        }

        if(second == 0 && minute == 0){
            //clearInterval
            clearInterval(countDownTime);

            //Update Interface
            document.querySelector('#second').innerHTML = `0${second}`;
            document.querySelector('#minute').innerHTML = `${minute}`;

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
            }
            else{
                pomodoro_Funct();
            }
        }
    }, 1000);

    // Reset add button
    resetAddButton();
})

//Complete function đánh dấu việc hoàn thành
function complete() {
    for(let i = 0; i < arrayItem.length; i++) {
        if(document.querySelector('.to-do-list').childNodes[i].className === 'chooseItem'){

            let countComplete = arrayFinish[i];
            countComplete++;
            arrayFinish[i] = countComplete;
            
            //Add class ='completeItem' for span.content
            arrayItem[i] = `<li class="chooseItem">
            <span class="content completeItem">${arrayStorage[i]}</span> 
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
    }
    else{
        pomodoro_Funct();
    }
})


// ======== When click Setting =========//
document.querySelector(".setting").addEventListener('click', openSetting);

function openSetting() {
    document.querySelector('.form_setting').classList.toggle('display_Block');

    // add position fixed for card .total_container
    document.querySelector('.total_container').classList.add("position_fixed");
}

// click Close form setting
document.querySelector(".fa-times").addEventListener('click', closeFormSetting);

function closeFormSetting(){
    document.querySelector('.form_setting').classList.remove('display_Block');

    // Remove position fixed for card .total_container
    document.querySelector('.total_container').classList.remove("position_fixed");
}


// Filter
document.querySelector(".filter").addEventListener('change', filterTodoList);
function filterTodoList(){
    let filterTodo = todo.childNodes;
    let filterContent = document.querySelector('.filter');
    switch(filterContent.value){
        case 'all':
            filterTodo.forEach((todos, index) =>{
                todos.style.display = 'flex';
            })
            localStorage.setItem('saveFilter', filterContent.value);
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
            localStorage.setItem('saveFilter', filterContent.value);
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
            localStorage.setItem('saveFilter', filterContent.value);
            break;
    }
}


// Click to set Alarm sound
document.querySelector('.alarm_sound_dropdown').addEventListener('click', ()=>{
    document.querySelector('.list_sound').classList.toggle('display_Block');
    
})

// onClick to choose Alarm Sound
function getValueAlarm(sound){
    document.querySelector('.select_sound').value = sound;
}

// click to set Ticking Sound
document.querySelector('.ticking_sound_dropdown').addEventListener('click', ()=>{
    document.querySelector('.list_ticking_sound').classList.toggle('display_Block');
    
})

// onClick to choose Ticking Sound
function getValueTicking(sound){
    document.querySelector('.select_ticking_sound').value = sound;
}