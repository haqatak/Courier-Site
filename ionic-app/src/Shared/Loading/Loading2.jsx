import { Player } from "@lottiefiles/react-lottie-player";
import sandyLoading from "../../assets/LoadingBall.json";

const Loading2 = ({ size = 250, overlay = true }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {overlay && (
        <div className="absolute inset-0 bg-neutral/50 backdrop-blur-sm"></div>
      )}
      <Player
        autoplay
        loop
        speed={1.5} // adjust speed
        src={sandyLoading}
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default Loading2;
