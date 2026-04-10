import React, { useState } from "react";
import axios from "axios";
import Modal from "../modal";
import styles from "./styles.module.css";
import Toast from "../toast";

const SCRIPT_API_URL =
  "https://script.google.com/macros/s/AKfycbx3v4_9GtY5kwd7Ns81UPqJmqluN9JOG7twU2H2cI6XZPjw9T-V7T90M1fJZgfiuKerNQ/exec";

interface WaitlistFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const InputField: React.FC<{
  label: string;
  type: string;
  value: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}> = ({ label, type, value, onChange, placeholder, error, disabled }) => (
  <div className={styles.inputField}>
    <label>{label}</label>
    <input
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      disabled={disabled}
    />
    <p className={styles.error}>{error}</p>
  </div>
);

const TextAreaField: React.FC<{
  label: string;
  value: string;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ label, value, onChange, placeholder, error, disabled }) => (
  <div className={styles.textAreaField}>
    <label>{label}</label>
    <textarea
      disabled={disabled}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <p className={styles.error}>{error}</p>
  </div>
);

const CheckboxField: React.FC<{
  label: string;
  options: string[];
  selectedOptions: string[];
  onChange: (option: string) => void;
  error?: string;
  disabled?: boolean;
}> = ({ label, options, selectedOptions, onChange, error, disabled }) => (
  <div className={styles.checkboxField}>
    <label>{label}</label>
    {options.map((option) => (
      <div key={option}>
        <input
          type="checkbox"
          checked={selectedOptions.includes(option)}
          onChange={() => onChange(option)}
          disabled={disabled}
        />
        {option}
      </div>
    ))}
    <p className={styles.error}>{error}</p>
  </div>
);

const WaitlistForm: React.FC<WaitlistFormProps> = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [clientType, setClientType] = useState<string[]>([]);
  const [interestedFeatures, setInterestedFeatures] = useState<string[]>([]);
  const [lookingForward, setLookingForward] = useState("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    clientType: "",
    interestedFeatures: "",
  });
  const [showToast, setShowToast] = useState({
    type: "",
    message: "",
    show: false,
  });

  const validateForm = () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phoneNumber: "",
      clientType: "",
      interestedFeatures: "",
    };

    if (!name) {
      newErrors.name = "Name is required";
      valid = false;
    }
    if (!email) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email is invalid";
      valid = false;
    }
    if (!phoneNumber) {
      newErrors.phoneNumber = "Phone number is required";
      valid = false;
    }
    if (clientType.length === 0) {
      newErrors.clientType = "At least one investor type is required";
      valid = false;
    }
    if (interestedFeatures.length === 0) {
      newErrors.interestedFeatures = "At least interested product is required";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    // Handle form submission

    console.log({
      name,
      email,
      phoneNumber,
      clientType,
      lookingForward,
    });

    submit();
  };

  const handleClientTypeChange = (option: string) => {
    setClientType((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleInterestedFeaturesChange = (option: string) => {
    setInterestedFeatures((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const submit = () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("Name", name);
    formData.append("Email", email);
    formData.append("Phone", phoneNumber);
    formData.append("Client Type", clientType.join(", "));
    formData.append("Interested Features", interestedFeatures.join(", "));
    formData.append("Message", lookingForward);

    if (SCRIPT_API_URL) {
      axios
        .post(SCRIPT_API_URL, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          setName("");
          setEmail("");
          setPhoneNumber("");
          setClientType([]);
          setInterestedFeatures([]);
          setLookingForward("");
          setErrors({
            name: "",
            email: "",
            phoneNumber: "",
            clientType: "",
            interestedFeatures: "",
          });
          onClose();

          handleToast({
            show: true,
            type: "success",
            message: "Your request has been submitted successfully",
          });
        })
        .catch((e) => {
          setLoading(false);
          console.log(e, "e");

          handleToast({
            show: true,
            type: "error",
            message:
              e?.response?.data?.message ?? "Your request failed to submit",
          });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  const handleToast = ({
    show,
    type,
    message,
  }: {
    show: boolean;
    type: "error" | "success";
    message: string;
  }) => {
    setShowToast({ show, type, message });

    setTimeout(() => {
      setShowToast({ type: "", message: "", show: false });
    }, 2000);
  };

  return (
    <>
      <Toast
        show={showToast.show}
        type={showToast.type}
        message={showToast.message}
        onClose={() => setShowToast({ ...showToast, show: false })}
      />

      <Modal isOpen={isOpen} onClose={onClose} title="Get Early Access">
        <form onSubmit={handleSubmit} className={styles.waitlistForm}>
          <InputField
            label="Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter full name"
            error={errors.name}
            disabled={loading}
          />
          <InputField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email address"
            error={errors.email}
            disabled={loading}
          />
          <InputField
            label="Phone Number"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            error={errors.phoneNumber}
            disabled={loading}
          />
          <CheckboxField
            label="Client Type"
            options={["Institutional Client", "Retail Client"]}
            selectedOptions={clientType}
            onChange={handleClientTypeChange}
            error={errors.clientType}
            disabled={loading}
          />
          <CheckboxField
            label="Which of these features are you most interested in (Select as many as applies)"
            options={[
              "CFDs & Social Trading",
              "U.S. Equities & Options Access",
              "Move Money Globally",
            ]}
            selectedOptions={interestedFeatures}
            onChange={handleInterestedFeaturesChange}
            error={errors.interestedFeatures}
            disabled={loading}
          />
          <TextAreaField
            label="What are you looking forward to?"
            value={lookingForward}
            onChange={(e) => setLookingForward(e.target.value)}
            placeholder="Enter your message"
            disabled={loading}
          />
          <button
            disabled={loading}
            type="submit"
            className={styles.submitButton}
          >
            {loading ? "Loading..." : "Submit"}
          </button>

          <p style={{
            color: "#000",
            textAlign: "center",
            fontSize: "12px"
          }}>Unlocking Global Trading Access for the Next Billion Users</p>
        </form>
      </Modal>
    </>
  );
};

export default WaitlistForm;
