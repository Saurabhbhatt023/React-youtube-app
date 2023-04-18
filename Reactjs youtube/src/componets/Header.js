import React, { useEffect, useState } from 'react'
 import { YOUTUBE_SEARCH_API } from '../utils/constents'
import { useDispatch, useSelector } from 'react-redux'
import { toggleMenu} from '../utils/appSlice'
import { cacheResults } from '../utils/searchslice'



const Header = () => {

     
      const [searchQuery  , setSearchQuery] = useState("")
      const [suggestion , setsuggestion] = useState("")
      const [ showsuggestion , setshowsuggestion]  = useState (false)
    

       const searchCache = useSelector((store) => store.search)
       const dispatch = useDispatch()
       
                     
                useEffect (() => {    

                  var Timer =  setTimeout (() => {   

                        if(searchCache[searchQuery]) {
                                
                         setsuggestion(searchCache[searchQuery])

                        }
                           else {
                              getSearchSuggestions() 
                           }
                   
                    } , 200)                  // Debouncing on the search bar
                     
                      return () => {

                         clearTimeout(Timer)                       }
   //eslint-disable-next-line 
                } , [searchQuery])



           const getSearchSuggestions = async () => {

              
              const data  = await fetch (YOUTUBE_SEARCH_API + searchQuery)
           
                  const json  = await data.json([1]);
            
         
                  setsuggestion(json[1])           
           
                     dispatch(cacheResults ( { 

                         [searchQuery] : json[1]
                     }) )
              }
            
  
      const toggleMenuHandler = ()   =>  {
      
           dispatch(toggleMenu())

    }
    return (

     
    <div className='grid grid-flow-col p-5 m-2 shadow-md'> 
 
     <div className='flex col-span-1 '> 
        <img  onClick={ () => toggleMenuHandler()} className='h-8' alt = "ham" src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAARVBMVEX///8jHyAgHB0OBQgMAAWlpKQpJSaenZ309PUAAAAIAAD8/Pz5+fna2tqop6dvbW1oZmevrq4tKivFxMQYExRiYGC+vr7Dc4WrAAABB0lEQVR4nO3cS3LCMBAFQGIIIBPbhN/9jxqSyiIsTUnlydB9g1eSNV5MvdUKAAAAAAAAAAAAAAAAXtEwvscwDk3yHabSb2Loy/TRIOHUv8XRH+sHHMrSqR6U+hd1jHSE90P8lHC2/Lc0/0vzMy3WMdynxaFBwu+Jv4uh0cQHAAAAAAAAAIB59jG0ijdcT9sYTtcmK0PncumiuJRz/YD7bbf0ut4f3br+GvQt2PblrXrC3WbpUA/6sXrC/GeY/zvM/5aGmofHZiu0S//M/GoVDwAAAAAAAAAAZsjeuRerN1HL7hPy95fm76DNnzD/Lc3/0rxAJ3v+Xn0AAAAAAAAAAAAAAAD4T74AYhs1O+vt3ioAAAAASUVORK5CYII='/>
       
       <a href='/'>  
         <img className='h-8 mx-2' alt = " youtube-logo"src = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/768px-YouTube_Logo_2017.svg.png?20220605194644" />
         </a>
         </div>
         <div className='col-span-10 px-1'> 
 
            <div className='pl-36'>  
           <input className='w-80 border border-gray-300 p-1 rounded-l-full' type='text' value= {searchQuery} onChange= {(e) => setSearchQuery(e.target.value)} 
            onFocus={ () =>  setshowsuggestion(true)}
            onBlur={ () =>  setshowsuggestion(false)}
           />
           <button className='border border-gray-400 p-1 rounded-r-full bg-gray-100'>Search</button>
           </div>
          
          
         {  showsuggestion && <div className='  fixed  bg-white py-2 px-5 w-[37rem] shadow-lg  rounded-lg  border border-gray-200 '> 
            <ul> 
              
                    {/* {suggestion.map(s) =>  <li key = {s} >{s}</li>)} */}
                    {suggestion.map((s) => <li className='py-2 shadow-sm  hover:bg-gray-200'>{s}</li>)}

               </ul>
               
            </div> }
            
         </div>

         
         <div className='col-span-12 px-2 pl-72'> 
            <img className='h-8' alt = "usericon" src='https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png'/>
         </div>
     </div>
  )
}

export default Header
