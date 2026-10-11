import { Suspense } from "react";
import CoinsClient from "./CoinsClient";

export default function CoinsPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6">
          Loading coins...
        </div>
      }
    >
      <CoinsClient />
    </Suspense>
  );
}