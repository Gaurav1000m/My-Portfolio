
import { config } from "../config";
import "./styles/CallToAction.css";
import { LightBeamButton } from "./LightBeamButton";
import { FiArrowRight } from "react-icons/fi";

const CallToAction = () => {
  return (
    <div className="cta-section">
      <div className="cta-buttons">
        <LightBeamButton to="/play" data-cursor="disable">
          Play With Me <FiArrowRight size={16} />
        </LightBeamButton>
        
        <LightBeamButton 
          href={config.contact.linkedin} 
          target="_blank" 
          rel="noopener noreferrer" 
          gradientColors={["#0077b5", "#00a0dc", "#0077b5"]}
          data-cursor="disable"
        >
          Hire Me <FiArrowRight size={16} />
        </LightBeamButton>
      </div>
    </div>
  );
};

export default CallToAction;
