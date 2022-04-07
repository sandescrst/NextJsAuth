// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import cookie from "cookie"
import { getSession } from 'next-auth/react'
import axios from 'axios'
const encryption = require('jwt-simple');
import Cookies from 'js-cookie';

export default async function handler(req, res) {
  const session = await getSession({ req });
  // console.log("my request: ", session, res.cookies);
  // res.setHeader("Set-Cookie", cookie.serialize("token", "access_token", {
  //   httpOnly: true,
  //   maxAge: 60 * 60,
  //   sameSite: "strict",
  //   path: "/",
  // }))
  // const decoded_token = encryption.decode(session.a_token, process.env.NEXTAUTH_SECRET)
  // const posts = await axios.get(process.env.BACKEND_URL+"/api/posts/", {
  //     headers: {
  //       'Authorization': `Bear ${decoded_token}`
  //     }
  // }).then(response => {
  //   res.status(200).json(response.data.details);
  // }).catch(err => {
  //   res.status(200).json(response.data);
  // })
  res.status(200).json({"content": "post 1", "id": 1});
}
