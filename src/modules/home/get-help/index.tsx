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
      title: "Live chat support",
      text: "Available 24/5 in English, French, Arabic, and Swahili. Average response: under 2 minutes.",
      actionText: "Start Live Chat",
      action: () => { },
    },
    {
      icon: <MessagesIcon />,
      title: "Email support",
      text: "hello@farlo.io — Response within 4 hours during trading hours.",
      actionText: "Email us",
      action: () => { },
    },
    {
      icon: <MessageQuestionIcon />,
      title: "Whatsapp",
      text: "For account and funding support in your local language. Number shown after login",
      actionText: "Send us a message",
      action: () => { },
    },
  ];
  return (
    <Section bgClassName={styles.bg}>
      <div className={styles.header}>
        <p className={styles.ttl}>We are here. Talk to us.</p>
        <p className={styles.txt}>
          Real support from people who understand trading. Not bots. Not scripts.
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
