import { Heading } from 'evergreen-ui'
import React, { useEffect, useState } from 'react'
import { Link, useOutletContext } from '@remix-run/react'

import { ContextType, links } from '../root'

interface IPost {
   id: string
   created_at: string
   title: string
   url: string
   description: string
   user_id: string
}

export default function Index() {
   const [posts, setPosts] = useState<IPost[] | []>([])
   const [status, setStatus] = useState('IDLE')
   const { user, supabase } = useOutletContext<ContextType>()

   useEffect(() => {
      ;(async () => {
         try {
            setStatus('LOADING')
            let { data: posts = [], error = '' } = await supabase.from('post').select(`
               *, 
               account (
                  id,
                  username
               )
            `)

            if (posts?.length === 0) {
               setStatus('EMPTY')
               setPosts([])
            } else {
               setPosts(posts)
               setStatus('SUCCESS')
            }
         } catch (error) {
            setStatus('ERROR')
            // console.log(error)
         }
      })()
   }, [user, supabase])

   if (status === 'LOADING') return <div>Loading...</div>
   if (status === 'ERROR') return <div>Something went wrong!</div>
   return (
      <div>
         <ul id="posts">
            {posts.map(post => (
               <li key={post.id} className="post">
                  <Heading size={500}>
                     <a href={post.url} target="_blank" rel="noreferrer noopener" className="post__title">
                        {post.title}
                     </a>
                     <span className="post__domain">({new URL(post.url).hostname})</span>
                  </Heading>
                  {post?.account?.username && (
                     <Heading size={300} marginTop={8}>
                        {post?.account?.username}
                     </Heading>
                  )}
               </li>
            ))}
         </ul>
      </div>
   )
}
