import { FaRegMoon } from "react-icons/fa";
import { FiSun } from "react-icons/fi";
import { type FC, useEffect, useState } from "react";

const themes = {
  winter: "corporate",
  dracula: "sunset",
};

const getThemeFromLocalStorage = () => {
  return localStorage.getItem("theme") || themes.winter;
};

export const Header: FC = () => {
  const [theme, setTheme] = useState(getThemeFromLocalStorage());

  const toggleTheme = () => {
    const { winter, dracula } = themes;
    const newTheme = theme === winter ? dracula : winter;
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <header className="bg-neutral py-2 text-neutral-content">
      <div className="align-element flex justify-center sm:justify-end">
        <label className="swap swap-rotate">
          <input type="checkbox" onChange={toggleTheme} />
          <FaRegMoon className="swap-on h-4  w-4" />
          <FiSun className="swap-off h-4  w-4" />
        </label>
      </div>
    </header>
  );
};
