interface SectionProps {
  sectionClassName?: string;
  bgClassName?: string;
  children: any;
}

const Section: React.FC<SectionProps> = ({
  sectionClassName,
  bgClassName,
  children,
}) => {
  return (
    <>
      <section className={`${bgClassName}`}>
        <div className={`container ${sectionClassName}`}>{children}</div>
      </section>
    </>
  );
};

export { Section };
