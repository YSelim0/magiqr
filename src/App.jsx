import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import './App.css';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import QrItem from './components/QrItem/QrItem';
import QrPopup from './components/QrPopup/QrPopup';

function App() {
  const [inputText, setInputText] = useState('');
  const [qrCodes, setQrCodes] = useState([]);
  const [qrPopup, setQrPopup] = useState(false);
  const [selectedQrCode, setSelectedQrCode] = useState(null);

  const generateQrCode = () => {
    if (!inputText) {
      return;
    }

    QRCode.toDataURL(inputText, {type: 'image/jpeg'}, function (err, url) {
      let qrCode = {
        id: generateUniqueId(),
        text: inputText,
        url,
        createDate: getFormattedDateTime()
      };

      setQrCodes([qrCode, ...qrCodes]);

      window.localStorage.setItem('qrCodes', JSON.stringify([qrCode, ...qrCodes]));

      setInputText('');
    });
  };

  const deleteQrCode = (qrCode) => {
    const newQrCodes = qrCodes.filter((item) => item.id !== qrCode.id);

    setQrCodes(newQrCodes);

    window.localStorage.setItem('qrCodes', JSON.stringify(newQrCodes));
  };

  const openQrPopup = (qrCode) => {
    setSelectedQrCode(qrCode);

    setQrPopup(true);
  };

  const getFormattedDateTime = () => {
    const currentDate = new Date();
    
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    const day = String(currentDate.getDate()).padStart(2, '0');
    const hours = String(currentDate.getHours()).padStart(2, '0');
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    
    const formattedDateTime = `${hours}:${minutes} ${day}.${month}.${year}`;
    return formattedDateTime;
  };

  const generateUniqueId = () => {
    const currentDate = new Date();
    const timestamp = currentDate.getTime();
    
    const uniqueId = `id_${timestamp}`;
    return uniqueId;
  };

  useEffect(() => {
    let qrCodes = window.localStorage.getItem('qrCodes');

    if (qrCodes) {
      setQrCodes(JSON.parse(qrCodes));
    }
  }, []);

  return (
    <div className='app'>
      <Header />

      <div className='input-row container'>
        <input
          type='text'
          placeholder='Enter the text'
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          onKeyDown={(e) => e.key === 'Enter' && generateQrCode() }
        />

        <button onClick={() => generateQrCode()}>
          Generate
        </button>
      </div>

      <div className='content-container container'>
        {
          qrCodes.map((qrCode, index) => (
            <QrItem qrCode={qrCode} deleteQrCode={deleteQrCode} openQrPopup={openQrPopup} key={index} />
          ))
        }
      </div>

      {
        qrPopup && <QrPopup selectedQrCode={selectedQrCode} setQrPopup={setQrPopup} /> 
      }
      <Footer />
    </div>
  );
}

export default App;
