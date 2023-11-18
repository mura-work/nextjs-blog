import { IconButton } from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

export const HeaderComponent = () => {
  return (
    <header className="flex justify-between bg-cyan-200 px-4">
      <div className="flex items-center">
        <span>TodoApp</span>
      </div>
      <div className="flex">
        <div className="mr-4">
          <IconButton
            variant="unstyled"
            className="!min-w-0 !min-h-0"
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={() => console.log("")}
          />
        </div>
        <div className="">
          <IconButton
            variant="unstyled"
            className="!min-w-0 !min-h-0"
            aria-label="Search database"
            icon={<HamburgerIcon />}
            onClick={() => console.log("")}
          />
        </div>
      </div>
    </header>
  );
};
