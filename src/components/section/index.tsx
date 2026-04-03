import { Ref } from "react";

interface SectionProps {
  sectionClassName?: string;
  bgClassName?: string;
  children: any;
  ref?: Ref<HTMLElement>;
  sectionRef?: Ref<HTMLDivElement>;
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  sectionClassName,
  bgClassName,
  children,
  ref,
  id,
  sectionRef
}) => {
  return (
    <>
      <section id={id} ref={ref} className={`${bgClassName}`}>
        <div ref={sectionRef} className={`container ${sectionClassName}`}>{children}</div>
      </section>
    </>
  );
};

export { Section };
