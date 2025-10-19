import React, {useState} from 'react'

export const PostForm = ({
  onSubmit,
}) => {
  const [content,setContent] =useState("");
  const handleSubmit = () => {
    if(onSubmit){
      console.log("dadada")
      onSubmit({
        content: content,
        title:"dummy"
     });
    }
  }
  return (
     <div className="kakoi2">
            <div className="box">
            <textarea
            className="text"
            placeholder="今どうしてる？"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            maxLength={100}
            />
            <button disabled={!content} className="button" onClick={handleSubmit}>投稿</button>
            </div>
          </div>
  )
}
