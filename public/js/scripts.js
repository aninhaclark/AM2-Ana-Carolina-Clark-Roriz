function mostraItem() {
    let form = document.querySelector(".add-form");
    let summon = document.querySelector("#add-form-call");
    let list = document.querySelector("#list-call");
    let buttons = document.querySelector(".add-form-buttons");

    for (item of form.children) {
        item.value = "";
        item.classList.remove("hidden");
    }
    
    for (item of buttons.children) {
        item.classList.remove("hidden");
    }

    list.classList.add("hidden")

    summon.classList.add("hidden");
}

function escondeItem() {
    let summon = document.querySelector("#add-form-call");

    let form = document.querySelector(".add-form");
    let list = document.querySelector("#list-call");
    
    let buttons = document.querySelector(".add-form-buttons");
    for (item of form.children) {
        item.classList.add("hidden");
    }

    for (item of buttons.children) {
        item.classList.add("hidden");
    }

    list.classList.remove("hidden")

    summon.classList.remove("hidden");
}

function listar() {
    const http = new XMLHttpRequest();

    http.open("GET", "/cadastro/list", true);
    http.setRequestHeader('Content-Type','application/json');
    http.send();

    http.onreadystatechange = ()=>{
        if (http.readyState === 4 && http.status === 200) {
            console.log(http.responseText);
            novaTabela(JSON.parse(http.responseText));
        }
    }
}

function add() {
    const http = new XMLHttpRequest();
    let data = {
        name:"",
        email:"",
        address:"",
        age:"",
        heigth:"",
        vote:""
    };

    
    data.name = document.querySelector("#userName").value;
    data.email = document.querySelector("#userEmail").value;
    data.address = document.querySelector("#userAddress").value;
    data.age = document.querySelector("#userAge").value;
    data.heigth = document.querySelector("#userheigth").value;
    data.vote = document.querySelector("#userVote").checked;
    
    if (data.vote) data.vote = "Sim";
    else data.vote = "Não";

    for (const key in data) {
        if (data[key] == "") {
            alert("Por favor certifique-se de preencher todos os dados.")
            return
        }
    }
    
    http.open("POST", "/cadastro/add", true); 
    http.setRequestHeader('Content-Type','application/json');
    dataToSend = JSON.stringify(data); 
    http.send(dataToSend);

    http.onreadystatechange = ()=>{
        if (http.readyState === 4 && http.status === 200) {
            alert("Usuário criado com sucesso!");
            document.location.reload();
        }
        else if (http.readyState === 4 && http.status === 400) {
            alert("Verifique os dados inseridos e tente novamente!");
        }
    }
}

function update(index,link){
    let tds = document.querySelectorAll(`td[data-index-row='${index}']`);
    let spans = document.querySelectorAll(`td[data-index-row='${index}'] > span`);
    let inputs = document.querySelectorAll(`td[data-index-row='${index}'] > input`);
    let lenTds = tds.length-1;
    let linkUpdate = tds[lenTds-1];
    let linkRemove = tds[lenTds];

    let lenInputs = inputs.length;

    let button = inputs[lenInputs-1]; 



    linkUpdate.className='hidden';
    linkRemove.className='hidden';
    tds[lenTds-2].className='show';

    
    for(let cont=0;cont<spans.length;cont++){
        if(spans[cont].className=="show"){
            spans[cont].className="hidden";
        } else{
            spans[cont].className="show";
        }
    }
    
    for(let cont=0;cont<inputs.length;cont++){
        if(inputs[cont].className=="hidden"){
            inputs[cont].className="show";
        }
    }

    
    button.addEventListener('click',()=>{
        const http = new XMLHttpRequest();
        const url = link;
        let data = {id:"",name:"",email:"",address:"",age:"",heigth:"",vote:""};
        let dataToSend;

        http.open("POST", link, true); 

        http.setRequestHeader('Content-Type','application/json');
        
        data.id = index;
        data.name = inputs[0].value;
        data.email = inputs[1].value;
        data.address = inputs[2].value;
        data.age = inputs[3].value;
        data.heigth = inputs[4].value;
        data.vote = inputs[5].value;

        dataToSend = JSON.stringify(data); 

        http.send(dataToSend);

        http.onload = ()=>{                
            for(let cont=0;cont<spans.length;cont++){
                if(spans[cont].className=="hidden"){
                    spans[cont].innerHTML = inputs[cont].value;
                    spans[cont].className="show";
                } else{
                    spans[cont].className="hidden";
                }
            }

            for(let cont=0;cont<inputs.length;cont++){
                if(inputs[cont].className=="show"){
                    inputs[cont].className="hidden";
                }
            }

            linkUpdate.className='show';
            linkRemove.className='show';
            tds[lenTds-2].className='hidden';
        }

        http.onreadystatechange = ()=>{
            if (http.readyState === 4 && http.status === 200) {
                console.log(http.responseText);
            }
            if (http.readyState === 4 && http.status === 400) {
                alert("Por favor verifique os dados e tente novamente.");
            }
        }
        document.location.reload();
    });  

}

function remove(index, link){
    const http = new XMLHttpRequest();
    let data = {id:""}

    http.open("POST", link, true); 
    http.setRequestHeader('Content-Type','application/json');
    data.id = index;
    dataToSend = JSON.stringify(data); 
    http.send(dataToSend);

    http.onreadystatechange = ()=>{
        if (http.readyState === 4 && http.status === 200) {
            console.log(http.responseText);
        }
    }

    document.location.reload();
}
   
function novaTabela(data){
    let tabela = document.querySelector("#list");
    let button = document.querySelector("#list-call");
    let body = tabela.querySelector("tbody");

    tabela.classList.remove("hidden");
    button.classList.add("hidden");

    for (var i = 0; i < data.length; ++i) {
        keys = Object.keys(data[i]);
        var row = document.createElement('tr');
        
        for (var j=0; j < 6; j++){
            var newCell =  row.insertCell(j);
            newCell.innerHTML = '<span>'+data[i][keys[j]]+'</span>';
        }

        body.appendChild(row);
    }
}


   




