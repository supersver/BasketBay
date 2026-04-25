export const Tooltip = ({
  content,
  children,
}: {
  content: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="relative group w-fit">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden rounded bg-slate-800 px-2 py-1 text-xs text-white group-hover:block">
        {content}
      </div>
    </div>
  );
};
