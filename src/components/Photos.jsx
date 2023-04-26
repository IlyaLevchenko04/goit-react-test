import longStick from '../images/longStick.svg';
import Ellipse from '../images/Ellipse.svg';
import Logo from '../images/Logo.svg';
import message from '../images/message1.svg';

export const Photos = () => {
  return (
    <>
      <img src={message} alt="" className="message" />
      <img src={longStick} alt="" className="long-stick"></img>
      <img src={Ellipse} alt="" className="elipse"></img>
      <img src={Logo} alt="logo" className="logo" />
    </>
  );
};
