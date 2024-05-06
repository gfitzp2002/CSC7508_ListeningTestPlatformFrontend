import { useSpring, animated } from 'react-spring';
import correctImage from '../images/earThumbsUp.png';
import incorrectImage from '../images/thinkingEar.png';


const EarAnimation = ({ isCorrect }) => {
    const animationProps = useSpring({
        to: { opacity: isCorrect !== null ? 1 : 0, transform: 'scale(1)', y:10 },
        from: { opacity: 0, transform: 'scale(0)', y:50 },
        reset: true,
    });
  

    const imageSrc = isCorrect ? correctImage : incorrectImage;

    return (
        <animated.div style={{ ...animationProps,  position: 'fixed', top: '60%', left: '70%', transform: 'translate(-50%, -50%)', zIndex: 1000 }} data-testid="ear-animation">
            <img src={imageSrc} alt={isCorrect ? 'Correct!' : 'Wrong Answer!'} style={{ width: '20vw', height: '20vw' }} />
        </animated.div>
    );          
     
};
  
  export default EarAnimation;