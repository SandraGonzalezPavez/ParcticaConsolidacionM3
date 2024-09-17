
document.addEventListener('DOMContentLoaded', function () {
    const chatBody = document.querySelector('.chat-body');
    const sendButton = document.querySelector('.send-btn');
    const messageInput = document.querySelector('.chat-footer input');
    const conversacionesList = document.querySelector('.conversaciones-list');
    const chatNombre = document.querySelector('.chat-nombre');
  
    // Función para agregar un mensaje a la ventana del chat
    function agregarMensaje(mensaje, tipo = 'emisor') {
      const mensajeDiv = document.createElement('div');
      mensajeDiv.classList.add('mensaje', tipo); // 'emisor' para mensajes enviados, 'receptor' para recibidos
  
      const mensajeTexto = document.createElement('p');
      mensajeTexto.textContent = mensaje;
  
      const horaSpan = document.createElement('span');
      horaSpan.classList.add('hora-mensaje');
      horaSpan.textContent = obtenerHoraActual();
  
      mensajeDiv.appendChild(mensajeTexto);
      mensajeDiv.appendChild(horaSpan);
  
      chatBody.appendChild(mensajeDiv); // Añade el mensaje al chat
      chatBody.scrollTop = chatBody.scrollHeight; // Hace scroll automáticamente al último mensaje
  
      // Actualiza la hora en las conversaciones recientes
      actualizarHoraConversacion(chatNombre.textContent);
    }
  
    // Función para obtener la hora actual en formato AM/PM
    function obtenerHoraActual() {
      const ahora = new Date();
      let horas = ahora.getHours();
      const minutos = ahora.getMinutes();
      const ampm = horas >= 12 ? 'PM' : 'AM';
      horas = horas % 12 || 12; // Convierte formato de 24h a 12h
      const minutosStr = minutos < 10 ? '0' + minutos : minutos;
      return `${horas}:${minutosStr} ${ampm}`;
    }
  
    // Función para actualizar la hora de la conversación reciente
    function actualizarHoraConversacion(nombre) {
      const conversaciones = conversacionesList.querySelectorAll('li');
      conversaciones.forEach(function (conversacion) {
        const nombreContacto = conversacion.querySelector('.nombre').textContent;
        if (nombreContacto === nombre) {
          const horaSpan = conversacion.querySelector('.hora');
          horaSpan.textContent = obtenerHoraActual();
        }
      });
    }
  
    // Función para mostrar los mensajes del chat seleccionado
    function mostrarChat(nombre) {
      // Limpia el contenido del chat
      chatBody.innerHTML = '';
  
      // Agrega mensajes de ejemplo para el chat seleccionado
      // Puedes reemplazar esto con mensajes reales de tu sistema
      if (nombre === 'Juan Pérez') {
        agregarMensaje('Hola, ¿cómo estás?', 'receptor');
        agregarMensaje('Todo bien, gracias.', 'emisor');
      } else if (nombre === 'María López') {
        agregarMensaje('¿Cómo va todo?', 'receptor');
        agregarMensaje('Muy bien, gracias.', 'emisor');
      } // Agrega más condiciones según los nombres de contactos
    }
  
    // Evento al presionar el botón de enviar
    sendButton.addEventListener('click', function () {
      const mensaje = messageInput.value.trim();
      if (mensaje !== '') {
        agregarMensaje(mensaje, 'emisor'); // Añade el mensaje enviado por el usuario
        messageInput.value = ''; // Limpia el campo de texto
      }
    });
  
    // También puedes agregar la funcionalidad de enviar con la tecla Enter
    messageInput.addEventListener('keypress', function (event) {
      if (event.key === 'Enter') {
        sendButton.click();
      }
    });
  
    // Evento para seleccionar una conversación
    conversacionesList.addEventListener('click', function (event) {
      const target = event.target;
      const listaItem = target.closest('.conversacion');
      
      if (listaItem) {
        const nombreContacto = listaItem.querySelector('.nombre').textContent;
        chatNombre.textContent = nombreContacto; // Actualiza el nombre en el chat
        mostrarChat(nombreContacto); // Muestra los mensajes del chat seleccionado
  
        // Marca como leído la conversación seleccionada
        const conversaciones = conversacionesList.querySelectorAll('li');
        conversaciones.forEach(function (conversacion) {
          conversacion.classList.remove('unread'); // Remueve la clase de no leído
        });
        listaItem.classList.remove('unread'); // Asegura que la conversación seleccionada no esté en negrita
      }
    });
  });
  
  document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-list');
    const conversacionesList = document.querySelector('.conversaciones-list');
  
    toggleButton.addEventListener('click', () => {
      conversacionesList.classList.toggle('show');
    });
  });
  