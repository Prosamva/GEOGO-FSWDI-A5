import { useEffect } from 'react'
import PostCard from './PostCard'

function PostList({posts, _handleNoneMessage, _handleEditPost, _handleDeletePost}){
    useEffect(()=>{
        if(posts.length===0) _handleNoneMessage(true)
        else _handleNoneMessage(false)
    })
    return (
        <div className='post-list'>
            {posts.map(post=>
                <PostCard
                    key={post._id}
                    id={post._id}
                    title={post.title}
                    content={post.content}
                    author={post.author}
                    dateCreated={post.date}
                    _handleEditPost={_handleEditPost}
                    _handleDeletePost={_handleDeletePost}
                />)}
        </div>
    )
}

export default PostList;