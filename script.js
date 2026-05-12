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
        alert('Portafolio recibido. Si tienes el perfil adecuado, nuestro equipo te contactará. De lo contrario, no esperes una llamada.');
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

    aiToggle.addEventListener('click', () => {
        aiChat.classList.toggle('hidden');
    });

    closeChat.addEventListener('click', () => {
        aiChat.classList.add('hidden');
    });

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message');
        msgDiv.classList.add(sender === 'user' ? 'user-msg' : 'ai-msg');
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    function handleChat() {
        const userText = chatInput.value.trim();
        if (userText === '') return;

        addMessage(userText, 'user');
        chatInput.value = '';

        setTimeout(() => {
            let aiResponse = "";
            const textLower = userText.toLowerCase();

            if (textLower.includes('flores') || textLower.includes('primavera')) {
                aiResponse = "¿Flores? ¿Para primavera? Qué innovador. Hablemos de estructuración y abrigos de corte impecable mejor.";
            } else if (textLower.includes('vogue') || textLower.includes('tendencia')) {
                aiResponse = "Las tendencias son para quienes carecen de estilo propio. Invierte en piezas de alto valor que dicten presencia, no que sigan a la masa.";
            } else if (textLower.includes('casting') || textLower.includes('agencia')) {
                aiResponse = "Jeans negros, camiseta blanca impecable y tu estructura ósea. Si necesitas esconderte detrás del maquillaje, no estás lista para la pasarela.";
            } else if (textLower.includes('rojo') || textLower.includes('color')) {
                aiResponse = "El rojo no es solo un color, es una declaración. Úsalo solo si estás lista para que toda la habitación te mire al entrar. De lo contrario, usa negro.";
            } else {
                aiResponse = "No tengo tiempo para trivialidades. Asegúrate de que lo que llevas puesto refleje exactamente cuánto vales.";
            }

            addMessage(aiResponse, 'ai');
        }, 1200);
    }

    sendBtn.addEventListener('click', handleChat);
    
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleChat();
        }
    });
});
