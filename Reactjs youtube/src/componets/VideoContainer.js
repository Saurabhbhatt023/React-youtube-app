import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
import { YOUR_Videos_API } from '../utils/constents'
import VideoCard, { AdVideoCard } from './VideoCard'
// import {AdVideoCard } from './VideoCard'
import { Link } from 'react-router-dom'

const VideoContainer = () => {


    const  [videos ,setvideos ] = useState([])

      useEffect(() => {

        getVideos () 

          
      }, [])

       const getVideos =  async () => {

          const data = await fetch(YOUR_Videos_API)
          const json = await data.json()
          console.log(json)
          setvideos(json.items)
       }   
  return (
    <div className = "flex flex-wrap"> {videos[0] && <AdVideoCard info = {videos[0]} />}{ videos.map((video ,id) =>  ( <Link to ={"/watch?v=" + video.id}> <VideoCard  key = {id} info= {video}/> </Link>  ))} </div>
  )
}

export default VideoContainer