document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // 1. Lógica del Modal para aplicar a Agencias
    // ============================================
    
    const applyButtons = document.querySelectorAll('.apply-btn');
    const modal = document.getElementById('applyModal');
    const closeBtn = document.querySelector('.close-btn');
    const applyForm = document.getElementById('applyForm');

    // Validar que los elementos existan
    if (!modal || !applyForm) {
        console.error('Modal o formulario no encontrado en el DOM');
        return;
    }

    // Funciones reutilizables para el modal
    const openModal = () => modal.style.display = 'flex';
    const closeModal = () => modal.style.display = 'none';

    applyButtons.forEach(btn => {
        btn.addEventListener('click', openModal);
    });

    closeBtn?.addEventListener('click', closeModal);

    window.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    applyForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Portafolio recibido. Si tienes el perfil adecuado, nuestro equipo te contactará. De lo contrario, no esperes una llamada.');
        closeModal();
        applyForm.reset();
    });

    // ============================================
    // 2. Lógica del Asistente de Imagen AI
    // ============================================

    const aiToggle = document.getElementById('ai-toggle');
    const aiChat = document.getElementById('ai-chat');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const chatBody = document.getElementById('chat-body');

    // Validar elementos del chat
    if (!aiChat || !chatInput || !chatBody) {
        console.error('Elementos del chat no encontrados en el DOM');
        return;
    }

    // Validación de elementos opcionales con optional chaining
    aiToggle?.addEventListener('click', () => {
        aiChat.classList.toggle('hidden');
    });

    closeChat?.addEventListener('click', () => {
        aiChat.classList.add('hidden');
    });

    // Base de datos de respuestas del AI (más fácil de mantener)
    const AI_RESPONSES = {
        flowers: "¿Flores? ¿Para primavera? Qué innovador. Hablemos de estructuración y abrigos de corte impecable mejor.",
        trends: "Las tendencias son para quienes carecen de estilo propio. Invierte en piezas de alto valor que dicten presencia, no que sigan a la masa.",
        casting: "Jeans negros, camiseta blanca impecable y tu estructura ósea. Si necesitas esconderte detrás del maquillaje, no estás lista para la pasarela.",
        color: "El rojo no es solo un color, es una declaración. Úsalo solo si estás lista para que toda la habitación te mire al entrar. De lo contrario, usa negro.",
        default: "No tengo tiempo para trivialidades. Asegúrate de que lo que llevas puesto refleje exactamente cuánto vales."
    };

    // Palabras clave para cada respuesta
    const KEYWORDS_MAP = {
        flowers: ['flores', 'primavera'],
        trends: ['vogue', 'tendencia'],
        casting: ['casting', 'agencia'],
        color: ['rojo', 'color']
    };

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'ai-msg');
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        // Usar scrollIntoView para mejor compatibilidad
        msgDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    function getAIResponse(userText) {
        const textLower = userText.toLowerCase();

        // Buscar en el mapa de palabras clave
        for (const [key, keywords] of Object.entries(KEYWORDS_MAP)) {
            if (keywords.some(keyword => textLower.includes(keyword))) {
                return AI_RESPONSES[key];
            }
        }

        return AI_RESPONSES.default;
    }

    function handleChat() {
        const userText = chatInput.value.trim();
        if (!userText) return; // Más simple que === ''

        addMessage(userText, 'user');
        chatInput.value = '';

        // Usar AbortController para poder cancelar si es necesario
        const timeout = setTimeout(() => {
            const aiResponse = getAIResponse(userText);
            addMessage(aiResponse, 'ai');
        }, 1200);

        // Opcionalmente guardar el timeout para poder cancelarlo después
        chatInput.dataset.pendingTimeout = timeout;
    }

    sendBtn?.addEventListener('click', handleChat);
    
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // Shift+Enter para nueva línea si lo necesitas
            e.preventDefault();
            handleChat();
        }
    });
});
