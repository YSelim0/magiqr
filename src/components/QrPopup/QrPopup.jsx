import './QrPopup.css';
import OpenLinkSvg from '../../assets/open-link.svg';

function QrPopup({ selectedQrCode, setQrPopup }) {
    return (
        <div className='popup'>
            <div className='popup-content'>
                <div className='popup-content-header'>
                    {
                        /^(ftp|http|https):\/\/[^ "]+$/.test(selectedQrCode.text) ?
                            <h3>
                            <a href={selectedQrCode.text} target='_blank' rel='noreferrer'>
                                <img src={OpenLinkSvg} alt='svg-icon' />
        
                                { selectedQrCode.text }
                            </a>
                            </h3>
                        :
                            <h3>{ selectedQrCode.text }</h3>
                    }
                </div>

                <div className='popup-content-body'>
                    <img src={selectedQrCode.url} alt='qr-code' width={350} />
                </div>

                <div className='popup-content-footer'>
                    <button><a download href={selectedQrCode.url}>Download as JPG</a></button>
                    <button onClick={() => setQrPopup(false)}>Close</button>
                </div>
            </div>
        </div>
    );
}

export default QrPopup;