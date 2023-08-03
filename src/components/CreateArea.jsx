import React from "react";

function CreateArea(props) {
  return (
    <div>
      <form>
        <input name="title" placeholder="Title" onChange={props.handleChange} value={props.title}/>
        <textarea name="content" placeholder="Take a note..." rows="3" onChange={props.handleChange} value={props.content}/>
        <button onClick={props.addItems}>Add</button>
      </form>
    </div>
  );
}

export default CreateArea;
