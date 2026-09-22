import { Badge } from "@/components/ui/Badge";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { ImageFrame } from "@/components/ui/ImageFrame";
import { Input, Textarea } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

const swatches = [
  { name: "Rich Black", className: "bg-rich-black" },
  { name: "Navy mid", className: "bg-navy-mid" },
  { name: "Navy", className: "bg-navy" },
  { name: "Navy soft", className: "bg-navy-soft" },
  { name: "Accent", className: "bg-accent" },
  { name: "Midnight", className: "bg-navy-deep" },
  { name: "White", className: "bg-white ring-1 ring-border" },
  { name: "Cream tint", className: "bg-cream ring-1 ring-border" },
  { name: "Surface", className: "bg-surface ring-1 ring-border" },
] as const;

export function FoundationPreview() {
  return (
    <>
      <Section>
        <Container>
          <SectionHeading
            as="h1"
            eyebrow="Design foundation"
            title="Shared system for every future page"
            description="Tokens, type, layout, and reusable UI. This is not the Home page — it is a temporary preview so the system can be checked across breakpoints."
          />
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
            {swatches.map((swatch) => (
              <div key={swatch.name} className="min-w-0">
                <div className={`h-16 w-full rounded-md ${swatch.className}`} />
                <p className="mt-2 truncate text-small text-muted">{swatch.name}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="muted">
        <Container>
          <SectionHeading
            eyebrow="Typography"
            title="Calibri scale"
            description="One family across headings, body, navigation, and buttons. Sizes fluidly adjust from phone to wide desktop."
          />
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-5">
              <h1>Heading one</h1>
              <h2>Heading two</h2>
              <h3>Heading three</h3>
            </div>
            <div className="space-y-4">
              <p className="text-body text-rich-black">
                Body copy stays readable at every width, with generous line-height and
                a max measure so lines never stretch across large screens.
              </p>
              <p className="text-small text-muted">
                Small text is reserved for captions, hints, and supporting labels.
              </p>
              <p className="text-nav uppercase text-rich-black">Navigation label</p>
              <p className="text-button font-semibold uppercase tracking-[0.04em]">
                Button label
              </p>
            </div>
          </div>
        </Container>
      </Section>

      <Section>
        <Container>
          <SectionHeading
            eyebrow="Components"
            title="Buttons, cards, badges, and fields"
            align="left"
          />
          <div className="flex flex-wrap items-center gap-3">
            <Button>Primary action</Button>
            <Button variant="secondary">Secondary action</Button>
            <ButtonLink href="/contact" size="sm">
              Compact CTA
            </ButtonLink>
            <Badge>New</Badge>
            <Badge variant="accent">Heritage</Badge>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card>
              <h3 className="text-h3">Default card</h3>
              <p className="mt-2 text-small text-muted">
                Shared radius, border, and a light shadow used only where it helps.
              </p>
            </Card>
            <Card variant="muted">
              <h3 className="text-h3">Muted card</h3>
              <p className="mt-2 text-small text-muted">
                Cream surface for quieter groupings and collection tiles.
              </p>
            </Card>
            <Card variant="inverse">
              <h3 className="text-h3 text-inverse">Inverse card</h3>
              <p className="mt-2 text-small text-white/75">
                Midnight surface for emphasis without extra decoration.
              </p>
            </Card>
          </div>
          <form className="mt-8 grid gap-4 sm:grid-cols-2" noValidate>
            <Input name="name" label="Name" placeholder="Your name" />
            <Input
              name="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              hint="Used only to respond to your enquiry."
            />
            <div className="sm:col-span-2">
              <Textarea name="message" label="Message" placeholder="How can we help?" />
            </div>
          </form>
        </Container>
      </Section>

      <Section tone="inverse">
        <Container>
          <SectionHeading
            tone="inverse"
            eyebrow="Media"
            title="Image frames crop cleanly"
            description="Frames hold upcoming photography. No images have been added yet — only the crop, radius, and aspect-ratio system."
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ImageFrame aspect="portrait" caption="Portrait 3:4">
              <div className="absolute inset-0 bg-navy-soft" />
            </ImageFrame>
            <ImageFrame aspect="square" caption="Square 1:1">
              <div className="absolute inset-0 bg-accent" />
            </ImageFrame>
            <ImageFrame aspect="landscape" caption="Landscape 4:3" className="sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-navy" />
            </ImageFrame>
            <ImageFrame aspect="wide" caption="Wide 16:9" className="sm:col-span-2 lg:col-span-1">
              <div className="absolute inset-0 bg-cream" />
            </ImageFrame>
          </div>
        </Container>
      </Section>
    </>
  );
}
