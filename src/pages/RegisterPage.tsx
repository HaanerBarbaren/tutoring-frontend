import css from "../styles/registerPage.module.scss";

import { useState, useContext } from "react";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeContext } from "../ThemeContext";

function RegisterPage() {
  document.title = "Registrieren";
  const grades = ["5", "6", "7", "8", "9", "10", "11", "12", "13"];

  const subjects = [
    "Deutsch",
    "Englisch",
    "Katholische Religion",
    "Evangelische Religion",
    "Mathematik",
    "Philosophie",
    "Latein",
    "Altgriechisch",
    "Hebräisch",
    "Physik",
    "Biologie",
    "Chemie",
    "Französisch",
    "Spanisch",
    "Pädagogik",
    "Sozialwissenschaften",
    "Politik/Wirtschaft",
    "Informatik",
  ];

  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [chosen, setChosen] = useState([]);

  const [step, setStep] = useState(1);

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

  function ChooseStufe() {
    return (
      <select name="" id="">
        <option value="">--- Stufe auswählen ---</option>
        {grades.map((grade, index) => {
          return <option key={index}>{grade}</option>;
        })}
      </select>
    );
  }

  if (step === 1)
    return (
      <div className={css.container}>
        <h1>Anmelden</h1>
        <p>
          Gebe deine E-Mail-Adresse an, welche du von der Schule bekommen hast.
        </p>
        <div className={css.inputfields}>
          <form
            onSubmit={(e) => {
              setStep(2);
              e.preventDefault();
            }}
          >
            <div className={css.inputfield}>
              <input
                type="text"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <p id={css.gymhaanplacehodler}>@gymhaan.de</p>
            </div>
            <input type="submit" value="weiter" id={css.submit} />
          </form>
        </div>
        <div className={css.placeholder}></div>
        <p className={css.step}>Schritt {step} / 3</p>
        <ToastContainer />
      </div>
    );
  else
    return (
      <div className={css.container}>
        <div id={css.formContainer}>
          <h1>Fächer auswählen</h1>
          <h4>Deine E-Mail: {email}@gymhaan.de</h4>
          <table>
            <thead>
              <tr>
                <th>Fach</th>
                <th>Stufe</th>
                <th>Chechbox</th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => {
                return (
                  <tr key={index}>
                    <td>{subject}</td>
                    <td>
                      <ChooseStufe />
                    </td>
                    <td>
                      <input type="checkbox" />
                    </td>
                  </tr>
                );
              })}
              <tr>
                <td>Fortnite</td>
                <td>
                  <select name="" id="">
                    <option value="">--- Bereich auswählen ---</option>
                    <option>Bauen</option>
                    <option>Editieren</option>
                    <option>Aim</option>
                    <option>Skin Contest</option>
                  </select>
                </td>
                <td>
                  <input type="checkbox" />
                </td>
              </tr>
            </tbody>
          </table>
          <input
            type="submit"
            value="weiter"
            id={css.submit}
            onClick={(e) => {
              setStep(3);
              e.preventDefault();
            }}
          />
        </div>
        <p className={css.step}>Schritt {step} / 3</p>
        <ToastContainer />
      </div>
    );
}

export default RegisterPage;
