/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
// src/pages/members/MemberListItems.tsx

import { useMembersState, useMembersDispatch } from "../../context/members/context";
import { DeleteMember } from "../../context/members/actions";

export default function MemberListItems() {
  let state: any = useMembersState();
  const dispatchMembers = useMembersDispatch();

  const { members, isLoading, isError, errorMessage } = state;
  console.log(members);

  if (members.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const handleDelete = async (id: string) => {
    const response = await DeleteMember(dispatchMembers, id);
    if (!response.ok) {
      alert("Failed to delete member: " + response.error);
    }
  };

  return (
    <>
      {members.map((member: any) => (
        <div
          key={member.id}
          className="member block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
        >
          <h5 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {member.name}
          </h5>
          <h4 className="mb-2 text-xl font-medium tracking-tight text-gray-900 dark:text-white">
            {member.email}
          </h4>
          <button
            onClick={() => handleDelete(member.id)}
            id="delete-member"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </>
  );
}
