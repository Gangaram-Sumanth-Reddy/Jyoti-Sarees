import {
  ENQUIRY_LEAD_SOURCE,
  formatCustomerWhatsApp,
  linePricing,
  parseOrderEnquiry,
  summarizeEnquiry,
  type ParsedOrderEnquiry,
} from "@/lib/enquiry-order";
import type { FieldErrors, ParseResult } from "@/lib/form-validation";
import { privacyConfig } from "@/lib/privacy-config";
import { absoluteUrl } from "@/lib/seo";
import { handleFormSubmission } from "@/lib/server/form-endpoint";

function parse(body: unknown): ParseResult<ParsedOrderEnquiry> {
  const result = parseOrderEnquiry(body);
  if (result.ok) return result;
  return { ok: false, errors: result.errors as FieldErrors<ParsedOrderEnquiry> };
}

export async function POST(request: Request) {
  return handleFormSubmission(request, {
    formType: "order_enquiry",
    referencePrefix: "JSE",
    parse,
    clientReference: (data) => data.enquiryId,
    rateLimitMax: 20,
    toRow: ({ customer, lines }) => {
      const summary = summarizeEnquiry(lines);
      return {
        leadSource: ENQUIRY_LEAD_SOURCE,
        fullName: customer.fullName,
        whatsapp: formatCustomerWhatsApp(customer),
        totalDesigns: summary.uniqueCount,
        totalQuantity: summary.totalQuantity,
        totalMrp: summary.mrpTotal,
        totalSavings: summary.savings,
        enquiryTotal: summary.total,
        policyVersion: privacyConfig.policyVersion,
        items: lines.map((line, index) => {
          const { mrp, discount } = linePricing(line);
          return {
            itemNo: index + 1,
            productName: line.name,
            sku: line.productId,
            colour: line.colour,
            quantity: line.quantity,
            mrp,
            discount,
            price: line.unitPrice,
            subtotal: line.lineTotal,
            productUrl: absoluteUrl(line.href),
          };
        }),
      };
    },
  });
}
