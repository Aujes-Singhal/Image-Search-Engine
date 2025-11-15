let input=document.querySelector(".search-box input")
let btn=document.querySelector(".btn button")
let images=document.querySelector(".images")
let load=document.querySelector("#load")
let downloadBtn=document.querySelector(".download")

const accessKey = "lQa4JYt_Qq1Zl6kjIBOABBbpl5VVRCo0DChDV6LVdl4";
let page=1;
let keyword=""

function download(imageurl){
    fetch(imageurl).then(res=>res.blob()).then(file=>{
        let a = document.createElement("a")
        a.href = URL.createObjectURL(file)
        a.download = new Date().getTime()
        a.click() 
    }).catch(()=>alert("failed download"))
}

async function getResponse() {
    keyword=input.value
    let url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`
    let response = await fetch(url)
    let data=await response.json()
    let results=data.results;
       if(page==1){
        images.innerHTML="";
    }
    load.style.display="block"
    results.map((result)=>{
        let li = document.createElement("li")
        li.classList.add("image")
        let html=`<img src="${result.urls.small}" alt="img" class="photo">
                <div class="details">
                    <div class="user">
                        <img src="" alt="camera">
                        <span>${result.alt_description}</span>
                    </div>
                    <div class="download" onclick="download('${result.urls.small}')">
                        <img src="" alt="download">
                    </div>
                </div>`
                li.innerHTML=html
                images.appendChild(li)

    })
}

btn.addEventListener("click",()=>{
    page=1
    getResponse()
})

load.addEventListener("click",()=>{
    page++;
    getResponse()
})

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        page = 1;
        getResponse();
    }
});