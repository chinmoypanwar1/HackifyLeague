import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

export default function HackathonDetails() {
    const { hackathonId } = useParams();
    const[data , setData] = useState(null)
    useEffect(async ()=>{
        const response = await axios.get(`http://localhost:3000/api/v1/hackathon/getHackathon/${hackathonId}`);
        setData(response);
    } , [])

    if(!data){
        return(
            <p>This is the hardcore info about a hackathon</p>
        )
    }

  return (
    <div>
      this is a hackathons detail page
    </div>
  )
}
