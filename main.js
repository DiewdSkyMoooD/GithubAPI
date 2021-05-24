const d=document;
let $principal=d.getElementById('principal');
let $repositorios=d.getElementById('repositorios');
let $usuario=d.getElementById('usuario');
let $btn=d.getElementById('boton');
$btn.addEventListener('click',getGithub)

 async function getGithub(){
    let res=await fetch(`https://api.github.com/users/${$usuario.value}`);
    let json= await res.json();
    let res2=await fetch(`https://api.github.com/users/${$usuario.value}/repos`);
    let json2=await res2.json();
    manipulacion(json, json2);
}

function manipulacion(res, res2){
    $principal.innerHTML='';

    let fragmentPrincipal=d.createDocumentFragment();
    let fragmentRepositorios=d.createDocumentFragment();
    let img=d.createElement('img');
    let name=d.createElement('h4');
    let nickname=d.createElement('p');
    let follow_following=d.createElement('p');
    img.setAttribute('src',res.avatar_url);
    nickname.textContent=res.login;
    name.textContent=res.name;
    follow_following.textContent=`Seguidores ${res.followers}/ Siguiendo ${res.following}`;
    
    res2.forEach(el => {
        let boton=d.createElement('button');
        boton.textContent=el.full_name;
        boton.setAttribute('src',el.html_url);
        fragmentRepositorios.appendChild(boton)
        console.log(el)
    });

    fragmentPrincipal.appendChild(img);
    fragmentPrincipal.appendChild(name);
    fragmentPrincipal.appendChild(nickname);
    fragmentPrincipal.appendChild(follow_following);
    $principal.appendChild(fragmentPrincipal);
    $repositorios.appendChild(fragmentRepositorios);
    
}

