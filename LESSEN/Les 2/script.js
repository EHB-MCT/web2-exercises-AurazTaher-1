let list = []
let pokemon

function getData(){
    //get data list
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151'
    .then(response => {
        return response.json()
    }))
    .then(response => { 
        response.json()
        .then(result =>  
            console.log(result)
        
            )
        list.forEach(element.url).then(response => {
            return response.json();

        }).then(data => {
            pokemon.push(data)
            console.log(pokemon)
        })
    });  
}


window.onload = function(){

    getData();

    setTimeout(buildList, 5000);

    function buildList(){
        
    }

}

getData();


