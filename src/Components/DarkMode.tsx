import { useEffect } from "react";
import { useState } from "react";
import css from "../styles/darkModeButton.module.scss";

const DarkMode = () => {
  const body = document.body;
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (localStorage) {
      let value = localStorage.getItem("theme");
      if (value === "light" || value === "dark") {
        body.classList.add(value);
        setTheme(value);
      } else {
        body.classList.add("light");
      }
    }
  }, []);

  const toggleDarkMode = () => {
    if (theme === "dark") {
      body.classList.replace("dark", "light");
      localStorage.setItem("theme", "light");
      setTheme("light");
    } else {
      body.classList.replace("light", "dark");
      localStorage.setItem("theme", "dark");
      setTheme("dark");
    }
  };

  return (
    <div id={css.switch}>
      <label className={css.toggle}>
        <input
          type="checkbox"
          onChange={() => toggleDarkMode()}
          checked={theme === "dark"}
        />
        <span className={css.slider}></span>
        <span className={css.labels}></span>
      </label>
    </div>
  );
};

export default DarkMode;