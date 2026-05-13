"use client";

import { PlatformsUI } from "@/modules/platforms";

// import { PlatformDesktopUI } from "@/modules/platforms/desktop";

// export default function Home() {
//   return (
//     <>
//       <PlatformDesktopUI />
//     </>
//   );
// }
export default function PlatformDesktopPage() {
  return <PlatformsUI defaultTab="MT5 Desktop" />;
}