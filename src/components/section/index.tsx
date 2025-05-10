import { Ref } from "react";

interface SectionProps {
  sectionClassName?: string;
  bgClassName?: string;
  children: any;
  ref?: Ref<HTMLElement>
}

const Section: React.FC<SectionProps> = ({
  sectionClassName,
  bgClassName,
  children,
  ref,
}) => {
  return (
    <>
      <section ref={ref} className={`${bgClassName}`}>
        <div className={`container ${sectionClassName}`}>{children}</div>
      </section>
    </>
  );
};

export { Section };
