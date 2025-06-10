/* eslint-disable @typescript-eslint/no-explicit-any */
import { MembersState, Member } from '../../types.ts';

// Now, I'll rename the interface in the `MemberList` component from `State`
// to `MembersState`. And I'll also export the interface. 

export const initialState: MembersState = {
  members: [],
  isLoading: false,
  isError: false,
  errorMessage: ''
};
// Next, I'll comment the `Action` interface

// interface Action {
//   type: string;
//   payload?: any;
// }

// Then I'll define a new type called `MembersActions` 
// for all possible combimations of action objects.

export type MembersActions = 
  | { type: 'FETCH_MEMBERS_REQUEST' }
  | { type: 'FETCH_MEMBERS_SUCCESS'; payload: Member[] }
  | { type: 'FETCH_MEMBERS_FAILURE'; payload: string }
  | { type: 'ADD_MEMBER_SUCCESS'; payload: Member }
  | { type: 'DELETE_MEMBER'; payload: string };

export const reducer = (state: MembersState = initialState, action: MembersActions): MembersState => {
  switch (action.type) {
    case "FETCH_MEMBERS_REQUEST":
      return {
        ...state,
        isLoading: true
      };   
    case "FETCH_MEMBERS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        members: action.payload,
      };      
    case "FETCH_MEMBERS_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true, 
        errorMessage: action.payload
      };  
    case 'ADD_MEMBER_SUCCESS':
      // Here I'll insert new new member object, which is coming in this 
      // `action.payload`, to the `members` array present in state.
      return { ...state, members: [...state.members, action.payload] };  
    case 'DELETE_MEMBER':
      return { ...state, members: state.members.filter((member: any) => member.id !== action.payload) };         
    default:
      return state;
  }
}