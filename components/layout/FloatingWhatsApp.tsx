import { SocialIcon } from "@/components/layout/SocialIcons";
import { site } from "@/lib/site";

export function FloatingWhatsApp() {
  return (
    <a
      href={site.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`WhatsApp Us — chat with ${site.name}`}
      className="whatsapp-float fixed bottom-[calc(var(--mobile-nav-height)+env(safe-area-inset-bottom)+1rem)] right-[max(1rem,env(safe-area-inset-right))] md:bottom-[max(1.5rem,env(safe-area-inset-bottom))] z-40 inline-flex size-12 items-center justify-center rounded-full bg-navy text-white shadow-card ring-1 ring-white/15 transition-[background-color,transform,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:bg-navy-mid hover:shadow-[0_14px_32px_rgb(10_36_114/0.28)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy sm:right-6"
    >
      <span className="flex scale-[1.3] items-center justify-center">
        <SocialIcon id="whatsapp" />
      </span>
    </a>
  );
}
