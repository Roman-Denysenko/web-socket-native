import './styles.css'

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const button = document.querySelector('.button');
const messages = document.querySelector('.messages');

const URL = `ws://chat.shas.tel`

const ws = new WebSocket(`${URL}`);

ws.onopen = function () {
    alert(`Сonnect ${URL}`)

    form.addEventListener('submit', onSendMessage);
   
}

function onSendMessage(e) {
    e.preventDefault();
    const message = {
         from: 'My',
       message: e.currentTarget.elements.query.value,
    };
    
      
    e.currentTarget.elements.query.value = '';
     console.log(JSON.stringify(message));
    ws.send(JSON.stringify(message) );
}

function addMessage(text,from) {

    const domElement = document.createElement('li');
    domElement.innerHTML = `<b>${from}</b> 
    <p>${text}</p>`;

    messages.append(domElement);

}

ws.onclose = function () {
    ws.onopen();
}

ws.onmessage = function (event) {
    const { data } = event;
    JSON.parse(data).forEach(m => {
        const arrMessage = { text:m.message , from:m.from };

        addMessage(m.message,m.from )
    
    } )
   
  
}
