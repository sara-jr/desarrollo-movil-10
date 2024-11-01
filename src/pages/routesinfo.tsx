import React, { useState } from 'react';

const RoutesInfo: React.FC = () => {
  const [showPriceDetails, setShowPriceDetails] = useState(false);
  const [showDisruptionDetails, setShowDisruptionDetails] = useState(false);

  const togglePriceDetails = () => {
    setShowPriceDetails(!showPriceDetails);
    setShowDisruptionDetails(false); // Oculta "Imprevistos" al mostrar "Precios"
  };

  const toggleDisruptionDetails = () => {
    setShowDisruptionDetails(!showDisruptionDetails);
    setShowPriceDetails(false); // Oculta "Precios" al mostrar "Imprevistos"
  };

  return (
    <div>
      <h1>Información de las Rutas</h1>
      {/* Integración del iframe de Google Maps */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d59775.30896045332!2d-101.24927884219365!3d20.548947977131018!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x842c85620c777f7f%3A0x7c12f8801a05151b!2sBarlovento!5e0!3m2!1ses!2smx!4v1730095152852!5m2!1ses!2smx"
        width="100%"
        height="450"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
      
      <div style={{ 
        marginTop: '20px', 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '10px' 
      }}>
        <button onClick={togglePriceDetails}>Precios</button>
        <button onClick={toggleDisruptionDetails}>Imprevistos</button>
      </div>

      {/* Sección de detalles de precios */}
      {showPriceDetails && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>Detalles de Precios</h2>
          <p>Precio Adulto: $20</p>
          <p>Precio Estudiante: $15</p>
          <p>Precio Tercera Edad: $10</p>
          {/* Agrega más información de precios aquí según sea necesario */}
        </div>
      )}

      {/* Sección de detalles de imprevistos */}
      {showDisruptionDetails && (
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <h2>Detalles de Imprevistos</h2>
          <p>Desvío en la ruta 5 debido a obras de construcción.</p>
          <p>Retrasos en la ruta 3 por condiciones climáticas.</p>
          {/* Agrega más información de imprevistos aquí según sea necesario */}
        </div>
      )}
    </div>
  );
};

export default RoutesInfo;
