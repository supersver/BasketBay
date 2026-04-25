import { ArrowClockwise, FunnelSimple } from "phosphor-react";
import type { ChangeEvent } from "react";

export type CategoryOption = {
  id: number;
  name: string;
};

export type ProductSortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "title-asc"
  | "title-desc"
  | "newest";

type ProductFilterProps = {
  categories: CategoryOption[];
  selectedCategoryIds: number[];
  sortBy: ProductSortOption;
  onCategoryToggle: (categoryId: number) => void;
  onSortChange: (sortBy: ProductSortOption) => void;
  onClear: () => void;
  onApply: () => void;
  hasUnappliedChanges: boolean;
};

const sortOptions: Array<{ value: ProductSortOption; label: string }> = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to high" },
  { value: "price-desc", label: "Price: High to low" },
  { value: "title-asc", label: "Name: A to Z" },
  { value: "title-desc", label: "Name: Z to A" },
  { value: "newest", label: "Newest" },
];

export const ProductFilter = ({
  categories,
  selectedCategoryIds,
  sortBy,
  onCategoryToggle,
  onSortChange,
  onClear,
  onApply,
  hasUnappliedChanges,
}: ProductFilterProps) => {
  const hasActiveFilters =
    selectedCategoryIds.length > 0 || sortBy !== "featured";

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onSortChange(event.target.value as ProductSortOption);
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-950">
              <FunnelSimple size={18} className="text-emerald-600" />
              <span>Filter by category</span>
            </div>

            {categories.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => {
                  const isSelected = selectedCategoryIds.includes(category.id);

                  return (
                    <label
                      key={category.id}
                      className={`flex cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-50 text-emerald-700"
                          : "border-slate-200 bg-white text-slate-600 hover:border-emerald-300 hover:text-emerald-700"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => onCategoryToggle(category.id)}
                        className="h-4 w-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{category.name}</span>
                    </label>
                  );
                })}
              </div>
            ) : (
              <p className="text-sm text-slate-500">No categories available.</p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:items-end">
            <label className="grid gap-1 text-sm font-medium text-slate-700">
              <span>Sort products</span>
              <select
                value={sortBy}
                onChange={handleSortChange}
                className="h-10 min-w-52 rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <button
              type="button"
              onClick={onClear}
              disabled={!hasActiveFilters}
              className="flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 px-3 text-sm font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-300 disabled:hover:text-slate-300"
            >
              <ArrowClockwise size={17} />
              Reset
            </button>

            <button
              type="button"
              onClick={onApply}
              disabled={!hasUnappliedChanges}
              className="flex h-10 items-center justify-center gap-2 rounded-md bg-emerald-600 px-4 text-sm font-semibold text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
