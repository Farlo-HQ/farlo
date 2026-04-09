"use client";
import { useState, useRef } from "react";
import styles from "./styles.module.scss";
import { Button } from "@/components";
import { Input } from "@/components/input";
import { useDashboard } from "@/context/DashboardContext";
import {
  IconShieldCheck,
  IconUser,
  IconId,
  IconCamera,
  IconCircleCheck,
  IconChevronRight,
  IconUpload,
  IconX,
} from "@tabler/icons-react";

type KYCStep = "intro" | "personal" | "document" | "facial" | "submitted";

const STEPS = ["Personal Info", "Document", "Facial", "Review"];

const KycUI = () => {
  const [step, setStep] = useState<KYCStep>("intro");
  const { setKycStatus } = useDashboard();

  const [personal, setPersonal] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    nationality: "",
    address: "",
    city: "",
    postalCode: "",
  });

  const [docType, setDocType] = useState<"passport" | "id" | "license">(
    "passport"
  );
  const [docFile, setDocFile] = useState<File | null>(null);
  const [facialFile, setFacialFile] = useState<File | null>(null);

  const docRef = useRef<HTMLInputElement>(null);
  const facialRef = useRef<HTMLInputElement>(null);

  const stepIndex =
    step === "personal"
      ? 0
      : step === "document"
        ? 1
        : step === "facial"
          ? 2
          : step === "submitted"
            ? 3
            : -1;

  const handleSubmit = () => {
    setKycStatus("submitted");
    setStep("submitted");
  };

  return (
    <div className={styles.container}>
      {step === "intro" && (
        <div className={styles.intro}>
          <div className={styles.intro_icon}>
            <IconShieldCheck size={40} strokeWidth={1.2} />
          </div>
          <h1 className={styles.intro_title}>Identity Verification</h1>
          <p className={styles.intro_sub}>
            To comply with financial regulations and keep your account secure,
            we need to verify your identity. This process takes about 5 minutes.
          </p>

          <div className={styles.intro_steps}>
            <div className={styles.intro_step}>
              <div className={styles.step_icon_sm}>
                <IconUser size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className={styles.step_label}>Personal Information</p>
                <p className={styles.step_desc}>
                  Basic details about you
                </p>
              </div>
            </div>
            <div className={styles.intro_step}>
              <div className={styles.step_icon_sm}>
                <IconId size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className={styles.step_label}>Government ID</p>
                <p className={styles.step_desc}>
                  Passport, national ID, or driver&apos;s license
                </p>
              </div>
            </div>
            <div className={styles.intro_step}>
              <div className={styles.step_icon_sm}>
                <IconCamera size={18} strokeWidth={1.5} />
              </div>
              <div>
                <p className={styles.step_label}>Facial Verification</p>
                <p className={styles.step_desc}>
                  A photo of you holding your document
                </p>
              </div>
            </div>
          </div>

          <Button onClick={() => setStep("personal")} className={styles.intro_btn}>
            Start Verification
            <IconChevronRight size={16} />
          </Button>
        </div>
      )}

      {step !== "intro" && step !== "submitted" && (
        <>
          <div className={styles.progress_bar}>
            {STEPS.map((s, i) => (
              <div key={s} className={styles.progress_step}>
                <div
                  className={`${styles.progress_dot} ${i <= stepIndex ? styles.progress_dot_active : ""
                    }`}
                >
                  {i < stepIndex ? (
                    <IconCircleCheck size={16} />
                  ) : (
                    <span>{i + 1}</span>
                  )}
                </div>
                <p
                  className={`${styles.progress_label} ${i === stepIndex ? styles.progress_label_active : ""
                    }`}
                >
                  {s}
                </p>
                {i < STEPS.length - 1 && (
                  <div
                    className={`${styles.progress_line} ${i < stepIndex ? styles.progress_line_active : ""
                      }`}
                  />
                )}
              </div>
            ))}
          </div>

          <div className={styles.step_body}>
            {step === "personal" && (
              <div className={styles.form_section}>
                <h2 className={styles.section_title}>Personal Information</h2>
                <p className={styles.section_sub}>
                  Enter your details exactly as they appear on your government ID.
                </p>
                <div className={styles.form_grid}>
                  <Input
                    label="First Name"
                    value={personal.firstName}
                    onChange={(e) =>
                      setPersonal((p) => ({ ...p, firstName: e.target.value }))
                    }
                    styleType="style2"
                    placeholder="John"
                  />
                  <Input
                    label="Last Name"
                    value={personal.lastName}
                    onChange={(e) =>
                      setPersonal((p) => ({ ...p, lastName: e.target.value }))
                    }
                    styleType="style2"
                    placeholder="Doe"
                  />
                  <Input
                    label="Date of Birth"
                    type="date"
                    value={personal.dob}
                    onChange={(e) =>
                      setPersonal((p) => ({ ...p, dob: e.target.value }))
                    }
                    styleType="style2"
                  />
                  <Input
                    label="Nationality"
                    value={personal.nationality}
                    onChange={(e) =>
                      setPersonal((p) => ({
                        ...p,
                        nationality: e.target.value,
                      }))
                    }
                    styleType="style2"
                    placeholder="Nigerian"
                  />
                  <div className={styles.full_col}>
                    <Input
                      label="Residential Address"
                      value={personal.address}
                      onChange={(e) =>
                        setPersonal((p) => ({ ...p, address: e.target.value }))
                      }
                      styleType="style2"
                      placeholder="123 Street Name"
                    />
                  </div>
                  <Input
                    label="City"
                    value={personal.city}
                    onChange={(e) =>
                      setPersonal((p) => ({ ...p, city: e.target.value }))
                    }
                    styleType="style2"
                    placeholder="Lagos"
                  />
                  <Input
                    label="Postal Code"
                    value={personal.postalCode}
                    onChange={(e) =>
                      setPersonal((p) => ({
                        ...p,
                        postalCode: e.target.value,
                      }))
                    }
                    styleType="style2"
                    placeholder="100001"
                  />
                </div>
                <div className={styles.step_actions}>
                  <Button
                    variant="fill-red"
                    onClick={() => setStep("document")}
                  >
                    Continue <IconChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}

            {step === "document" && (
              <div className={styles.form_section}>
                <h2 className={styles.section_title}>Government ID</h2>
                <p className={styles.section_sub}>
                  Upload a clear photo of a valid government-issued ID.
                </p>

                <div className={styles.doc_types}>
                  {(
                    [
                      { value: "passport", label: "Passport" },
                      { value: "id", label: "National ID" },
                      { value: "license", label: "Driver's License" },
                    ] as const
                  ).map((d) => (
                    <button
                      key={d.value}
                      className={`${styles.doc_type_btn} ${docType === d.value ? styles.doc_type_active : ""
                        }`}
                      onClick={() => setDocType(d.value)}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>

                <input
                  ref={docRef}
                  type="file"
                  accept="image/*,.pdf"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setDocFile(e.target.files?.[0] || null)
                  }
                />

                <div
                  className={`${styles.upload_zone} ${docFile ? styles.upload_zone_filled : ""
                    }`}
                  onClick={() => docRef.current?.click()}
                >
                  {docFile ? (
                    <div className={styles.upload_preview}>
                      <IconCircleCheck
                        size={24}
                        className={styles.upload_success_icon}
                      />
                      <p className={styles.upload_filename}>{docFile.name}</p>
                      <button
                        className={styles.upload_remove}
                        onClick={(e) => {
                          e.stopPropagation();
                          setDocFile(null);
                        }}
                      >
                        <IconX size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={styles.upload_icon}>
                        <IconUpload size={24} strokeWidth={1.5} />
                      </div>
                      <p className={styles.upload_label}>
                        Click to upload or drag and drop
                      </p>
                      <p className={styles.upload_hint}>
                        JPG, PNG or PDF — max 10MB
                      </p>
                    </>
                  )}
                </div>

                <div className={styles.step_actions}>
                  <Button
                    variant="outline-red"
                    onClick={() => setStep("personal")}
                  >
                    Back
                  </Button>
                  <Button
                    variant="fill-red"
                    onClick={() => setStep("facial")}
                  >
                    Continue <IconChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}

            {step === "facial" && (
              <div className={styles.form_section}>
                <h2 className={styles.section_title}>Facial Verification</h2>
                <p className={styles.section_sub}>
                  Take or upload a clear photo of yourself holding your
                  government ID next to your face.
                </p>

                <div className={styles.facial_tips}>
                  <p className={styles.tips_title}>Tips for a good photo:</p>
                  <ul className={styles.tips_list}>
                    <li>Make sure your face is clearly visible</li>
                    <li>Hold your ID clearly visible next to your face</li>
                    <li>Use good lighting — avoid shadows</li>
                    <li>No glasses or hats</li>
                  </ul>
                </div>

                <input
                  ref={facialRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={(e) =>
                    setFacialFile(e.target.files?.[0] || null)
                  }
                />

                <div
                  className={`${styles.upload_zone} ${styles.facial} ${facialFile ? styles.upload_zone_filled : ""
                    }`}
                  onClick={() => facialRef.current?.click()}
                >
                  {facialFile ? (
                    <div className={styles.upload_preview}>
                      <IconCircleCheck
                        size={24}
                        className={styles.upload_success_icon}
                      />
                      <p className={styles.upload_filename}>{facialFile.name}</p>
                      <button
                        className={styles.upload_remove}
                        onClick={(e) => {
                          e.stopPropagation();
                          setFacialFile(null);
                        }}
                      >
                        <IconX size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className={styles.upload_icon}>
                        <IconCamera size={32} strokeWidth={1.2} />
                      </div>
                      <p className={styles.upload_label}>
                        Upload image with ID
                      </p>
                      <p className={styles.upload_hint}>
                        JPG or PNG — max 10MB
                      </p>
                    </>
                  )}
                </div>

                <div className={styles.step_actions}>
                  <Button
                    variant="outline-red"
                    onClick={() => setStep("document")}
                  >
                    Back
                  </Button>
                  <Button variant="fill-red" onClick={handleSubmit}>
                    Submit for Review <IconChevronRight size={16} />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </>
      )}

      {step === "submitted" && (
        <div className={styles.submitted}>
          <div className={styles.submitted_icon}>
            <IconCircleCheck size={48} strokeWidth={1.2} />
          </div>
          <h1 className={styles.submitted_title}>
            Verification Submitted!
          </h1>
          <p className={styles.submitted_sub}>
            We&apos;ve received your documents. Our team will review your
            submission and you&apos;ll be notified within 24–48 hours.
          </p>
          <div className={styles.submitted_status}>
            <span className={styles.status_badge}>Under Review</span>
          </div>
          <Button variant="outline-red" onClick={() => (window.location.href = "/overview")}>
            Back to Dashboard
          </Button>
        </div>
      )}
    </div>
  );
};

export { KycUI };