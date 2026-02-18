import { Plus } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <nav className="md:w-1/2 w-full flex flex-row justify-between md:pl-12 px-12 py-4 fixed top-0 z-50">
      <h1 className="font-black will-change-transform mix-blend-difference text-black">
        LOGO HERE
      </h1>
      <Button
        variant="link"
        className="flex flex-row gap-1 items-center align-middle cursor-pointer p-0 md:p-2 md:relative md:left-16"
      >
        <Plus size={16} />
        <h4 className="text-sm">MENU</h4>
      </Button>
    </nav>
  );
}
