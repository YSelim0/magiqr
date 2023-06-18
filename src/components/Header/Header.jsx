import './Header.css';
import QrCodeLogo from '../../assets/qr-logo.png';

function Header() {
    return (
      <header className='container'>
        <h1>
          <img src={QrCodeLogo} alt='qr-logo' width={30} />

          MagiQR Generator
        </h1>
      </header>
    );
}

export default Header;