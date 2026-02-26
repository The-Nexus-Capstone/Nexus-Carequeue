import { useNavigate } from 'react-router-dom';

function BackButton({ onClick }) {
  const navigate = useNavigate();

  const handlePress = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1);
    }
  };

  return (
    <button className="back-link" onClick={handlePress} type="button">
      ← Back
    </button>
  );
}

export default BackButton;