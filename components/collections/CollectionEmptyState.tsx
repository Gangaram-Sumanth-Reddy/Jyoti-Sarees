import { Button, ButtonLink } from "@/components/ui/Button";

type CollectionEmptyStateProps = {
  filtered?: boolean;
  onClear?: () => void;
};

export function CollectionEmptyState({
  filtered = false,
  onClear,
}: CollectionEmptyStateProps) {
  return (
    <div
      className="rounded-lg border border-dashed border-border-strong bg-surface px-6 py-14 text-center sm:px-10"
      role="status"
    >
      <h3 className="text-h3">
        {filtered ? "No sarees match these filters" : "No sarees found in this collection"}
      </h3>
      <p className="mx-auto mt-3 max-w-md text-body text-muted">
        {filtered
          ? "Try adjusting your filters to see more sarees from this collection."
          : "Try exploring another collection."}
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        {filtered && onClear ? (
          <Button type="button" variant="secondary" onClick={onClear}>
            Clear Filters
          </Button>
        ) : null}
        <ButtonLink href="/sarees" variant={filtered ? "secondary" : "primary"}>
          View All Sarees
        </ButtonLink>
      </div>
    </div>
  );
}
