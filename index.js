let search=document.getElementById("search");
let searchbtn=document.getElementById("searchbtn");
let place=document.getElementById("place");
let prain=document.getElementById("prain");
let tem=document.querySelectorAll("#tem");
let spc=document.getElementById("spc");
let winds=document.getElementById("winds");
let rain=document.getElementById("rain");
let wmi=document.getElementById("wmi");
let img1=`<img src="./img/cs.png" alt="">`
let img2=`<img src="./img/sunw.png" alt="">`
let img3=`<img src="./img/rain.png" alt="">`
let img4=``


searchbtn.onclick=(async()=>{
    let search_val=search.value
    if (search_val=='') {
        alert("Enter a City name")
    } else {
        try {
            let url=`https://api.openweathermap.org/data/2.5/weather?q=${search_val}&appid=7a08b718ea6c46d4466ce23fd33bfed0`
            let fet=await fetch(url)
            let res=await fet.json()
            if (res.cod == 404) {
                alert("Enter a valid city name")
            } 
            else if(res.cod == 200) {
                let temperature=res.main.temp-273.15
                let fl=res.main.feels_like-273.15
                let wind=res.wind.speed
                let humidity=res.main.humidity
                let pcr= Math.min(Math.max(0.1 * temperature + 0.2 * humidity, 0), 100);
                console.log(res)
                place.innerHTML=search_val.toUpperCase();
                prain.innerHTML=`chance of raining:${pcr.toFixed(1)}%`
                tem.forEach((e)=>{
                    // console.log(e)
                    e.innerHTML=`${temperature.toFixed(1)}<sup>o</sup>`

                })
                // tem.innerHTML=`${temperature.toFixed(1)}<sup>o</sup>`
                spc.innerHTML=`${fl.toFixed(1)}<sup>o</sup>`
                winds.innerHTML=`${wind}km/h`
                rain.innerHTML=`${pcr.toFixed(1)}%`
                // uvip.innerHTML=`${uvIndex.toFixed(1)}`
                if (humidity >= 60 && pcr >= 35) {
                    wmi.innerHTML=`${img3}`
                } 
                else if (humidity == 100 || pcr >= 50) {
                    wmi.innerHTML=`${img3}`
                }
                else if (humidity <=30 || pcr <= 13) {
                    wmi.innerHTML=`${img2}`
                }
                else {
                    wmi.innerHTML=`${img1}`
                }

            }
            else{
                console.log("first")
            }
        } catch (error) {
            console.log(error)
            alert(error)
        }
    }
})
