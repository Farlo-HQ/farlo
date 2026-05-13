// "use client";

// import { AuthUI } from "@/modules/auth/auth";

// export default function Home() {
//   return (
//     <>
//       <AuthUI />
//     </>
//   );
// }


"use client";
import { AuthUI } from "@/modules/auth/auth";
export default function LoginPage() {
  return <AuthUI defaultTab="login" />;
}
