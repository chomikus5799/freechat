const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = (event) => {
    const messages = document.getElementById("messages");
    const message = document.createElement("div");
    message.className = "message";
    
    // Sprawdzamy, czy wiadomość jest typu Blob
    if (event.data instanceof Blob) {
        const reader = new FileReader();
        
        // Kiedy FileReader skończy odczytywać, dodajemy wiadomość do DOM
        reader.onload = () => {
            message.textContent = reader.result;  // result zawiera odczytany tekst
            messages.appendChild(message);
            messages.scrollTop = messages.scrollHeight;
        };
        
        // Odczytujemy zawartość Bloba jako tekst
        reader.readAsText(event.data);
    } else {
        // Jeśli wiadomość jest już tekstem, po prostu dodajemy ją
        message.textContent = event.data;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
    }
};

ws.onopen = () => console.log("Połączono z serwerem WebSocket");

ws.onerror = (error) => console.error("Błąd WebSocket:", error);

ws.onclose = () => console.log("Połączenie WebSocket zamknięte");

function sendMessage() {
    const input = document.getElementById("messageInput");
    if (input.value.trim() !== "") {
        ws.send(input.value); // Wysyłamy wiadomość jako string
        input.value = "";
    }
}
