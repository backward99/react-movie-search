export default function Icon({
  children,
  onClick,
  className,
}: {
  children: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <span
      onClick={onClick}
      className={`material-symbols-outlined ${className}`}
    >
      {children}
    </span>
  );
}
