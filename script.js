document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica del Modal para aplicar a Agencias
    const applyButtons = document.querySelectorAll('.apply-btn');
    const modal = document.getElementById('applyModal');
    const closeBtn = document.querySelector('.close-btn');
    const applyForm = document.getElementById('applyForm');

    applyButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    applyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Solicitud enviada con éxito! La agencia revisará tu perfil.');
        modal.style.display = 'none';
        applyForm.reset();
    });

    // 2. Lógica del Asistente de Imagen AI
    const aiToggle = document.getElementById('ai-toggle');
    const aiChat = document.getElementById('ai-chat');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    // Abrir/Cerrar chat
    aiToggle.addEventListener('click', () => {
        aiChat.classList.toggle('hidden');
    });

    closeChat.addEventListener('click', () => {
        aiChat.classList.add('hidden');
    });

    // Función para agregar mensajes al chat
    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(sender === 'user' ? 'user-msg' : 'ai-msg');
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight; // Scrollear al fondo
    }

    // Lógica de simulación de respuesta AI
    function handleChat() {
        const userText = chatInput.value.trim();
        if (userText === '') return;

        // Mostrar mensaje del usuario
        addMessage(userText, 'user');
        chatInput.value = '';

        // Simular tiempo de pensamiento de la IA (1 segundo)
        setTimeout(() => {
            let aiResponse = "";
            const textLower = userText.toLowerCase();

            // Lógica de palabras clave para respuestas dinámicas
            if (textLower.includes('vogue') || textLower.includes('tendencia')) {
                aiResponse = "Esta temporada en Vogue, la clave es combinar texturas. Prueba mezclar sedas ligeras con cuero estructurado.";
            } else if (textLower.includes('casting') || textLower.includes('agencia')) {
                aiResponse = "Para un casting, ve al natural: jeans ajustados negros, camiseta básica blanca, botas o tacones simples y un maquillaje 'no-makeup'. ¡Deja que tu estructura ósea resalte!";
            } else if (textLower.includes('colores') || textLower.includes('paleta')) {
                aiResponse = "Los colores tendencia son el rojo cereza profundo, el clásico negro carbón y toques de dorado opaco. ¿Quieres que analice qué color va con tu tono de piel?";
            } else {
                aiResponse = "¡Qué interesante! Como tu asistente de imagen, te sugiero siempre mantener la confianza. La ropa es importante, pero la actitud al caminar es lo que cierra los contratos.";
            }

            addMessage(aiResponse, 'ai');
        }, 1000);
    }

    sendBtn.addEventListener('click', handleChat);
    
    // Permitir enviar con la tecla Enter
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChat();
        }
    });
});