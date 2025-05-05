"use client";

import Link from "next/link";

import { useActiveRoute } from "../hooks/useActiveRoute";
import { NAVIGATIONS_ROUTES } from "../constants";

export default function Navigation() {
  const { checkIsActive } = useActiveRoute();

  return (
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto">
        {NAVIGATIONS_ROUTES.map(({ path, label }) => (
          <li key={path} className="nav-item mx-2">
            <Link className={`nav-link text-center${checkIsActive(path)}`} href={path}>
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
