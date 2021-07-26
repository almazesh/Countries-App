const Routes = 
    {
        getAll:'all',
        region:'region'
    }




const navbarList = document.querySelector('.navbarList')
const container = document.querySelector('.row')
const regionData = [
    {
        id:1,
        title:'All countries',
        route:'all'
    },
    {
        id:2,
        title:'Africa',
        route:'africa'
    },
    {
        id:3,
        title:'Americas',
        route:'americas'
    },
    {
        id:4,
        title:'Asia',
        route:'asia'
    },
    {
        id:5,
        title:'Europe',
        route:'europe'
    },
    {
        id:6,
        title:'Oceania',
        route:'oceania'
    }
]

window.addEventListener('load' , () =>{
    const navbarLists = regionData.map(({title , route}) =>{
        return newTemp(title , route)
    }).join('')

    navbarList.innerHTML = navbarLists


    getDate(Routes.getAll , res =>{
        const cardList = res.map(({name , flag , capital ,region}) =>{
            return cardTemplate(name , flag ,  capital , region)
        }).join('')

        container.innerHTML = cardList
    })
})




function cardTemplate(countryName , image , capital , region){
    return `
        <div class="col-xl-4 mt-3 mb-3">
            <div class="card" style="height:400px">
                <div class="card-header text-center">
                    <h5>${countryName}</h5>
                </div>
                <div class="card-image">
                    <img src=${image} class="w-100" style="height:250px; object-fit:cover">
                </div>
                <div class="card-body">
                    <h5>Capital: ${capital}</h5>
                    <h5>Region: ${region}</h5>
                </div>
            </div>
        </div>
    `
}






function newTemp(title , route){
    return `
        <li class="nav-item">
            <button onclick="chooseReg('${route.trim()}')" class="btn nav-link">${title}</button>
        </li>
    `
}








function getDate(endPoint , cb){
    fetch(`https://restcountries.eu/rest/v2/${endPoint}`)
    .then(res => res.json())
    .then(r => {
        cb(r)
    })
}


function chooseReg(route){
    if(route === 'all'){
        getDate(Routes.getAll , res =>{
            const cardList = res.map(({name , flag , capital ,region}) =>{
                return cardTemplate(name , flag ,  capital , region)
            }).join('')
    
            container.innerHTML = cardList
        })
    }else{
        getDate(`${Routes.region}/${route}` , res =>{
            const cardList = res.map(({name , flag , capital ,region}) =>{
                return cardTemplate(name , flag ,  capital , region)
            }).join('')
    
            container.innerHTML = cardList
        })
    }
}



const searchName = document.querySelector('.searchName')
const select = document.querySelector('.select')
select.addEventListener('change' , e =>{
    var value = e.target.value;

    if(value === 'name'){
        searchName.setAttribute('placeholder' , 'Search by Name')
    }else{
        searchName.setAttribute('placeholder' , 'Search by Capital')
    }
})



searchName.addEventListener('input' , e=>{
    var selectValue = select.value;
    if(e.target.value == '') return ;

    if(selectValue === 'name'){
        getDate(Routes.getAll , res =>{
            const cardL = res.map(({name , flag , capital , region}) =>{
                if(name.includes(e.target.value)){
                    return cardTemplate(name , flag ,  capital , region)
                }
            }).join('')
            container.innerHTML = cardL
        })
    }else{
        getDate(Routes.getAll , res =>{
            const cardL = res.map(({name , flag , capital , region}) =>{
                if(capital.includes(e.target.value)){
                    return cardTemplate(name , flag ,  capital , region)
                }
            }).join('')
            container.innerHTML = cardL
        })
    }
    
})