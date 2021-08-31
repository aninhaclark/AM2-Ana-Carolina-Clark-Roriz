const express = require("express");
const router = express.Router();

router.use(express.static('public'));

router.get('/',(req,res)=>{
    res.render('pages/home');
});

router.get('/about',(req,res)=>{ 
    res.render('pages/about');
});

router.get('/cadastro',(req,res)=>{ 
    res.render('pages/cadastro',{users: users}); 
});

router.post('/cadastro/remove',(req,res)=>{
    let name = req.body.name;

    if(users.length==0) {
        console.log("Erro: Não há elemento a ser removido!");
        return res.status(500).son({
            status:'error',
            error:`Removed element: ${name}`
        })
    } else{
        for(let cont=0; cont<users.length; cont++){
            if(users[cont].name==name){
                users.splice(cont, 1)
                console.log(name, "removido!" )
                return res.status(200).json({
                    status:'success',
                    data:users
                })
            }
        }
    }

    users.splice(name, 1);
});

router.post('/cadastro/update',(req,res)=>{
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const isValid = true;
    
    
    //validações
    if (!emailRegex.test(req.body.email)) {
        isValid == false;
    }
    if (req.body.vote.toLowerCase() != "yes" || req.body.vote.toLowerCase() != "no") {
        isValid == false;
    }
    if (typeof req.body.age != Number) {
        isValid == false;
    }
    
    
    if (isValid) {
        users[req.body.id].name=req.body.name;
        users[req.body.id].email=req.body.email;
        users[req.body.id].address=req.body.address;
        users[req.body.id].age=req.body.age;
        users[req.body.id].heigth=req.body.heigth;
        users[req.body.id].vote=req.body.vote;
    
        res.sendStatus(200);
        console.log("Dados recebidos: ",req.body);
    }

    res.sendStatus(400);
});

router.get('/cadastro/list',(req,res)=>{
    console.log("Lista: ",users);
    res.send(JSON.stringify(users));
});

router.post('/cadastro/add',(req,res)=>{
    let user = {name:"",email:"",address:"",heigth:"",age:"",vote:""};

    user.name = req.body.name;
    user.email = req.body.email;
    user.address = req.body.address;
    user.heigth = req.body.heigth;
    user.age = req.body.age;
    user.vote = req.body.vote;

    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const addressRegex = /([a-zA-Z])\w+,*([a-zA-Z])\w+/

    if (!emailRegex.test(user.email)) {
        res.sendStatus(400);
        return
    }

    if (!addressRegex.test(user.address)) {
        res.sendStatus(400);
        return
    }

    user.heigth = Number(user.heigth).toFixed(2);
    user.heigth += "m";

    users.push(user);

    res.sendStatus(200)
});

module.exports = router;