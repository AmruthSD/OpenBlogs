import React, { useEffect, useRef } from "react";
import Quill from "quill";
import 'quill/dist/quill.snow.css'


export default function CollabBlogPage(){
    const wrapperRef = useRef()
    useEffect(()=>{
        const editor = document .createElement('div')
        wrapperRef.current.append(editor)
        new Quill(editor,{theme:"snow"})

        return()=>{
            wrapperRef.innerHTML =""
        }
    },[])
    useEffect(()=>{
        
    },[])
    return(
    <div id='container' className="py-6 px-10 md:px-10 md:py-12 lg:py-16 lg:w-4/5 mx-auto h-screen" ref={wrapperRef}>
        
    </div>
    )
}