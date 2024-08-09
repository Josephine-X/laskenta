function lisaaOsio(){
    const elem=document.getElementById('lisaaosio');
    console.log(elem);
    !elem.classList.contains('on')?elem.classList.add('on'):elem.classList.remove('on');
    }
async function luoOsio(id){
    const nimi=document.getElementById('nimiosio').value;
    const elem=document.getElementById('osiot');
    const res= await fetch('/uusiosio',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:`{"nimi":"${nimi}","id":"${id}"}`
    })
    const uusid=await res.text();
    console.log(uusid)
    location.reload();
    const el=document.getElementById('lisaaOsio').getElementsByClassName('sulje')[0];
    sulje(el);
    /*const uus=document.createElement('div');
    uus.classList.add('osio');
    uus.innerHTML=`
    <svg width="40" height="40" viewBox="0 0 40 40" stroke-linecap="round" stroke-width="4">
    <line x1="5" x2="35" y1="20" y2="20" transform="rotate(-45 20 20)"/>
    <line x1="5" x2="35" y1="20" y2="20" transform="rotate(45 20 20)" />
    </svg>
    <a href="/${id}/${uusid.replace('"','').replace('"','')}" ><div>${nimi}</div></a>`
    elem.append(uus);*/
}
function uusiVaihe(){
    const elem=document.getElementById('uusiVaihe');
    const vaiheet=document.getElementById('vaiheet');
    !elem.classList.contains('on')?elem.classList.add('on'):elem.classList.remove('on'); 
    if(vaiheet.children.length){
        
    }

}
function lisaaVaiheet(tyyppi,aihe,nimi,arr,vaiheid){
    const elem=document.getElementById('vaiheetel');
    const div=document.createElement('DIV');
    div.classList.add('vaihe');
    div.innerHTML=`
    <a href="/" class="muuta" onclick="Muuta(${tyyppi},${aihe},${nimi}})">Muuta</a>
    <svg width="40" height="40" viewBox="0 0 40 40" stroke-linecap="round" stroke-width="4" stroke="rgb(180,180,180)" class="poistavaihe" onclick="poistavaihe()">
    <line x1="5" x2="35" y1="20" y2="20" transform=rotate(-45 20 20) />
    <line x1="5" x2="35" y1="20" y2="20" transform="rotate(45 20 20)" />
    </svg>
    <p class="vaiheid">${vaiheid}</p>
    <p class="tyyppi">${tyyppi}</p>
    <p class="aihe">${aihe}</p>
    <p class="vaihenimi">${nimi}</p>
    `;
    for(let i=0;i<arr.length;i++){
        div.innerHTML=div.innerHTML+`<p class="tunniste">${arr[i]}</p>`;
    }
    console.log(div)
    elem.append(div);
    patkat()
    sulje(document.getElementById('uusiVaihe').getElementsByClassName('sulje')[0])
}
async function lisaaVaihe(id,osioid){
    const nimi=document.getElementById('nimivaihe').textContent;
    const tyyppistr=document.getElementById('tyyppivaihe').value;
    const aihe=document.getElementById('aihevaihe').value;
    const tunnisteetList=document.getElementById('tunnisteet').children;
    const nimekkeetList=document.getElementById('nimekkeet').children;
    const arrt=tunnisteet(tunnisteetList);
    const arrn=tunnisteet(nimekkeetList);
    const arr=arrt.concat(arrn);
    const tyyppi=tyyppistr.replace(",",".");
    if(!isNaN(Math.floor(tyyppi))){
        //console.log(arr)
    const res=await fetch('/lisaavaihe',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:`{"id":"${id}","osioid":"${osioid}","tyyppi":"${tyyppi}","aihe":"${aihe}","nimi":"${nimi}","tunnisteet":"${arr}"}`
    })
    if(!res.ok){
        
    }else{
        //const vaiheid=await res.text();
        //lisaaVaiheet(tyyppi,aihe,nimi,arr,vaiheid);
        location.reload();
    }}
}
function avaa(e){
    let el=e.nextElementSibling.children[0];
    for(let i=0;el;el=el.nextElementSibling){
        !el.classList.contains('on')?el.classList.add('on'):el.classList.remove('on');
    }
}
function uusValinta(e,cb){
    console.log(e.target.parentElement)
    const elem=e.target.parentElement.previousElementSibling;
    elem.textContent=e.target.textContent;
    elem.classList.add('valintac');
    avaa(elem);
    cb?cb(e.target.textContent):'';
}
function lisaaTunniste(aa,elem){
    const uusel=document.createElement('p');
    uusel.innerHTML=aa;
    uusel.addEventListener('click',(event)=>{
        event.target.remove();
    })
    elem.append(uusel);
}

