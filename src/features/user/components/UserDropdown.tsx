import { CaretDown, SignOut, UserCircle } from "phosphor-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import storage from "@/utils/storage";
import { toast } from "react-toastify";

type UserCandidate = {
  name?: string;
  email?: string;
  avatar?: string;
};

type UserDropdownProps = {
  user?: UserCandidate;
  className?: string;
};

type UserProfile = {
  name: string;
  email?: string;
  imageUrl?: string;
  initials: string;
};

const getText = (...values: Array<string | undefined>): string | undefined => {
  return values.find((value) => value?.trim())?.trim();
};

const getInitials = (name: string, email?: string): string => {
  const source = name !== "BasketBay User" ? name : (email ?? name);
  const words = source
    .replace(/@.*/, "")
    .split(/[\s._-]+/)
    .filter(Boolean);

  if (words.length === 0) {
    return "BB";
  }

  return words
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
};

const buildProfile = (providedUser?: UserCandidate): UserProfile => {
  const email = getText(providedUser?.email);
  const name =
    getText(providedUser?.name, email?.split("@")[0]) ?? "BasketBay User";
  const imageUrl = getText(providedUser?.avatar);
  const initials = getInitials(name, email);

  return {
    name,
    email,
    imageUrl,
    initials,
  };
};

export const UserDropdown = ({ user, className = "" }: UserDropdownProps) => {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const profile = useMemo(() => buildProfile(user), [user]);
  const shouldShowImage = Boolean(profile.imageUrl && !imageFailed);

  useEffect(() => {
    setImageFailed(false);
  }, [profile.imageUrl]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const handleProfileClick = () => {
    setIsOpen(false);
    navigate("/app/profile");
  };

  const handleSignOut = () => {
    storage.removeAccessToken();
    setIsOpen(false);
    toast.success("You have been signed out.");
    window.location.assign("/");
  };

  return (
    <div ref={dropdownRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-label="Open user menu"
        onClick={() => setIsOpen((current) => !current)}
        className="inline-flex max-w-full items-center gap-2 rounded-full border border-slate-200 bg-white p-1 pr-2 text-left shadow-sm transition hover:border-emerald-300 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-emerald-100"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-600 text-sm font-semibold text-white">
          {shouldShowImage ? (
            <img
              src={profile.imageUrl}
              alt={profile.name}
              onError={() => setImageFailed(true)}
              className="h-full w-full object-cover"
            />
          ) : (
            profile.initials
          )}
        </span>

        <span className="hidden min-w-0 max-w-36 sm:block">
          <span className="block truncate text-sm font-semibold text-slate-900">
            {profile.name}
          </span>
          {profile.email && (
            <span className="block truncate text-xs text-slate-500">
              {profile.email}
            </span>
          )}
        </span>

        <CaretDown
          size={16}
          className={`hidden shrink-0 text-slate-500 transition sm:block ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute right-0 z-50 mt-3 w-[calc(100vw-2rem)] max-w-72 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl sm:w-72"
        >
          <div className="flex items-center gap-3 border-b border-slate-100 px-4 py-3">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-600 text-sm font-semibold text-white">
              {shouldShowImage ? (
                <img
                  src={profile.imageUrl}
                  alt={profile.name}
                  onError={() => setImageFailed(true)}
                  className="h-full w-full object-cover"
                />
              ) : (
                profile.initials
              )}
            </span>
            <span className="min-w-0">
              <span className="block truncate text-sm font-semibold text-slate-900">
                {profile.name}
              </span>
              {profile.email && (
                <span className="block truncate text-xs text-slate-500">
                  {profile.email}
                </span>
              )}
            </span>
          </div>

          <div className="p-2">
            <button
              type="button"
              role="menuitem"
              onClick={handleProfileClick}
              className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:text-slate-950 focus:outline-none focus:ring-4 focus:ring-emerald-100"
            >
              <UserCircle size={20} className="shrink-0 text-slate-500" />
              <span>Profile</span>
            </button>
            <button
              type="button"
              role="menuitem"
              onClick={handleSignOut}
              className="mt-1 flex w-full items-center gap-3 rounded-md px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50 focus:outline-none focus:ring-4 focus:ring-red-100"
            >
              <SignOut size={20} className="shrink-0" />
              <span>Sign out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
