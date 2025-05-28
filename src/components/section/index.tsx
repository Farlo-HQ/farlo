import { Ref } from "react";

interface SectionProps {
  sectionClassName?: string;
  bgClassName?: string;
  children: any;
  ref?: Ref<HTMLElement>;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  sectionClassName,
  bgClassName,
  children,
  ref,
  id,
}) => {
  return (
    <>
      <section id={id} ref={ref} className={`${bgClassName}`}>
        <div className={`container ${sectionClassName}`}>{children}</div>
      </section>
    </>
  );
};

export { Section };
