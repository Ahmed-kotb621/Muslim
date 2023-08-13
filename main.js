let countryIn = document.getElementById("country");
let stateIn = document.getElementById("state");
let submitButton = document.querySelector(".prayer .times .form button");

let dayDate = document.querySelector(".landing .text h5");
let PrayDate = document.querySelector(".prayer .date p");

// //////////////  get country and state name  /////

fetch(`https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=8`).
    then((response)=>{return response.json()}).
    then((response)=>{
        
        let dayAr  = response.data.date.hijri.weekday.ar,
            dayNum = response.data.date.hijri.day,
            monthAr= response.data.date.hijri.month.ar,
            yearAr = response.data.date.hijri.year,
            year   = response.data.date.gregorian.date;
        dayDate.textContent =`${dayAr} ${dayNum} ${monthAr} ${yearAr}  هجريه - الموافق ${year} م.`;
});


fetch(`https://api.aladhan.com/v1/timingsByCity?city=Cairo&country=Egypt&method=8`).
    then((response)=>{return response.json()}).
    then((response)=>{
        
        let dayAr  = response.data.date.hijri.weekday.ar,
            dayNum = response.data.date.hijri.day,
            monthAr= response.data.date.hijri.month.ar,
            yearAr = response.data.date.hijri.year,
            year   = response.data.date.gregorian.date;
        PrayDate.textContent =`${dayAr} ${dayNum} ${monthAr} ${yearAr}  هجريه - الموافق ${year} م.`;
});



// get countries and cities 
function getCountryAndCity(){
    fetch("https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates.json")
.then((result)=>{
    return result.json();
}).then((data)=>{
    data.forEach(element => {
        countryIn.innerHTML += `<option >${element.name}</option>`;
    });
    countryIn.onblur =function(){
        let s = countryIn.options[countryIn.selectedIndex].text;
        stateIn.innerHTML = "";
        for (let i = 0; i < data.length; i++) {
            if(data[i].name == `${s}`){
                let sttt = data[i].states;
                sttt.forEach(element => {
                    stateIn.innerHTML +=`<option >${element.name}</option>`;
                });
            }
        }
    }
});
};

getCountryAndCity();

// get date of the day 
let dateOfDay = function (){
    let date = new Date();
    return `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
};

function getPrayingTimes(){
        
    let fajrS = document.querySelector(".prayer .salah .box .fajr"),
    dhuhrS = document.querySelector(".prayer .salah .box .Dhuhr"),
    asrS = document.querySelector(".prayer .salah .box .Asr"),
    maghribS = document.querySelector(".prayer .salah .box .Maghrib"),
    ishaS = document.querySelector(".prayer .salah .box .Isha");

    submitButton.onclick = function () {
    let c = countryIn.options[countryIn.selectedIndex].text;
    let s = stateIn.options[stateIn.selectedIndex].text;


    fetch(`http://api.aladhan.com/v1/timingsByCity/${dateOfDay()}?city=${s}&country=${c}&method=5`).
    then((response)=>{return response.json()}).
    then((response)=>{
      
        return response;
    }).then((response)=>{
        let fajr = response.data.timings.Fajr,
            dhuhr =response.data.timings.Dhuhr,
            asr =response.data.timings.Asr,
            maghrib =response.data.timings.Maghrib,
            isha = response.data.timings.Isha;
        fajrS.innerHTML = `${fajr} AM`;
        parseInt(dhuhr) < 12  ? z = "AM" : z ="PM";
        dhuhrS.innerHTML = `${z} ${dhuhr}`;
        asrS.innerHTML = `PM ${asr}`;
        maghribS.innerHTML = `PM ${maghrib}`;
        ishaS.innerHTML = `PM${isha}`;
        
    });
    };

};

getPrayingTimes();

let content = document.querySelector(".quran .content");
let test =document.querySelector(".quran .test");
let pop = document.querySelector(".quran .popup");
let close = document.querySelector(".quran .popup .head button");
let popName = document.querySelector(".quran .popup h2");
let popContent = document.querySelector(".quran .popup p");
let nextButton = document.querySelector(".quran .popup .next");
let prevButton = document.querySelector(".quran .popup .prev");



fetch("https://quran-endpoint.vercel.app/quran")
.then((response)=> {
    return response.json();
}).then((data)=>{
    let response = data.data;

    // console.log(response);
    response.forEach((element)=>{
        let box = document.createElement("div"),
            surahName = document.createElement("p"),
            surahMeta = document.createElement("p");
        // console.log(element.asma.en.short);
        box.className ="box";
        let sName = document.createTextNode("fatiha"),
            smeta = document.createTextNode("7");
            
        surahName.appendChild(sName);
        surahMeta.appendChild(smeta);
        // qButton.appendChild(qSound);
        box.appendChild(surahName);
        box.appendChild(surahMeta);

        content.appendChild(box);
        surahName.innerHTML = `${element.asma.ar.long} - ${element.asma.en.short}`;
        surahMeta.innerHTML = ` اياتها ${element.ayahCount} - ${element.type.ar}`;
        box.addEventListener('click',function () {
            //////////////////////////////////////////////////
            fetch(`https://quran-endpoint.vercel.app/quran/${element.number}?imamId=15`)
            .then((data)=>{return data.json()})
            .then((data)=>{
                console.log(element.number);
                let arr =[];
                let response = data.data.ayahs;
                response.forEach((element) =>{
                    arr.push(element.text.ar + `(${element.number.insurah})`);
                    
                });
                let allText = arr.join("").toString();
                pop.style.display ="block";
                popContent.textContent = allText;
                
            });
            popName.textContent = element.asma.ar.long;
            ////////////////////////////////////////////////////
        });
    });
    
});

