import {
  SiGo,
  SiJavascript,
  SiPython,
  SiReact,
} from "@icons-pack/react-simple-icons";
import CodeIcon from "@mui/icons-material/Code";

export function fromTextToIconLanguage(language: string) {
  switch (language) {
    case "javascript":
      return <SiJavascript size={21} className="text-[12px] text-white" />;

    case "python":
      return <SiPython size={21} className="text-[12px] text-white" />;

    case "go":
      return <SiGo size={21} className="text-[12px] text-white" />;

    default:
      return (
        <CodeIcon sx={{ fontSize: 21 }} className="text-[12px] text-white" />
      );
  }
}
