import { Button } from "@/components/ui/Button";

type CatalogueEmptyStateProps = {
  onClear: () => void;
};

export function CatalogueEmptyState({ onClear }: CatalogueEmptyStateProps) {
  return (
    <div
      className="rounded-lg border border-dashed border-border-strong bg-surface px-6 py-14 text-center sm:px-10"
      role="status"
    >
      <h3 className="text-h3">No sarees found</h3>
      <p className="mx-auto mt-3 max-w-md text-body text-muted">
        Try adjusting your filters to discover more collections.
      </p>
      <div className="mt-8 flex justify-center">
        <Button type="button" onClick={onClear}>
          Clear Filters
        </Button>
      </div>
    </div>
  );
}
