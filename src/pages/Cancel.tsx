import { XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Cancel() {
  return (
    <div className="h-screen">
      <div className="mt-32 md:max-w-[50vw] mx-auto">
        <XCircle className="text-red-600 w-16 h-16 mx-auto my-6" />
        <div className="text-center">
          <h3 className="md:text-2xl text-base text-gray-900 font-semibold text-center">
            Payment Canceled
          </h3>
          <p className="text-gray-600 my-2">
            Unfortunately, your payment was not successful.
          </p>
          <p className="text-gray-600 my-2">
            Please try again, or contact support if you need assistance.
          </p>
          <p>We're here to help you!</p>

          <Button className="mt-5 py-3 px-6">
            <Link to="/">Go Back</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
