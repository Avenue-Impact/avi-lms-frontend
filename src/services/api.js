import axios from "axios";
import Cookies from "js-cookie";

const url = import.meta.env.VITE_USER_URL;
const token = Cookies.get('token')

export async function fetchUserProfile() {

  try {
    const response = await axios.get(url, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })

    return response
  } catch (error) {
    console.log(error);

  }

}