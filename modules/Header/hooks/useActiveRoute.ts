import { usePathname } from "next/navigation";

export const useActiveRoute = () => {
  const pathname = usePathname();

  const checkIsActive = (path: string) => {
    return `${pathname === path ? " active" : ""}`;
  };

  return { checkIsActive };
};