let audioCont = document.querySelector(".sound .audio-cont");
function popClose() {
        audioCont.style.display ="none";
        audioS.pause();
}
close.addEventListener('click',function popClose() {
                pop.style.display ="none";
});

 

// start sound 

let soundContent = document.querySelector(".sound .content");
let audioS = document.querySelector(".sound .audio");


fetch("https://quran-endpoint.vercel.app/quran")
.then((response)=> {
    return response.json();
}).then((data)=>{
    let response = data.data;

    response.forEach((element)=>{
        let box = document.createElement("div"),
            surahName = document.createElement("p"),
            surahMeta = document.createElement("p");

        box.className ="box";
        let sName = document.createTextNode("fatiha"),
            smeta = document.createTextNode("7");
            
        surahName.appendChild(sName);
        surahMeta.appendChild(smeta);

        box.appendChild(surahName);
        box.appendChild(surahMeta);

        soundContent.appendChild(box);
        surahName.innerHTML = `${element.asma.ar.long} - ${element.asma.en.short}`;
        surahMeta.innerHTML = ` اياتها ${element.ayahCount} - ${element.type.ar}`;

        box.addEventListener('click',function () {
            //////////////////////////////////////////////////
            fetch(`https://quran-endpoint.vercel.app/quran/${element.number}?imamId=15`)
            .then((data)=>{return data.json()})
            .then((data)=>{
                number = data.data.number;
                function addLeadingZeros(num, totalLength) {
                    return String(num).padStart(totalLength, '0');
                    }   
                
                audioS.src = `https://download.quranicaudio.com/quran/muhammad_siddeeq_al-minshaawee/${addLeadingZeros(number,3)}.mp3`;
                audioCont.style.display ="block";
            });
      
        });
    });
    
});

let azkarName = document.querySelector(".azkar .content");
let azkarNameP = document.querySelector(".azkar .content p");
let closeAzkar = document.querySelector(".azkar button");
let azkarPopup = document.querySelector(".azkar .popup");
let popupHead = document.querySelector(".azkar .popup h2");

let zekrcont = document.querySelector(".azkar .popup .zekr ");
let zekrRef = document.querySelector(".azkar .popup .zekr .text .ref");
let zekrDesc = document.querySelector(".azkar .popup .zekr .text .desc");
let zekrCount = document.querySelector(".azkar .popup .zekr .rep p");


fetch("json/azkar.json").then((response)=>{
    return response.json();
}).then((data)=>{
    data.forEach((element)=>{
        let p = document.createElement("p");
        p.textContent = element.category;
        azkarName.appendChild(p);
        
        p.onclick = function () {
            popupHead.textContent = element.category;
            azkarPopup.style.display = "block";
            let allZekr = element.adkar;
            allZekr.forEach((el)=>{
                console.log(el);
                let cont = document.createElement("div");
                let text = document.createElement("div");
                text.className= "text";
                let rep = document.createElement("div");
                text.className= "rep";
                let desc = document.createElement("p");
                desc.className = "desc";
                text.textContent = el.zekr;
                rep.textContent=el.count;
                desc.textContent =el.description;
                cont.appendChild(text);
                cont.appendChild(rep);
                cont.appendChild(desc);
                zekrcont.appendChild(cont);
                cont.style.cssText = "   display: flex;align-items: center;justify-content: center;flex-direction:column;border: 2px solid var(--main-color);border-radius: 10px;margin-bottom:15px;padding:10px;width:100%";

            });

        }


    });
});

closeAzkar.onclick = function () {
    azkarPopup.style.display = "none";
    zekrcont.innerHTML =" ";

};
 

let nextBut = document.querySelector(".doaa .content .next-doaa"),
    prevBut = document.querySelector(".doaa .content .prev-doaa"),
    categoryP = document.querySelector(".doaa .content .mainDoaa .category"),
    doaa = document.querySelector(".doaa .content .zekr"),
    mainDoaa = document.querySelector(".doaa .content .mainDoaa");


fetch("json/doaa.json").then((response)=>{
    return response.json();
}).then((data)=>{        
        data.forEach((el)=>{
            let doaaCategory = document.createTextNode(el.category);
            let doaaZekr = document.createTextNode(el.zekr);

            let doaa_container = document.createElement("div");

            let ctg = categoryP.appendChild(doaaCategory);
            let zek = doaa.appendChild(doaaZekr);
            

            doaa_container.appendChild(ctg);
            doaa_container.appendChild(zek);
                
            mainDoaa.appendChild(doaa_container);
            doaa_container.style.cssText = "border:1px solid var(--main-color); width:100%;margin:10px;padding:5px;border-radius:5px";
            categoryP.style.css ="font-weight: bold; font-size: 20px; margin-bottom: 20px; color: var(--main-color);"
         

        })
        

});

categoryP.style.cssText ="font-weight:bold;color:red";
 