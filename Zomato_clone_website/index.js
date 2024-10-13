import { city } from "./city.js";
import { popularCity } from "./popularCity.js";
import { resturants } from "./resturants.js";
import { clubs } from "./clubs.js";
import { cities } from "./cites.js";


console.log(resturants)

let localitiesContainerEl = document.querySelector(".localities_container")

let htmlLocalitiesList = city.map((el) => {

    return ` 
           <div class="localities_list">
                <div class="localities_card">
                     <h3>${el.name}</h3>
                    <p>${el.place ? el.place +"places" : "" }</p>
                </div>
                    <i class="fa -sharp fa-solid fa-caret-right caret-down"></i>
            </div>`

}).join("")
localitiesContainerEl.innerHTML=htmlLocalitiesList




let popularCityHtml=document.getElementById("popularCityId")
let popularCityHtmlLink = "";
for(let i = 0 ; i < popularCity.length ; i++)
    {
    console.log(popularCity[i]);
    popularCityHtmlLink +=`   
    
    <a class="popularcityName" href=${popularCity[i].link}>${popularCity[i].decs}</a>  
    <div class="dot"></div>       `
    
}
popularCityHtml.innerHTML=popularCityHtmlLink
let toggle=false;

document.getElementById("popularCityListId").addEventListener("click",()=>{
    if(toggle){
        popularCityHtml.style.display="block"
        toggle=false
        // toggle !=toggle
    }
    else{
        popularCityHtml.style.display="none"
        toggle =true

    }
   
    
})



let popularCityHtmll=document.getElementById("popularCityIdd")
let popularCityHtmlLinkk = "";
for(let i = 0 ; i < resturants.length ; i++)
    {
    console.log(resturants[i]);
    popularCityHtmlLinkk +=`   
    
    <a class="popularcityName" href=${resturants[i].link}>${resturants[i].decs}</a>  
    <div class="dot"></div>       `
    
}
popularCityHtmll.innerHTML=popularCityHtmlLinkk
// let toggle=false;

document.getElementById("popularCityListIdd").addEventListener("click",()=>{
    if(toggle){
        popularCityHtmll.style.display="block"
        toggle=false
        // toggle !=toggle
    }
    else{
        popularCityHtmll.style.display="none"
        toggle =true

    }
   
    
})



let popularCityHtmlll=document.getElementById("popularCityIddd")
let popularCityHtmlLinkkk = "";
for(let i = 0 ; i < clubs.length ; i++)
    {
    console.log(clubs[i]);
    popularCityHtmlLinkkk +=`   
    
    <a class="popularcityName" href=${clubs[i].link}>${clubs[i].decs}</a>  
    <div class="dot"></div>       `
    
}
popularCityHtmlll.innerHTML=popularCityHtmlLinkkk
// let toggle=false;

document.getElementById("popularCityListIddd").addEventListener("click",()=>{
    if(toggle){
        popularCityHtmlll.style.display="block"
        toggle=false
        // toggle !=toggle
    }
    else{
        popularCityHtmlll.style.display="none"
        toggle =true

    }
   
    
})

let popularCityHtmllll=document.getElementById("popularCityIdddd")
let popularCityHtmlLinkkkk = "";
for(let i = 0 ; i < cities.length ; i++)
    {
    console.log(cities[i]);
    popularCityHtmlLinkkkk +=`   
    
    <a class="popularcityName" href=${cities[i].link}>${cities[i].decs}</a>  
    <div class="dot"></div>       `
    
}
popularCityHtmllll.innerHTML=popularCityHtmlLinkkkk
// let toggle=false;

document.getElementById("popularCityListIdddd").addEventListener("click",()=>{
    if(toggle){
        popularCityHtmllll.style.display="block"
        toggle=false
        // toggle !=toggle
    }
    else{
        popularCityHtmllll.style.display="none"
        toggle =true

    }
   
    
})

