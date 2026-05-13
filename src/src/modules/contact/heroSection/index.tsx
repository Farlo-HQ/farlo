import { Button, Section } from "@/components";
import styles from "./styles.module.scss";
import Image from "next/image";
import { contact_hero } from "@/assets/images";
import { useState } from "react";
import { Input, TextArea } from "@/components/input";

const HeroSection = () => {
  return (
    <Section bgClassName={styles.bg} sectionClassName={styles.section}>
      <div>
        <div className={styles.header}>
          <p className={styles.header__tag}>Contact us</p>
          <h1 className={styles.header__ttl}>Get in touch</h1>
          <p className={styles.header__txt}>
            Drop us a line for new business, partnerships or general inquiry
          </p>
        </div>
        <ContactForm />
      </div>
      <Image
        src={contact_hero}
        alt="support personnel speaking"
        width={591}
        height={775}
      />
    </Section>
  );
};

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm = () => {
  const [state, setState] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const { name, message, email } = state;
  const [error, setError] = useState<ContactFormErrors | undefined>();

  const handleSubmit = () => {
    const errors: ContactFormErrors = {};

    if (name.trim().length === 0) errors.name = "Required";
    if (message.trim().length === 0) errors.message = "Required";
    else if (message.trim().length < 12)
      errors.message = "Message must contain at least 10 characters";
    if (email.trim().length === 0) errors.email = "Required";

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      console.log(state);
    }
  };

  return (
    <>
      <form className={styles.form}>
        <Input
          name="name"
          label="Full name"
          placeholder="John Doe"
          value={name}
          onChange={(e) =>
            setState((prev) => ({ ...prev, name: e.target.value }))
          }
          error={error?.name}
        />
        <Input
          name="email"
          type="email"
          label="Email"
          placeholder="John @website.com"
          value={email}
          onChange={(e) =>
            setState((prev) => ({ ...prev, email: e.target.value }))
          }
          error={error?.email}
        />
        <TextArea
          name="message"
          label="Message"
          placeholder="Enter your message"
          value={message}
          onChange={(e) =>
            setState((prev) => ({ ...prev, message: e.target.value }))
          }
          error={error?.message}
        />
        <Button onClick={handleSubmit}>Send Message</Button>
      </form>
    </>
  );
};

export { HeroSection };
