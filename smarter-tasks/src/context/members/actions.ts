/* eslint-disable @typescript-eslint/no-explicit-any */
// src/context/members/actions.ts
import { API_ENDPOINT } from '../../config/constants';

// src/context/members/actions.ts
export const DeleteMember = async (dispatch: any, id: string) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    const res = await fetch(`${API_ENDPOINT}/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to delete");
    }

    dispatch({ type: "DELETE_MEMBER", payload: id });
    return { ok: true };
  } catch (error: any) {
    return { ok: false, error: error.message };
  }
};


export const fetchMembers = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";
  
  try {
    dispatch({ type: "FETCH_MEMBERS_REQUEST" });
    const response = await fetch(`${API_ENDPOINT}/users`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch({ type: "FETCH_MEMBERS_SUCCESS", payload: data });
  } catch (error) {
    console.log('Error fetching members:', error);
    dispatch({ type: "FETCH_MEMBERS_FAILURE", payload: 'Unable to load members' });
  }
};

export const addMember = async (dispatch: any, args: any) => {
  try {
    const token = localStorage.getItem("authToken") ?? "";
    const response = await fetch(`${API_ENDPOINT}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` },

      // Next, I'll pass the `args` here
      body: JSON.stringify(args), 
    });
    if (!response.ok) {
      throw new Error('Failed to create member');
    }
    const data = await response.json();
    if (data.errors && data.errors.length > 0) {
      return { ok: false, error: data.errors[0].message }
    }

    dispatch({ type: 'ADD_MEMBER_SUCCESS', payload: data.user });

    // Next, I'll return a status called "ok", with value `true`
    // as everything went well.
    return { ok: true }
  } catch (error) {
    console.error('Operation failed:', error);
  // Dialogue 5: And for error I'll return status called "ok", with value `false`.
    return { ok: false, error }
  }
};