function patkat(){
    const elemm=document.getElementById('svg');
    const vaiheet=document.getElementById('vaiheetel');
    let el=vaiheet.children[0];
    let leveys=0;
    let arr=[]
    for(let i=0;elemm.children[0];i++){
        elemm.children[0].remove();
    }
    for(let i=0;el;el=el.nextElementSibling){
        let aa=Math.abs(el.getElementsByClassName('tyyppi')[0].textContent);
        arr.push(aa)
        leveys=leveys+aa;
    }
    let x=0;
    arr.forEach((i,j)=>{
        let width=1200*(i/leveys);
        let fill;
        (j+2)%2===0?fill='rgb(140,145,135)':fill='rgb(180,185,175)';
        const uusel=document.createElementNS('http://www.w3.org/2000/svg','rect');
        uusel.setAttribute('x',x);
        uusel.setAttribute('y',0);
        uusel.setAttribute('width',width)
        uusel.setAttribute('height',30);
        uusel.setAttribute('fill',fill);
        elemm.append(uusel);
        const erotin=document.createElementNS('http://www.w3.org/2000/svg','line');
        erotin.setAttribute('x1',x);
        erotin.setAttribute('x2',x);
        erotin.setAttribute('y1',0);
        erotin.setAttribute('y2',40);
        erotin.setAttribute('stroke','white');
        elemm.append(erotin);
        const tunniste=document.createElementNS('http://www.w3.org/2000/svg','text');
        tunniste.setAttribute('x',x+width/2);
        tunniste.setAttribute('y',22);
        tunniste.textContent=i;
        tunniste.setAttribute('font-size',18);
        elemm.append(tunniste);
        console.log(elemm.innerHTML);
        x=x+width;
    })
}

function kokoo(arr){
    let uusarr=[];
   for(let i=0;i<arr.length;i++){
    let k=0;
    for(let j=0;j<arr.length;j++){
        if(arr[j]===arr[i]){
            k++;
        }
    }
    let elem=k>1?k + " " + arr[i]:arr[i];
    !uusarr.includes(elem)?uusarr.push(elem):'';
   }
   console.log(uusarr)
   return uusarr;
}
function tunnisteet(elems){
    let el=elems[0]
    let arr=[];
    for(let i=0;el;el=el.nextElementSibling){
        arr.push(el.textContent)
    }
    return kokoo(arr);
}
function edellinen(){
    console.log("TT")
}
function muuta(a,b,c){
    
}
function sulje(elem){
    let el=elem;
    for(;el.tagName!=='svg';el=el.parentElement){
        
    }
    el.parentElement.classList.remove('on');
}
function sivu(){
    const elem=document.getElementById('sivu');
    !elem.classList.contains('sivuon')?elem.classList.add('sivuon'):elem.classList.remove('sivuon');
}
async function poistavaihe(e,docid,osioid){
    let el=e.target;
    for(;el.tagName!=='svg';el=el.parentElement){

    }
    const vaiheid=el.parentElement.getElementsByClassName('vaiheid')[0].textContent;
    const res=await fetch('/poistavaihe',{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:`{"docid":"${docid}","osioid":"${osioid}","vaiheid":"${vaiheid}"}`
    })
    if(res.ok){
        location.reload();
    }
}
async function poistaosio(e,docid,osioid){
    let el=e.target;
    for(;el.tagName!=='svg';el=el.parentElement){

    }
    const res = await fetch(`/poistaosio`,{
        method:'post',
        headers:{
            'Content-Type':'application/json'
        },
        body:`{"docid":"${docid}","osioid":"${osioid}"}`
    })

    if(res.ok){
        el.parentElement.remove();
    }
}
function edellinen(){
    const vaiheet=document.getElementById('vaiheet');
    if(vaiheet.children){
        const elem=document.getElementById('uusiVaihe');
        const vaihe=vaiheet.children[vaiheet.children.length-1];
        const vaihetiedot=vaihe.getElementsByTagName('p');
        for(let i=0;i<vaihetiedot.length;i++){

        }
        
    }
}
