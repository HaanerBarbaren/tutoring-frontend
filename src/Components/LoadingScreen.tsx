import css from "../styles/LoadingScreen.module.scss";
import { useRef, useEffect } from "react";
import lottie from "lottie-web";

function LoadingScreen(props: { loaded: boolean }) {
  const loading = useRef(null);

  useEffect(() => {
    if (loading.current) {
      lottie.loadAnimation({
        container: loading.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: require("../assets/animations/loading.json"),
      });
    }
  });
  if (!props.loaded) {
    return (
      <div
        className={css.LoadingScreen}
        style={{ opacity: props.loaded ? 0 : 1 }}
      >
        <div className={css.loading_animation} ref={loading}></div>
      </div>
    );
  } else return null;
}

export default LoadingScreen;
