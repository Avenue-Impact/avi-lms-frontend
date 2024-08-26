export const initialState = {
  id: "",
  firstname: "",
  lastname: "",
  username: '',
  email: '',
  status: '',
  wishlist: [],
  avatar: null,
  referral_code: '',
  token: ''
}
export const reducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case 'auth/login':
      return {
        ...state,
        ...payload
      }
    case 'auth/logout':
      return initialState
    case 'auth/update_profile':
      return {
        ...state,
        ...payload
      }
    default:
      return state
  }
}