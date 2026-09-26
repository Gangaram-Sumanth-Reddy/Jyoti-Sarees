import { contactSocials } from "@/lib/contact";

import { cn } from "@/lib/cn";



function SocialIcon({ id }: { id: string }) {

  if (id === "instagram") {

    return (

      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">

        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.7" />

        <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.7" />

        <circle cx="17.15" cy="6.85" r="1.15" fill="currentColor" />

      </svg>

    );

  }

  if (id === "facebook") {

    return (

      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">

        <path

          d="M14.2 8.2h1.9V5.1h-1.9c-2.3 0-3.8 1.4-3.8 3.8v1.6H8.5v3.1h1.9V19h3.2v-5.4h2.1l.5-3.1h-2.6V9.2c0-.6.3-1 1.1-1Z"

          fill="currentColor"

        />

      </svg>

    );

  }

  return (

    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">

      <path d="M12.04 2.2C6.5 2.2 2 6.6 2 12.02c0 1.74.46 3.37 1.26 4.8L2.1 21.8l5.14-1.34A9.9 9.9 0 0 0 12.04 22C17.58 22 22 17.58 22 12.02S17.58 2.2 12.04 2.2Zm5.78 14.1c-.24.68-1.4 1.24-1.95 1.32-.5.07-1.13.1-1.82-.11-.42-.13-.95-.31-1.64-.61-2.88-1.25-4.76-4.16-4.9-4.35-.14-.2-1.16-1.55-1.16-2.95 0-1.4.73-2.09.99-2.38.26-.28.57-.35.76-.35h.55c.18 0 .42-.07.65.5.24.58.8 2 .87 2.14.07.14.12.3 0 .48-.1.18-.17.29-.33.45-.16.16-.34.36-.48.48-.16.14-.32.3-.14.58.18.28.8 1.32 1.72 2.14 1.18 1.05 2.17 1.38 2.48 1.54.3.15.48.13.66-.08.18-.2.76-.88.96-1.18.2-.3.4-.25.68-.15.28.1 1.76.83 2.06.98.3.15.5.22.57.34.08.13.08.74-.16 1.42Z" />

    </svg>

  );

}



type SocialIconsProps = {

  className?: string;

  align?: "start" | "center";

};



export function SocialIcons({ className, align = "start" }: SocialIconsProps) {

  return (

    <div

      className={cn(

        "flex items-center gap-3",

        align === "center" && "justify-center",

        className,

      )}

    >

      {contactSocials.map((social) => (

        <a

          key={social.id}

          href={social.href}

          target="_blank"

          rel="noopener noreferrer"

          aria-label={social.label}

          className="inline-flex size-11 items-center justify-center rounded-full bg-navy text-white shadow-soft transition-colors hover:bg-accent"

        >

          <SocialIcon id={social.id} />

        </a>

      ))}

    </div>

  );

}


