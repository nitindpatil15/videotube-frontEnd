import React from 'react'
import context from './context.js'
import {useContext} from 'react'

import React from 'react'

const VideoContext = () => {
  // const host = process.env.HOST;
  const videosinitial = [];
  const [video, setVideo] = useState(videosinitial);
  
  return (
    <VideoContext.Provider
      value={{  }}
    >
      {props.children}
    </VideoContext.Provider>
  )
}

export default VideoContext
