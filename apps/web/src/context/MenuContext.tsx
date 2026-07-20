import { createContext, useContext, useState, type ReactNode } from "react";

type MenuContextValue = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const MenuContext = createContext<MenuContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <MenuContext.Provider
      value={{
        isOpen,
        open: () => setIsOpen(true),
        close: () => setIsOpen(false),
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  return useContext(MenuContext);
}
