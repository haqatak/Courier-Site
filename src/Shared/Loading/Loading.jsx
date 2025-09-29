import { Player } from "@lottiefiles/react-lottie-player";
import sandyLoading from "../../assets/Sandy Loading.json";

const Loading = ({ size = 250, speed = 1.5 }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-primary/50 backdrop-blur-sm z-50">
    <Player
      autoplay
      loop
      speed={speed}
      src={sandyLoading}
      style={{ width: size, height: size }}
    />
  </div>
);

export default Loading;
