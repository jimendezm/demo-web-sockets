import { useEffect, useState } from 'react';
import io from 'socket.io-client';

// Conexión al servidor WebSocket
const socket = io('');

function App() {
  const [mensaje, setMensaje] = useState('');
  const [mensajes, setMensajes] = useState([]);

  useEffect(() => {
    // Escuchar mensajes de otros clientes
    socket.on('message', (msg) => {
      setMensajes((prevMensajes) => [...prevMensajes, `Cliente: ${msg}`]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  const enviarMensaje = () => {
    if (mensaje.trim() !== '') {
      socket.emit('message', mensaje); // Enviar al servidor
      setMensajes((prevMensajes) => [...prevMensajes, `Tú: ${mensaje}`]); // Mostrar como emisor
      setMensaje('');
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '2rem' }}>
      <h2>Chat en Tiempo Real</h2>
      <div style={{ border: '1px solid #ccc', padding: '1rem', height: '300px', overflowY: 'auto', marginBottom: '1rem' }}>
        {mensajes.map((msg, i) => (
          <div key={i}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={mensaje}
        onChange={(e) => setMensaje(e.target.value)}
        placeholder="Escribe un mensaje"
        style={{ width: '70%', marginRight: '1rem' }}
      />
      <button onClick={enviarMensaje}>Enviar</button>
    </div>
  );
}

export default App;
