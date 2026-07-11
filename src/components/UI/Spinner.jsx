const Spinner = ({ size = "md", label = "Loading" }) => {
  const sizes = { sm: "h-4 w-4 border-2", md: "h-6 w-6 border-2", lg: "h-10 w-10 border-[3px]" };

  return (
    <span className="inline-flex items-center justify-center gap-2" role="status" aria-live="polite">
      <span className={`${sizes[size]} animate-spin rounded-full border-current border-r-transparent`} aria-hidden="true" />
      {label && <span>{label}</span>}
    </span>
  );
};

export default Spinner;
