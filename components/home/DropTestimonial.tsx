"use client";

import { useState } from "react";
import { TestimonialModal } from "@/components/home/TestimonialModal";
import { Button } from "@/components/ui/Button";

export function DropTestimonial() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="mt-10 flex justify-center sm:mt-12">
        <Button type="button" size="lg" onClick={() => setOpen(true)}>
          Drop a Testimonial
        </Button>
      </div>
      <TestimonialModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
