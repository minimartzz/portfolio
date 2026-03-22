import { IconType } from "react-icons";
import { Button } from "./ui/button";

interface SocialsButtonProps {
  name: string;
  link: string;
  icon: IconType;
}

const SocialsButton = (props: SocialsButtonProps) => {
  return (
    <Button
      className="h-12 w-12 rounded-full bg-black hover:bg-zinc-800"
      asChild
    >
      <a
        href={props.link}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={props.name}
      >
        <props.icon
          size={32}
          style={{ minWidth: "1.5rem", minHeight: "1.5rem" }}
        />
      </a>
    </Button>
  );
};

export default SocialsButton;
