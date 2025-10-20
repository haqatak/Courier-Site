

import { useEffect, useState } from "react";
import { IonButton, IonIcon } from "@ionic/react";
import { moon, sun } from "ionicons/icons";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(prefersDark.matches);
    toggleDarkTheme(prefersDark.matches);

    prefersDark.addEventListener("change", (mediaQuery) => {
      toggleDarkTheme(mediaQuery.matches);
      setIsDarkMode(mediaQuery.matches);
    });
  }, []);

  const toggleDarkTheme = (shouldAdd) => {
    document.body.classList.toggle("dark", shouldAdd);
  };

  const toggleChange = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    toggleDarkTheme(newMode);
  };

  return (
    <IonButton onClick={toggleChange} fill="clear">
      <IonIcon slot="icon-only" icon={isDarkMode ? sun : moon} />
    </IonButton>
  );
}