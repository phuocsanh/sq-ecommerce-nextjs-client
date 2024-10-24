import { Suspense } from "react";
import BtnLogin from "./components/BtnLogin";
export default function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <BtnLogin />
    </Suspense>
  );
}
function Loading() {
  return <h2 color="red">🌀 Loading...</h2>;
}
