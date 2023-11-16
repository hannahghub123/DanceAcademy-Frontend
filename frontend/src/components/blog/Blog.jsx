import React from 'react'
import BlogCard from './BlogCard'
import Back from '../common/back/Back'
import './Blog.css'

const Blog = () => {
  return (
    <>
    <Back title='Blog Posts'/>
        <section className="blog padding">
            <div className="container">
                <BlogCard/>
            </div>
        </section>
    </>
  )
}

export default Blog