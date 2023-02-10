import { useState } from "react";

function Tags() {
  const [text, setText] = useState("");
  const [tags, setTags] = useState([{ text: "고양이", id: 1 }]);
  const [nextId, setNextId] = useState(2);

  const onCreate = (text) => {
    const newTags = [...tags, { id: nextId, text }];
    setTags(newTags);
    setNextId(nextId + 1);
  };

  const onRemove = (id) => {
    const newTags = tags.filter((tag) => tag.id !== id);
    setTags(newTags);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onCreate(text);
    }
    setText("");
  };

  return (
    <>
      <div> 태그목록 </div>
      <div>
        {tags.map((tag) => (
          <div>
            <p>{tag.text}</p>
            <p onClick={() => onRemove(tag.id)}>태그 삭제</p>
          </div>
        ))}
      </div>
      <form className="insert-form" onSubmit={onSubmit}>
        <input
          autoFocus
          placeholder="태그를 입력하세요"
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <button onClick={onSubmit}>태그 만들기 버튼</button>
      </form>
    </>
  );
}

export default Tags;
