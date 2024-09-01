import { useState, useEffect } from 'react';
import { ReactComponent as CheckMarkIcon } from "../../../img/check-mark.svg";
import './styles.css'


const TemporaryMessage = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    showDiv();
  }, []);

  const showDiv = () => {
    setIsVisible(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  };

  return (
    <div className='temporary-message_container'>
      {isVisible ? (
        <div className="temporary-message">
          <span>File has been uploaded</span> <CheckMarkIcon />
        </div>
      ) : "Upload file"}
    </div>
  );
};

export default TemporaryMessage;