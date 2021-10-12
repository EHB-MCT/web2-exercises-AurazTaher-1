window.onload = function(){
let url = baseurl + 't=avengers';
GamepadHapticActuator(url).then(result => )

}

async function getData(){
    let response = await fetch(url);
    return await response.json();
}