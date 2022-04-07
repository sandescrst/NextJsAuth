import React from 'react';
import axios from 'axios';
import { getSession, useSession } from "next-auth/react"
const encryption = require('jwt-simple');
import Cookies from 'js-cookie';
import classes from '../styles/home.module.scss';

export const getServerSideProps = async ({ req }) => {
  
  const session = await getSession({ req });
  const decoded_token = encryption.decode(session.a_token, process.env.NEXTAUTH_SECRET)
  
  const allPosts = await axios.get(process.env.BACKEND_URL+"/api/posts/", {
    headers: {
            'Authorization': `Bear ${decoded_token}`
          }
  }).then(res => {
      return res.data.details;
  }).catch(err => {
    console.log("Errsss: ", err);
  })

  return {
    props: { posts: allPosts }
  }

}

export default function Home({ posts }) {
    const { data: session, status } = useSession();
    return (
        <div className={classes.homepage}>
            {
                posts.map(post => (
                  <Postcard post = {post} key = {post.id} />
                ))
            }
        </div>
    )
}

// Home.getInitialProps = async () => {
//   // const allPosts = await fetch("https://jsonplaceholder.typicode.com/posts");
//   console.log("cookie, ", Cookies.get("_token"))
//   const allPosts = await axios.get(process.env.NEXTAUTH_URL+"/api/hello").then(res => {
//     console.log("responsedd", res.data);
//   }).catch(err => {
//     console.log("Errsss: ", err);
//   })
//   // console.log(allPosts);
//   // const data = await allPosts.json();

//   return {
//     posts: [{"id": 1, "content": "None"}]
//   }

// }