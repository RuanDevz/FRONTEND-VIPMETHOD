import { CheckCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Success() {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <CheckCheck className="text-green-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Successful!
          </h3>
          <p className="text-gray-600 my-2">
            Congratulations! Your payment has been completed, and you are now a VIP member.
          </p>
          <p className="text-gray-600 my-2">
            You can now enjoy all videos without ads and gain access to exclusive content!
          </p>
          <p>Thank you for joining us. Have a great experience!</p>

          <Button className="mt-5 py-3 px-6">
            <Link to="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
