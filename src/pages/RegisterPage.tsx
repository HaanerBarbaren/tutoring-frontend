import { useState, useContext, useRef, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { ThemeContext } from "../ThemeContext";
import lottie from "lottie-web";
import general from "../styles/general.module.scss";
import css from "../styles/registerPage.module.scss";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, useParams } from "react-router";
import { subjects, topSubjects } from "../Models";

function RegisterPage() {
  document.title = "Registrieren";
  const grades = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];

  const [id, setID] = useState("");
  const [email, setEmail] = useState("");
  const [chosen, setChosen] = useState([]);
  const [name, setName] = useState("Niels");

  const navigate = useNavigate();
  const { stepIndex } = useParams();

  const [step, setStep] = useState(1);

  useEffect(() => {
    if (!stepIndex) {
      navigate("/register/1", { replace: true });
    } else {
      let parsedIndex = parseInt(stepIndex);
      if (isNaN(parsedIndex)) {
        navigate("/register/1", { replace: true });
      } else {
        setStep(parsedIndex);
      }
    }
  }, [stepIndex, navigate]);

  const context = useContext(ThemeContext);

  function checkTheme(): "dark" | "light" {
    // to have type safety
    if (context.theme === "dark" || context.theme === "light") {
      return context.theme;
    } else {
      return "dark";
    }
  }

  function register() {
    if (/^-?[\d.]+(?:e-?\d+)?$/.test(id) && chosen.length > 1) {
      toast.success("User wird erstellt...", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: checkTheme(),
        progress: undefined,
      });
    } else {
      toast.error("Ungültige Daten", {
        position: "bottom-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        theme: checkTheme(),
        progress: undefined,
      });
    }
  }

  function ChooseGrade() {
    return (
      <div className={css.select_wrapper}>
        <div className={general.select_input_field}>
          <select name="" id="" className={general.select}>
            <option value="asdf" className={css.na_option}>
              Nicht ausgewählt
            </option>
            {grades.map((grade, index) => {
              return <option key={index}>ab Stufe {grade}</option>;
            })}
          </select>
        </div>
      </div>
    );
  }

  // login Animation
  const login = useRef(null);
  useEffect(() => {
    if (login.current) {
      lottie.loadAnimation({
        container: login.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: require("../assets/animations/login.json"),
      });
      return () => {
        lottie.destroy();
      };
    }
  }, []);

  //letter animation
  const letter = useRef(null);
  useEffect(() => {
    if (letter.current) {
      lottie.loadAnimation({
        container: letter.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: require("../assets/animations/letter.json"),
      });
    }
  });

  function newStep(theStep: number) {
    setStep(theStep);
    navigate(`/register/${theStep}`);
  }

  // Render
  if (step === 1) {
    return (
      <div id={css.loginContainer}>
        <h1>Anmelden</h1>
        <div ref={login} id={css.loginAnimation}></div>
        <p>Gib die E-Mail-Adresse an, die du von der Schule bekommen hast.</p>
        <p>
          Das sollte dieselbe sein, die auch für Login bei Teams/Office 365
          benutzt wird.
        </p>
        <div className={css["input-fields"]}>
          <form
            onSubmit={(e) => {
              const schoolMailRegex = /(.*)\.(.*)(@gymhaan\.de)?/; // this allows too much, but I am not sure how they are generated exactly so '729asdf=9@.23aa~~3F@gymhaan.de' is valid for now
              if (email.match(schoolMailRegex)) {
                newStep(2);
                lottie.destroy();
              } else {
                lottie.stop();
                lottie.setSpeed(1.5);
                lottie.play();
              }
              e.preventDefault();
            }}
          >
            <div className={css["input-field"]}>
              <input
                type="text"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p id={css.gymhaanPlacehodler}>@gymhaan.de</p>
            </div>
            <input type="submit" value="weiter" className={css.submit} />
          </form>
        </div>
        <p className={css.step}>
          <span className={general.bullSpan}>&bull;</span>&bull;&bull;
        </p>

        <ToastContainer />
      </div>
    );
  } else if (step === 2) {
    return (
      <div id={css.container}>
        <div id={css.formContainer}>
          <h1>Wähle deine Fächer, {name}</h1>
          <h4>Fächer ausgewählt: 0</h4>
          <div className={css.subjects}>
            <h3>Beliebte Fächer:</h3>
            {topSubjects.map((subject, index) => {
              return (
                <div className={css.subject} key={index}>
                  <h4>{subject}</h4>
                  <ChooseGrade />
                </div>
              );
            })}
          </div>
          <div className={css.subjects}>
            <h3>Weitere Fächer:</h3>
            {subjects.sort().map((subject, index) => {
              return (
                <div className={css.subject} key={index}>
                  <h4>{subject}</h4>
                  <ChooseGrade />
                </div>
              );
            })}
          </div>

          <div id={css.submitContainer}>
            <input
              type="submit"
              value="weiter"
              className={css.next_button}
              onClick={(e) => {
                setStep(3);
                e.preventDefault();
              }}
            />
          </div>
        </div>
        <div className={css.step}>
          &bull;<span className={general.bullSpan}>&bull;</span>&bull;
        </div>

        <ToastContainer />
      </div>
    );
  } else if (step === 3) {
    return (
      <div id={css.confirmContainer}>
        <h1>Bestätigen</h1>
        <div
          ref={letter}
          id={css.letterAnimation}
          onPointerEnter={(e) => {
            lottie.stop();
            lottie.setSpeed(2);
            lottie.play();
          }}
        ></div>
        <p id={css.justifyText}>
          Damit wir deine Identität bestätigen können haben wir dir eine E-Mail
          an <span>{email}@gymhaan.de geschickt.</span> <br />
          Öffne diese und befolge den Anweisungen, um deinen Account zu
          aktivieren. <br /> <br />
          PS: Wenn du die E-Mail nicht findest, schau in deinem Spam Ordner
          nach.
        </p>

        <div className={css.placeholder}></div>
        <p className={css.step}>
          &bull;&bull;<span className={general.bullSpan}>&bull;</span>
        </p>
        <ToastContainer />
      </div>
    );
  } else return null;
}

export default RegisterPage;
