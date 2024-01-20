import { useSpring, animated } from 'react-spring';
import correctImage from '../images/earThumbsUp.png';
import incorrectImage from '../images/earSad.png';


const EarAnimation = ({ isCorrect }) => {
    const animationProps = useSpring({
        to: { opacity: isCorrect !== null ? 1 : 0, transform: 'scale(1)', y:10 },
        from: { opacity: 0, transform: 'scale(0)', y:100 },
        reset: true,
    });
  

    const imageSrc = isCorrect ? correctImage : incorrectImage;

    return (
        <animated.div style={{ ...animationProps, position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1000 }}>
            <img src={imageSrc} alt={isCorrect ? 'Correct!' : 'Wrong Answer!'} style={{ width: '10vw', height: '10vw' }} />
        </animated.div>
    );          
     
};
  
  export default EarAnimation;