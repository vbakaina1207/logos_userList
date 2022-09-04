let nameRegExp = /^[A-z]?[a-z]{4,16}$/;
let passRegExp = /^[\w\.\-]{4,16}$/;
let emailRegExp = /^[\w\.\-]{1,}@[a-zA-Z]+\.[a-z]{2,4}$/;
let card = document.forms.form1;
let login = card.login;
let pass = card.pass;
let email = card.email;
let n = 0;
let table = document.querySelector('#table');
let rowCount = 0;
let userIndex = 0;

let dataUser= [];
let person = {
    login: "",
    password: "",
    email: ""
    }
    
function validFields(func, param) {
    if (login.value !=='' && email.value !=='' && pass.value !=='' &&  (login.style.borderColor == 'green' || login.style.borderColor == 'lightgray') && (pass.style.borderColor == 'green' || pass.style.borderColor == 'lightgray') && (email.style.borderColor == 'green' || email.style.borderColor == 'lightgray')) {    
        func(param);
    } else {
        alert ('Всі поля повинні бути валідні')
    }   
}

document.querySelector('#add').addEventListener('click', function(){
    validFields(addUser) ;
})


function testRegExp(exp, e, mes){       
    if(exp.test(e.value)){        
        e.style.border = '1px solid green';    
        e.setCustomValidity('');     
    }
    else{
        e.style.border = '1px solid red';
        e.setCustomValidity(mes);        
    } 
}       

login.addEventListener('input', function(){  
    testRegExp(nameRegExp, login, 'Please provide a valid Login');        
})

pass.addEventListener('input', function(){      
    testRegExp(passRegExp, pass, 'Please provide a valid Password');         
})

email.addEventListener('input', function(){  
    testRegExp(emailRegExp, email, 'Please provide a valid Email');             
})


function addUser() {
    n = dataUser.length;
    person = {
        login: login.value,
        password: pass.value,
        email: email.value
    }
    dataUser.push(person);
    login.value = '';
    pass.value = '';
    email.value = '';
    login.style.border = '1px solid lightgray';  
    pass.style.border = '1px solid lightgray';  
    email.style.border = '1px solid lightgray';  
    render(Object.values(dataUser[n]), n+1);
}

function render(data, n) {   
    let but; 
    let tr = document.createElement('tr');      
        for (let j = 0; j < 6; j++) {
            let td = document.createElement('td'); 
            if (j==0) td.innerHTML = n;
            for(let i = 0; i < 3; i++){   
                if(j<4 && j>0 && i==j-1){                
                td.innerHTML = data[i];                
            }
        }
            tr.appendChild(td);
            if (j == 4) {   
                but = document.createElement('button');  
                but.innerHTML='Edit';
                td.append(but);                
                but.classList.add('edit');
            }
            if (j == 5) {
                but = document.createElement('button'); 
                but.innerHTML='Delete';  
                td.append(but);
                but.classList.add('delete');
            }
        }        
    table.appendChild(tr); 
}


function editUser(e,arr) {
    let tr = event.target.parentElement.parentElement;
    userIndex = tr.rowIndex;
    let myArr = Object.values(arr[userIndex-1]);
    let input = document.querySelectorAll('.input');
    for(let i=0; i< myArr.length;i++){
        for (let j = 0; j< input.length; j++){
            input[i].value = myArr[i];
        }
    }    
    document.querySelector('#edit').classList.add('active');   
    document.querySelector('#add').classList.add('hide');       
}

function deleteUser(e, arr) {
    let tr = event.target.parentElement.parentElement;    
    let indRow = tr.rowIndex;
    arr.splice(indRow-1,1);
    rowCount = table.rows.length;
    for (var i = 1; i < rowCount; i++) {
        table.deleteRow(1);
    }
    for(let i=0; i< arr.length;i++){
        render((Object.values(arr[i])), i+1);
    }    
}


document.querySelector('#table').addEventListener('click', function(e){
    if (e.target.classList == 'edit') editUser(e, dataUser) ;
    if (e.target.classList == 'delete') deleteUser(e, dataUser) ;
})


function saveEditUser(obj) {
    let editObj = {
    }
    let keys = [];
    let inputs = document.querySelectorAll('.input');
    for (let j = 0; j< inputs.length; j++){
        keys[j] = inputs[j].name;
    }
    for (let i = 0; i< inputs.length; i++){
        editObj[keys[i]] = inputs[i].value;
    }
    obj.splice(userIndex-1, 1, editObj );    
    rowCount = table.rows.length;
    for (var i = 1; i < rowCount; i++) {
        table.deleteRow(1);
    }
    for(let i=0; i< obj.length;i++){
        render((Object.values(obj[i])), i+1);
    }    
    login.value = '';
    pass.value = '';
    email.value = '';
}    

document.querySelector('#edit').addEventListener('click', function(){
    validFields( saveEditUser,  dataUser ) ;
    document.querySelector('#edit').classList.remove('active');   
    document.querySelector('#add').classList.remove('hide');  
})