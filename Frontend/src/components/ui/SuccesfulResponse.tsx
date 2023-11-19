import { FcApproval } from "react-icons/fc";

export default function SuccesfulResponse(props: { message: string }) {
  return (
    <div className="flex h-screen  justify-center items-center ">
      <div className="flex flex-col items-center border-8 p-20 md:p-40 rounded-3xl border-primary">
        <div className="text-4xl">
          <FcApproval></FcApproval>
        </div>
        <h1 className="text-2xl font-semibold">{props.message}</h1>
      </div>
    </div>
  );
}
