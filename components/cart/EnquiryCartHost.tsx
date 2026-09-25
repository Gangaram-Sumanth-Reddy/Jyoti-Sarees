"use client";

import { EnquiryCartDrawer } from "@/components/cart/EnquiryCartDrawer";
import { EnquirySentModal } from "@/components/cart/EnquirySentModal";

export function EnquiryCartHost() {
  return (
    <>
      <EnquiryCartDrawer />
      <EnquirySentModal />
    </>
  );
}
