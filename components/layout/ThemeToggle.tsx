"use client";

const STORAGE_KEY = "jyoti-theme";

export const themeBootScript = `(function(){try{if(localStorage.getItem("${STORAGE_KEY}")==="dark")document.documentElement.dataset.theme="dark";}catch(e){}})();`;

export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    if (next === "dark") root.dataset.theme = "dark";
    else delete root.dataset.theme;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* Private browsing can block storage; the toggle still applies for this view. */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark and light mode"
      className="theme-toggle inline-flex size-11 shrink-0 items-center justify-center rounded-full transition-colors duration-200 hover:bg-[rgb(255_255_255/0.15)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <span className="theme-toggle-icon">
        <SunIcon />
        <MoonIcon />
      </span>
    </button>
  );
}

function SunIcon() {
  return (
    <svg className="theme-toggle-sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.75" />
      <path
        d="M12 2.75v2.1M12 19.15v2.1M2.75 12h2.1M19.15 12h2.1M5.2 5.2l1.5 1.5M17.3 17.3l1.5 1.5M18.8 5.2l-1.5 1.5M6.7 17.3l-1.5 1.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="theme-toggle-moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14.5 3.2a7.6 7.6 0 1 0 6.3 11.4A6.4 6.4 0 0 1 14.5 3.2Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinejoin="round"
      />
    </svg>
  );
}
