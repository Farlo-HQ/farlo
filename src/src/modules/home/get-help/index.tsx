"use client"


import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import { ArrowRight } from "@/assets/icons/arrow-right";
import { SupportIcon } from "@/assets/icons/24-support";
import { MessagesIcon } from "@/assets/icons/messages";
import { MessageQuestionIcon } from "@/assets/icons/message-question";

const GetHelp = () => {
  const list = [
    {
      icon: <SupportIcon />,
      title: "24/5 customer support",
      text: "Assistance across multiple languages and time zones.",
      actionText: "Contact us",
      action: () => { },
    },
    {
      icon: <MessagesIcon />,
      title: "Live chat & email support",
      text: "Get real-time help for technical or trading-related queries.",
      actionText: "Talk to us",
      action: () => { },
    },
    {
      icon: <MessageQuestionIcon />,
      title: "FAQs & knowledge base",
      text: "ind quick answers to common questions.",
      actionText: "Learn more",
      action: () => { },
    },
  ];
  return (
    <Section bgClassName={styles.bg}>
      <div className={styles.header}>
        <p className={styles.ttl}>Get help when you need it</p>
        <p className={styles.txt}>
          Our team is here to ensure your trading experience remains smooth,
          secure, and stress-free.
        </p>
      </div>
      <div className={styles.cards}>
        {list.map(({ text, title, action, actionText, icon }, index) => (
          <div key={`get-help-${index}`} className={styles.card}>
            {icon}
            <p className={styles.card__ttl}>{title}</p>
            <p className={styles.card__txt}>{text} </p>
            <Button onClick={action} variant="ghost-red">
              {actionText} <ArrowRight />
            </Button>
          </div>
        ))}
      </div>
    </Section>
  );
};
export { GetHelp };
