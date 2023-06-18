import './QrItem.css';
import OpenLinkSvg from '../../assets/open-link.svg';

function QrItem({ qrCode, deleteQrCode, openQrPopup}) {
    return (
      <div className='qr-item'>
          <img src={qrCode.url} alt='qr-code' title='Show in Popup' onClick={() => openQrPopup(qrCode)} />

          <div className='details'>
            <div className='description'>
              { 
                /^(ftp|http|https):\/\/[^ "]+$/.test(qrCode.text) ?
                  <h3>
                    <a href={qrCode.text} target='_blank' rel='noreferrer'>
                      <img src={OpenLinkSvg} alt='svg-icon' />

                      { qrCode.text }
                    </a>
                  </h3>
                :
                  <h3>{ qrCode.text }</h3>
              }
              
              <p>{ qrCode.createDate }</p>
            </div>

            <div className='edit'>
              <a download href={qrCode.url}>Download as JPG</a>

              <button
                className='delete-btn'
                onClick={() => deleteQrCode(qrCode)}
              >
                delete
              </button>
            </div>
          </div>
      </div>
    );
}

export default QrItem;