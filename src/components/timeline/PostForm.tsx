import React from 'react'

export const PostForm = ({
  onSubmit,
}) => {

  const handleSubmit = () => {
    if(onSubmit){
      console.log("dadada")
      onSubmit({
        content: "test content",
     });
    }
  }
  return (
     <div className="kakoi2">
            <div className="box">
            <input type="text" className="text" placeholder="今どうしてる？" />
            <button className="button" onClick={handleSubmit}>投稿</button>
            </div>
          </div>
  )
}
