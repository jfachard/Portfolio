interface SectionHeadingProps {
  title: string;
  aside?: React.ReactNode;
  onTextHover: (e: React.MouseEvent<HTMLElement>) => void;
  onTextLeave: () => void;
}

export const SectionHeading = ({
  title,
  aside,
  onTextHover,
  onTextLeave,
}: SectionHeadingProps) => {
  return (
    <header className="flex flex-wrap items-end justify-between gap-3 mb-10 md:mb-12">
      <h2
        className="font-display m-0 leading-[0.95]"
        style={{ fontSize: 'clamp(2.25rem, 5.5vw, 3.75rem)' }}
        onMouseEnter={onTextHover}
        onMouseLeave={onTextLeave}
      >
        {title}
      </h2>
      {aside}
    </header>
  );
};
