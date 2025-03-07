import Logo from "@/assets/logo-with-title.png";
import DarkLogo from "@/assets/logo-dark.png";
import Moon from "@/assets/moon.png";
import Sun from "@/assets/sun-white-icon.png";
import { useDayLightTheme } from "@/hooks/useTheme";

export default function Header() {
  const { theme, toggleTheme } = useDayLightTheme();
  return (
    <div className="h-[55px] pt-4 px-8 flex justify-between">
      <img src={theme === "light" ? Logo : DarkLogo} alt="" width={155} />
      <img
        onClick={toggleTheme}
        src={theme === "light" ? Moon : Sun}
        alt=""
        width={25}
        style={{ height: 25, cursor: "pointer" }}
      />
    </div>
  );
}
