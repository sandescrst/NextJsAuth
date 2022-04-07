import React from 'react'
import axios from 'axios';
import { getSession, useSession } from "next-auth/react"
const encryption = require('jwt-simple');
import Cookies from 'js-cookie';

export const getServerSideProps = async ({ req }) => {
  
  const session = await getSession({ req });
  const decoded_token = encryption.decode(session.a_token, process.env.NEXTAUTH_SECRET)
  
  const allFollows = await axios.get(process.env.BACKEND_URL+"/api/connection/follower", {
    headers: {
            'Authorization': `Bear ${decoded_token}`
          }
  }).then(res => {

    console.log("sandy",res.data)
      return res.data.details;
  }).catch(err => {
    console.log("Errsss: ", err);
  })

  return {
    props: { follow: allFollows }
  }

}
export default function Profile({follow}) {
  const {data: session, status}= useSession();
  return (
    <div>
      <h1>profile</h1>
      {
        follow.map(follow => (
        <div key = {follow.userid}>
          <p>{follow.email}</p>
          <p>{follow.userid}</p>
        </div>

        ))
      }
    </div>
    
  )
}
