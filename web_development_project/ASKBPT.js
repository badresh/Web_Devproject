const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');
const searchEngineId = '970f1a2a322aa4624';
const apiKey = 'AIzaSyDByAeiOtS2AfC8VluEje11gDnWBHmgLeg';
sendBtn.addEventListener('click', sendMessage);
function sendMessage() {
    const query = userInput.value.trim();
    appendMessage('user', query);
    userInput.value = '';
    if (/hi/i.test(query)) {
        appendMessage('bot','Hi Badroz, How can I help you?');
    }
    else if (/hello/i.test(query)) {
        appendMessage('bot', 'Hello, How may I help you?')
    } 
    else if (/bye/i.test(query)) {
        appendMessage('bot', 'Bye, Have a nice day!!')
    }
    else if (/Seeyou/i.test(query)) {
        appendMessage('bot', 'See yaa')
    } 
    else if (/Thanks/i.test(query)) {
        appendMessage('bot', 'Youre Welcome!')
    }
    else if (/Thanks you/i.test(query)) {
        appendMessage('bot', 'Youre Welcome!')
    }
    else if (/Thank you/i.test(query)) {
        appendMessage('bot', 'Youre Welcome!')
    }
    else if (/can you help me/i.test(query)) {
        appendMessage('bot', 'Sure tell me what is it?') 
    }
    else{
        searchGoogle(query)
        .then(response => {
            const items = response.items;
            if (items && items.length > 0) {
                const topResult = items[0];
                appendMessage('bot', topResult.snippet);
            } else {
                appendMessage('bot', 'Sorry, I couldn\'t find any relevant information.');
            }
        })
        .catch(error => {
            console.error('Error searching:', error);
            appendMessage('bot', 'Sorry, an error occurred while searching.');
        });
    }
}
function appendMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message-container');
    const messageContent = document.createElement('div');
    messageContent.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageContent.innerText = message;
    messageElement.appendChild(messageContent);
    if (sender === 'user') {
        messageElement.classList.add('user-message-container');
    } else {
        messageElement.classList.add('bot-message-container');
    }
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
}
async function searchGoogle(query) {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch search results: ${response.status}`);
    }
    return await response.json();
}