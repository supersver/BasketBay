import clsx from "clsx";
import {
  Heart,
  List,
  MagnifyingGlass,
  Package,
  ShoppingCart,
  X,
} from "phosphor-react";
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

import { UserDropdown } from "./UserDropdown";

const navItems = [{ label: "Shop", to: "/app" }];

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  clsx(
    "rounded-md px-3 py-2 text-sm font-medium transition",
    isActive
      ? "bg-emerald-50 text-emerald-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
  );

const SearchBox = ({ className = "" }: { className?: string }) => {
  return (
    <label className={`relative block ${className}`}>
      <MagnifyingGlass
        size={18}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="search"
        placeholder="Search products"
        className="h-10 w-full rounded-md border border-slate-200 bg-slate-50 pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:bg-white focus:ring-4 focus:ring-emerald-100"
      />
    </label>
  );
};

export const NavBar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <NavLink
          to="/app"
          className="flex shrink-0 items-center gap-2 text-slate-950"
          aria-label="BasketBay home"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-md bg-emerald-600 text-white">
            <ShoppingCart size={22} weight="fill" />
          </span>
          <span className="text-lg font-bold sm:text-xl">BasketBay</span>
        </NavLink>

        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/app"}
              className={navLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <SearchBox className="hidden max-w-md mx-auto flex-1 lg:block" />

        <div className="ml-auto flex items-center gap-2">
          <NavLink
            to="/app/cart"
            aria-label="Cart"
            className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-600 transition hover:border-emerald-300 hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
          >
            <ShoppingCart size={20} />
          </NavLink>

          <UserDropdown />

          <button
            type="button"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation menu"
            onClick={() => setIsMobileMenuOpen((current) => !current)}
            className="flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100 md:hidden"
          >
            {isMobileMenuOpen ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="mx-auto max-w-7xl space-y-3 px-4 py-4 sm:px-6">
            <SearchBox />

            <div className="grid gap-1">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/app"}
                  className={navLinkClass}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <NavLink
                to="/app/orders"
                className="flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100"
              >
                <Package size={18} />
                <span>Orders</span>
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
