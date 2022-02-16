import css from "../styles/loginPage.module.scss";
import { useState, useRef, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { OurContext } from "../OurContext";
import { useContext } from "react";
import lottie from "lottie-web";

import { API_HOST } from "../index";
import Alert from "../Components/Alert";

// a red asterisk *
const Required = (): JSX.Element => {
  return <span className={css.required}></span>;
};

const LoginPage = (): JSX.Element => {
  document.title = "Login";
  const [otpEmail, setOtpEmai] = useState<string>("");
  const [displayAnimation, setDisplayAnimation] = useState(false);

  const context = useContext(OurContext);

  const animationRef = useRef(null);

  function getTheme(): "dark" | "light" {
    console.log(context.theme);
    if (context.theme === "dark" || context.theme === "light") {
      return context.theme;
    } else {
      return "dark";
    }
  }

  function loginOTP() {
    fetch(`${API_HOST}/user/otp`, {
      method: "POST",
      body: JSON.stringify({ email: otpEmail }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        if (res.ok) {
          Alert("E-Mail geschickt!", "success", getTheme());
          lottie.destroy();
          setDisplayAnimation(true);
          setTimeout(() => {
            setDisplayAnimation(false);
          }, 4000);
        } else {
          Alert(
            "Wahrscheinlich stimmt mit deinem Input was nicht.",
            "error",
            getTheme()
          );
          setDisplayAnimation(false);
        }
        return res.json();
      })
      .then((body) => console.log(body));
  }

  useEffect(() => {
    if (animationRef.current) {
      lottie.loadAnimation({
        container: animationRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: require("../assets/animations/message.json"),
      });
    }
  }, [displayAnimation]);

  return (
    <div id={css.login}>
      <h1>Login</h1>
      {displayAnimation ? (
        <div id={css.animationContainer} ref={animationRef} />
      ) : null}
      <h3>Anmelden mit Link per E-Mail</h3>
      <p>
        Wenn du dich so anmeldest, kriegt du einen Link per E-Mail (deine
        Schul-E-Mail-Adresse) zugeschickt womit du dich für 30 Tage auf einem
        Gerät authentifizieren kannst.{" "}
        <a href="https://outlook.office365.com/mail/">Link zu Outlook</a>
      </p>
      <div className={css["inputFields"]}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            loginOTP();
          }}
        >
          <label htmlFor="email">
            E-Mail Adresse
            <Required />
          </label>
          <div className={css.inputField}>
            <input
              type="email"
              name="email"
              required
              placeholder="E-Mail"
              value={otpEmail}
              onChange={(e) => setOtpEmai(e.target.value)}
            />
          </div>
          <input type="submit" value="Login (ohne Passwort)" id={css.submit} />
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
