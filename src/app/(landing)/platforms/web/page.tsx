"use client";

import { PlatformsUI } from "@/modules/platforms";

// import { PlatformWebUI } from "@/modules/platforms/web";

// export default function Home() {
//   return (
//     <>
//       <PlatformWebUI />
//     </>
//   );
// }

export default function PlatformWebPage() {
  return <PlatformsUI defaultTab="MT5 Web" />;
}
