//ArrayStorage lưu nội dung text
let arrayStorage = localStorage.getItem('items') ? JSON.parse(localStorage.getItem('items')) : [];

//ArrayItem lưu nội dung toàn bộ các thẻ li của ul (dùng để display giao diện)
let arrayItem = localStorage.getItem('all_items') ? JSON.parse(localStorage.getItem('all_items')) : [];

//ArrayFinish lưu số lần làm việc hoàn thành của 1 item
let arrayFinish = localStorage.getItem('finish') ? JSON.parse(localStorage.getItem('finish')) : [];

let input = document.querySelector("#input");
let add_btn = document.querySelector('#add_task');

let t = document.querySelector('.to-do-list');

function saveItem(){
    // Save completed works
    if(Number(localStorage.getItem('score')) != 0){
        document.querySelector(".result_pomodoro").innerHTML = localStorage.getItem('score');
    }
    else{
        document.querySelector(".result_pomodoro").innerHTML = '0';
    }

    //save to-do List
    t.innerHTML = localStorage.getItem('i');

    deleteItem();
    editItem();
    chooseItemToWork();
}
saveItem();

// Add task 
add_btn.addEventListener('click', ()=> {
    if(input.value != ''){
        if(add_btn.id != 'add_task'){
            arrayStorage[add_btn.id] = input.value;

            arrayItem[add_btn.id] =      //Add class ='chooseItem' => Xác định item vừa sửa
            `<li class= "chooseItem">    
                <span class="content">${input.value}</span>
                <span class="pointFinish">${arrayFinish[add_btn.id]}</span>
                <span class="edit">Sửa</span>
                <span class="delete">Xóa</span>
            </li>`

            //Rsset id for add_btn
            add_btn.id = 'add_task';
            
            // Reset content of add_Btn card
            document.querySelector(".change-name-add-btn").innerHTML = 'Add Task';
        }
        else{
            arrayFinish.push(0);

            arrayStorage.push(input.value);
            arrayItem.push(`<li>
            <span class="content">${input.value}</span>
            <span class="pointFinish">0</span>
            <span class="edit">Sửa</span>
            <span class="delete">Xóa</span>
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

    localStorage.setItem('i', t.innerHTML);

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
            localStorage.setItem('i', t.innerHTML);
        })
    })
    
    //Reset input box when to-do-list empty
    if(document.querySelector('.to-do-list').children.length == 0){
        input.value = '';
        document.querySelector('.to-do-list').innerHTML = 'To-do-list is empty now!';
        document.querySelector('.to-do-list').style.textAlign = 'center';

        document.querySelector('.result_pomodoro').innerHTML = '0';
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

            localStorage.setItem('all_items', JSON.stringify(arrayItem));
            localStorage.setItem('i', t.innerHTML);
        })
    })
}


function chooseItemToWork() {
    let work = document.querySelectorAll("li");
    work.forEach((tab, i) => {
        tab.addEventListener('click', () => {
        
            for(let k =0; k < arrayItem.length; k++){
                if(i == k){
                    if(document.querySelectorAll('li')[k].children[0].className.includes('completeItem')){
                        //Add class ='completeItem' for span.content
                        arrayItem[k] = `<li class="chooseItem">
                        <span class="content completeItem">${arrayStorage[k]}</span>
                        <span class="pointFinish">${arrayFinish[k]}</span>
                        <span class="edit">Sửa</span>
                        <span class="delete">Xóa</span>
                    </li>`;
                    }
                    else{
                        arrayItem[k] = `<li class= "chooseItem">
                        <span class="content">${arrayStorage[k]}</span>
                        <span class="pointFinish">${arrayFinish[k]}</span>
                        <span class="edit">Sửa</span>
                        <span class="delete">Xóa</span>
                    </li>`; 
                    }
                }
                else{
                    if(document.querySelectorAll('li')[k].children[0].className.includes('completeItem')){
                        //Add class ='completeItem' for span.content
                        arrayItem[k] = `<li>
                        <span class="content completeItem">${arrayStorage[k]}</span>
                        <span class="pointFinish">${arrayFinish[k]}</span>
                        <span class="edit">Sửa</span>
                        <span class="delete">Xóa</span>
                    </li>`;
                    }
                    else{
                        arrayItem[k] = `<li>
                        <span class="content">${arrayStorage[k]}</span>
                        <span class="pointFinish">${arrayFinish[k]}</span>
                        <span class="edit">Sửa</span>
                        <span class="delete">Xóa</span>
                    </li>`;
                    }
                }
            }

            localStorage.setItem('all_items', JSON.stringify(arrayItem));

            localStorage.setItem('i', t.innerHTML);

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


//Đánh dấu chuyển từ Làm việc sang breaktime và ngược lại
// let flag = true;
// let minute;
// let second;

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
        minute--;
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
        if(second == 0 && minute != 0){
            second = 5;
            minute--;
        }

        if(minute == 0 && second == 0){
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
})

//Complete function đánh dấu việc hoàn thành
function complete() {
    for(let i = 0; i < arrayItem.length; i++) {
        if(document.querySelectorAll('li')[i].className === 'chooseItem'){

            let countComplete = arrayFinish[i];
            countComplete++;
            arrayFinish[i] = countComplete;
            
            //Add class ='completeItem' for span.content
            arrayItem[i] = `<li class="chooseItem">
            <span class="content completeItem">${arrayStorage[i]}</span> 
            <span class="pointFinish">${arrayFinish[i]}</span>
            <span class="edit">Sửa</span>
            <span class="delete">Xóa</span>
            </li>`;
        }
    }
    localStorage.setItem('finish', JSON.stringify(arrayFinish));
    
    localStorage.setItem('all_items', JSON.stringify(arrayItem));
    

    showItems(arrayItem);
    
    localStorage.setItem('i', t.innerHTML);
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
