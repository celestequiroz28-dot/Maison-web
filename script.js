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
    const openModal = () => {
        modal.style.display = 'flex';
        // Focus en el primer input para mejor UX
        applyForm.querySelector('input[type="text"]')?.focus();
    };
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
        const formData = new FormData(applyForm);
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
        if (!aiChat.classList.contains('hidden')) {
            chatInput.focus();
        }
    });

    closeChat?.addEventListener('click', () => {
        aiChat.classList.add('hidden');
    });

    // Base de datos extendida de respuestas del AI con elocuencia
    const AI_RESPONSES = {
        flores: "Las flores son para quienes carecen de estructura visual. En cambio, invierte en flores de seda de Hermès con arranjo de orquídeas negras. O mejor aún, lleva flores en tu atuendo: bordados florales en Valentino, no en tu florero.",
        
        primavera: "Primavera es el momento de siluetas arquitectónicas. Olvida lo pastel. Blanco óptico, negro carbón, beige de arena. Lino italiano, algodón pima. Gabardina estructurada. Tu presencia debe ser el color principal.",
        
        vogue: "Vogue dicta tendencias. Pero si necesitas seguir a Vogue, ya perdiste. El poder está en establecer tu propio lenguaje visual. Las verdaderas iconos no leen Vogue, Vogue lee sus movimientos.",
        
        tendencia: "Las tendencias son para quienes carecen de estilo propio. Invierte en piezas arquitectónicas que trascienden temporadas. Un corte perfecto nunca pasa de moda.",
        
        casting: "Jeans negros impecables, camiseta blanca perfecta, y tu estructura ósea. Si necesitas esconderte detrás del maquillaje, no estás lista. El casting valida o rechaza tu presencia pura.",
        
        rojo: "El rojo no es solo color, es declaración de guerra. Úsalo solo si estás lista para que toda la habitación se gire al entrar. De lo contrario, usa negro y deja que te encuentren.",
        
        negro: "Negro es la única respuesta correcta. Negro absorbe lujo. Negro dice: no necesito distracción visual. Negro es poder contenido. Negro es siempre correcto.",
        
        oro: "Oro puro, no chapado. Cartier, Bulgari, Van Cleef. Si brilla tanto que duele mirar, entonces es oro verdadero. El falso oro es traición a tu valor.",
        
        bolso: "El bolso es tu firma. Hermès Kelly o Birkin. O nada. Un bolso correcto define épocas. Naomi lo llevaba así, Cindy de esta forma. El bolso es tu declaración de jerarquía.",
        
        zapatos: "Manolo Blahnik, Christian Louboutin, o arquitecto desconocido que entiende que el tacón es engineering, no decoración. Cada paso debe ser silencioso pero audible.",
        
        encaje: "Encaje es confianza suprema. Solo llévalo si controlas tu cuerpo completamente. El encaje no oculta, revela intención. Dolce & Gabbana entiende esto mejor que nadie.",
        
        minimalismo: "Minimalismo es maximalismo en reversa. Menos ropa, mejor ropa. Menos opciones, más poder. Cada pieza debe justificar su existencia.",
        
        lujo: "El lujo verdadero no brilla. El lujo susurra. Si necesitas gritar que es caro, no es lujo. El verdadero lujo es invisibilidad de lo excepcional.",
        
        estructura: "La estructura es todo. En ropa, en pose, en presencia. Un blazer con estructura adecuada es más importante que cualquier accesorios. Invierte en arquitectura.",
        
        pasarela: "La pasarela es donde se dicta la visión. No es democracia, es jerarquía visual. Las mejores supermodels no andan, esculpen el espacio.",
        
        supermodelo: "Naomi. Cindy. Linda. Christy. Todas entendían: presencia es más importante que belleza. Belleza es accidental. Presencia es entrenamiento, es poder, es elección.",
        
        fotografía: "Herb Ritts transformó moda en escultura. Peter Lindbergh capturó verdad. La fotografía correcta es iluminación, no retoques. El grano fílmico dice más que cualquier filtro.",
        
        material: "Lino italiano. Algodón pima. Seda pura. Cuero que envejece bien. Los materiales verdaderos se reconocen por tacto. Si tienes que preguntarle al vendedor, no es lujo.",
        
        cuerpo: "Tu cuerpo es tu mejor prenda. La ropa debe amplificarlo, no cubrirlo. Si no confías en tu cuerpo, no deberías confiar en el diseñador.",
        
        presencia: "La presencia es lo que no puedes comprar. Es control. Es certeza. Es saber que ocupas espacio justificadamente. Eso es lo que las mejores modelos llevaban en los 90s.",
        
        paparazzi: "Los paparazzi iban tras Naomi porque su presencia era tan fuerte que necesitaban documentarla. No era sobre belleza, era sobre poder. Eso es lo que buscamos.",
        
        default: "Tu pregunta requiere reflexión más profunda. La moda no es sobre respuestas rápidas. Es sobre intención, precisión, y certeza absoluta en cada elección que haces. ¿Realmente sabes por qué llevas lo que llevas?"
    };

    // Palabras clave para cada respuesta - expandidas y más específicas
    const KEYWORDS_MAP = {
        flores: ['flores', 'floral', 'primaveras'],
        primavera: ['primavera', 'verano', 'estación', 'temporada'],
        vogue: ['vogue', 'revista', 'editorial'],
        tendencia: ['tendencia', 'trendy', 'moda', 'viral'],
        casting: ['casting', 'agencia', 'modelo', 'selección', 'prueba'],
        rojo: ['rojo', 'colorido', 'color'],
        negro: ['negro', 'dark', 'oscuro'],
        oro: ['oro', 'joyería', 'joyas', 'cartier', 'bulgari'],
        bolso: ['bolso', 'bolsa', 'hermès', 'kelly', 'birkin', 'cartera'],
        zapatos: ['zapatos', 'tacones', 'manolo', 'louboutin', 'calzado'],
        encaje: ['encaje', 'transparencia', 'dolce', 'gabbana'],
        minimalismo: ['minimalismo', 'simple', 'esencial', 'básico'],
        lujo: ['lujo', 'lujoso', 'premium', 'alto valor'],
        estructura: ['estructura', 'blazer', 'arquitectura', 'corte'],
        pasarela: ['pasarela', 'runway', 'desfile', 'show'],
        supermodelo: ['naomi', 'cindy', 'linda', 'christy', 'supermodelo', 'modelo'],
        fotografía: ['fotografía', 'herb', 'lindbergh', 'meisel', 'foto'],
        material: ['lino', 'algodón', 'seda', 'cuero', 'tejido', 'material'],
        cuerpo: ['cuerpo', 'forma', 'silueta', 'postura'],
        presencia: ['presencia', 'aura', 'energía', 'poder'],
        paparazzi: ['paparazzi', '90s', 'noventa', 'flash', 'grano fílmico']
    };

    function addMessage(text, sender) {
        const msgDiv = document.createElement('div');
        msgDiv.classList.add('message', sender === 'user' ? 'user-msg' : 'ai-msg');
        msgDiv.textContent = text;
        chatBody.appendChild(msgDiv);
        // Usar scrollIntoView para mejor compatibilidad
        msgDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }

    function addTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'ai-msg', 'typing-indicator');
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatBody.appendChild(typingDiv);
        typingDiv.scrollIntoView({ behavior: 'smooth', block: 'end' });
        return typingDiv;
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
        if (!userText) return;

        addMessage(userText, 'user');
        chatInput.value = '';

        // Mostrar indicador de tipeo
        const typingDiv = addTypingIndicator();

        // Simular pensamiento del AI con delay realista
        const timeout = setTimeout(() => {
            // Remover indicador de tipeo
            typingDiv.remove();
            
            const aiResponse = getAIResponse(userText);
            addMessage(aiResponse, 'ai');
        }, 1500 + Math.random() * 1000); // Entre 1.5 y 2.5 segundos

        // Guardar timeout para posible cancelación futura
        chatInput.dataset.pendingTimeout = timeout;
    }

    sendBtn?.addEventListener('click', handleChat);
    
    chatInput?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleChat();
        }
    });
});
