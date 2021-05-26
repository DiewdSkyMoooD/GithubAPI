const d=document;
let $principal=d.getElementById('principal');
let $repositorios=d.getElementById('repositorios');
let $usuario=d.getElementById('usuario');
let $btn=d.getElementById('boton');
let $card=d.getElementById('card');
//add listener to button
$btn.addEventListener('click',getGithub);
//function of request fetch using async-await
 async function getGithub(){
    try{
        let res=await fetch(`https://api.github.com/users/${$usuario.value}`);
        let json= await res.json();
        let res2=await fetch(`https://api.github.com/users/${$usuario.value}/repos`);
        let json2=await res2.json();
        
        manipulacion(json, json2);
     }catch(err){
         //handle errors
        $card.innerHTML='';
        let h1=d.createElement('h1');
        h1.textContent=`No se ha encontrado usuario con ese nombre '${$usuario.value}' revise la busqueda e intente de nuevo`
        $card.appendChild(h1);
     }
    $usuario.value=''
}
// handle positive response from repos and users
function manipulacion(res, res2){
    $card.innerHTML='';
    $principal.innerHTML='';
    $repositorios.innerHTML='';
    let fragmentPrincipal=d.createDocumentFragment();
    let fragmentRepositorios=d.createDocumentFragment();
    let img=d.createElement('img');
    let name=d.createElement('h4');
    let nickname=d.createElement('p');
    let follow_following=d.createElement('p');
    let bio=d.createElement('p');
    let TituloRepos=d.createElement('h1');
    TituloRepos.textContent="Repositorios"
    img.setAttribute('src',res.avatar_url);
    nickname.textContent=res.login;
    name.textContent=res.name;
    follow_following.textContent=`Seguidores ${res.followers}/ Siguiendo ${res.following}`;
    res.bio===null?bio.textContent="Sin descripcion":`"${bio.textContent=res.bio}"`;
    fragmentRepositorios.appendChild(TituloRepos);
    res2.slice(0,7).forEach(el => {
        let a=d.createElement('a');
        let div=d.createElement('div');
        let h4=d.createElement('h4');
        h4.appendChild(a);
        div.appendChild(h4);
        div.setAttribute('id',"repos")
        a.textContent=el.full_name;
        a.setAttribute('href',el.html_url);
        fragmentRepositorios.appendChild(div);
    });
    fragmentPrincipal.appendChild(img);
    fragmentPrincipal.appendChild(name);
    fragmentPrincipal.appendChild(nickname);
    fragmentPrincipal.appendChild(follow_following);
    fragmentPrincipal.appendChild(bio);
    $principal.appendChild(fragmentPrincipal);
    $repositorios.appendChild(fragmentRepositorios);
}

