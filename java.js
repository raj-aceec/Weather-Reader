let city="Hyderabad";
let container = document.getElementById("container");
async function getWeather()
{
    try{
        city = document.getElementById('city').value;
    let res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=ba98deab6ce9cd74af9735fb0625c520&units=metric`);
    if(res==undefined){
        console.log("mai chal rha hu")
    } 
    let data = await res.json();
    console.log(data);
    appendsData(data)
    }
    catch(err)
    {
        alert("Kindly Enter Correct City");
        console.log("err:",err);
    }
}  
getWeather();
    function appendsData(data)
    {
       if(data.name==undefined)
       {
        document.getElementById("cityName").innerText="Hyderabad";
        return false;
       }  
        document.getElementById("humidity").innerText=data.main.humidity;
        document.getElementById("pressure").innerText=data.main.pressure;
        document.getElementById("wind").innerText=data.wind.speed;
        document.getElementById("rise").innerHTML=`${window.moment(data.sys.sunrise*1000).format('HH:mm a')}`;
        document.getElementById("set").innerText=`${window.moment(data.sys.sunset*1000).format('HH:mm a')}`;
        document.getElementById("map").innerHTML=null;
        let iframe = document.createElement("iframe");
        iframe.setAttribute("id","map1");
        iframe.src=`https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`;
        document.getElementById("map").append(iframe);
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        Wheather(lat,lon);
        async function Wheather(lat,lon)
        {
            try{
                let daily = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=,hourly,minutely&units=metric&appid=ba98deab6ce9cd74af9735fb0625c520`);
                let dailyData = await daily.json();
                console.log(dailyData);
                eigthDays(dailyData);
            }
            catch(err)
            {   
                console.log("err :", err);
            }
}
        function eigthDays(Data)
        {
            document.getElementById("days").innerHTML=null;
            document.getElementById("rightOne").innerHTML=null;
            for(let i=0;i<7;i++)
            {
                if(i==0)
                {
                    let divRight = document.createElement("div");
                    let loc = document.createElement("div");
                    loc.id="loc";
                    let icon = document.createElement("i");
                    icon.innerHTML=`<i id="log" class="fas fa-map-marker-alt"></i>`
                    let pTag = document.createElement("p");
                    pTag.innerText=data.name;
                    pTag.id="cityName";
                    loc.append(icon,pTag);
                    let p = document.createElement("p");
                    p.innerText=`${window.moment(Data.daily[i].dt*1000).format('ddd')}`;
                    p.id="curDay";
                    let divLogo = document.createElement("div");
                    let locImage = document.createElement("img");
                    locImage.src=`http://openweathermap.org/img/wn/${Data.daily[i].weather[0].icon}@2x.png`
                    locImage.id="wImg";
                    divLogo.append(p,locImage);
                    let tempDiv = document.createElement("div");
                    tempDiv.innerHTML=`<span id="temp">${data.main.temp}</span><span id="sel">&#176;C</span>`;
                    tempDiv.id="temp";
                    divRight.append(loc,divLogo,tempDiv);
                     document.getElementById("rightOne").append(divRight);
                }
                
                else{
                    let div = document.createElement("div");
                    let p = document.createElement("p");
                    p.innerText=`${window.moment(Data.daily[i].dt*1000).format('ddd')}`;
                    let img = document.createElement("img");
                   img.src =`http://openweathermap.org/img/wn/${Data.daily[i].weather[0].icon}@2x.png`
                    img.setAttribute("id","icon");
                    let dayCal = document.createElement("div");
                     dayCal.innerText="Max-"+Data.daily[i].temp.max;
                     dayCal.setAttribute("id","cals");
                    let nightCal = document.createElement("div");
                    nightCal.setAttribute("id","Ncals");
                    nightCal.innerText="Min-"+Data.daily[i].temp.min;
                    div.append(p,img,dayCal,nightCal);
                    document.querySelector("#days").append(div);
                }
            }
        }
    }
const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
setInterval(function()
{
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12HrsFormat = hour >=13 ? hour%12: hour;
    const minutes = time.getMinutes();
    const ampm = hour >=12 ? 'PM' : 'AM';
    console.log(hoursIn12HrsFormat);
    document.querySelector("#time").innerHTML= (hoursIn12HrsFormat <10? '0'+hoursIn12HrsFormat : hoursIn12HrsFormat) + ':' + (minutes <10? '0' +minutes :minutes) + ' ' +`<span id="ampm">${ampm}</span>`;
    document.querySelector("#date").innerHTML=days[day] + ', '+ date+' '+months[month];
   document.querySelector("#Rightdate").innerHTML=days[day] + ', '+ date+' '+months[month];
},1000);
function nightFun()
{
    document.getElementById("right").style.backgroundImage=`url("Images/img1.jpg")`;
    document.getElementById("left").style.backgroundImage=`url("Images/img2.jpeg")`;
    document.getElementById("time").style.color="white";
    document.getElementById("date").style.color="white";
    document.getElementById("night").style.backgroundColor="red";
    document.getElementById("day").style.backgroundColor="white";
    document.getElementById("days").style.backgroundColor="black";
    document.getElementById("days").style.opacity=".9";
    document.getElementById("rightOne").style.opacity=".9";
    document.getElementById("rightOne").style.backgroundImage=`url("Images/img3.jpg")`;
}
function dayFun()
{
    document.getElementById("rightOne").style.backgroundImage=`url("Images/img4.jpg")`;
    document.getElementById("right").style.backgroundColor="white";
    document.getElementById("left").style.backgroundImage=`url("Images/img5.jpg")`;
    document.getElementById("right").style.backgroundImage=`url("Images/img6.jpeg")`;
    document.getElementById("left").style.backgroundColor="rgb(237, 251, 253)";
    document.getElementById("time").style.color="white";
    document.getElementById("date").style.color="white";
    document.getElementById("night").style.backgroundColor="white";
    document.getElementById("day").style.backgroundColor="red";
    document.getElementById("days").style.backgroundColor="white";
}
