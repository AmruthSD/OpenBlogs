import { Spinner } from "@nextui-org/react";

export default function FullScreenSpinner() {
  return (
    <div
      className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-75"
      style={{ zIndex: 999 }}
    >
      <Spinner size="lg" />
    </div>
  );
}
