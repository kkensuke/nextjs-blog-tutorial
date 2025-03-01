"use client";

import { BLOG_CONFIG } from '@/config/site';

const Comment = () => {
  return (
    <section
      style={{ width: '100%' }}
      ref={
        element => {
          if (!element) {
            return
          }

          const scriptElement = document.createElement('script')
          scriptElement.setAttribute('src', 'https://utteranc.es/client.js')
          scriptElement.setAttribute('repo', BLOG_CONFIG.comment_repo)
          scriptElement.setAttribute('issue-term', 'pathname')
          scriptElement.setAttribute('theme', 'github-dark')
          scriptElement.setAttribute('crossorigin', 'anonymous')
          scriptElement.setAttribute('async', 'true')
          element.replaceChildren(scriptElement)
        }
      }
    />
  )
}

export default Comment;