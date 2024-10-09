import React from "react";
import { Userdatatypes } from "../../../types/Userdatatypes";

type UserDetailsProps = {
  userData: Userdatatypes;
};

const UserDetails: React.FC<UserDetailsProps> = ({ userData }) => (
  <div className="mb-4">
    <p><strong>Name:</strong> {userData.name}</p>
    <p><strong>Email:</strong> {userData.email}</p>
    <p><strong>VIP Status:</strong> {userData.isVip ? "Yes" : "No"}</p>
  </div>
);

export default UserDetails;
