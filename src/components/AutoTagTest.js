import React, { useState, useEffect } from "react";

const TestComponent = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState([]);
  const [selectedTag, setSelectedTag] = useState("");
  const [viewContent, setViewContent] = useState([]);

  useEffect(() => {
    const storedTags = JSON.parse(localStorage.getItem("tags")) || [];
    setTags(storedTags);
  }, []);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleInput = () => {
    const newTag = { title, content };
    const updatedTags = [...tags, newTag];
    setTags(updatedTags);
    localStorage.setItem("tags", JSON.stringify(updatedTags));
    setTitle("");
    setContent("");
  };

  const handleTagSelect = (e) => {
    const selectedTitle = e.target.value;
    setSelectedTag(selectedTitle);
  };

  const handleAdd = () => {
    const tag = tags.find((tag) => tag.title === selectedTag);
    if (tag) {
      setViewContent((prevContent) => [...prevContent, tag.content]);
    }
  };

  const handleCopy = () => {
    const contentToCopy = `<html>\n${viewContent.join("\n")}\n</html>`;
    navigator.clipboard.writeText(contentToCopy)
      .then(() => {
        console.log("클립보드에 복사되었습니다.");
      })
      .catch((err) => {
        console.log("복사하는 중에 오류가 발생했습니다.");
      });
  };

  return (
    <div className="auto-tag">
      {/* tag-input */}
      <div className="tag-input">
        {/* 입력한 제목과 내용을 로컬스토리지에 저장 */}
        <div>
          <label>제목</label>
          <input type="text" value={title} onChange={handleTitleChange} />
        </div>
        <div>
          <label>내용</label>
          <textarea value={content} onChange={handleContentChange}></textarea>
        </div>
        <button onClick={handleInput}>입력</button>
      </div>
      {/* tag-output */}
      <div className="tag-output">
        {/* tag-input에 저장된 내용들을 tag-select에 제목을 나열 / 선택시 tag-view에 제목과 매칭되는 내용을 뿌린다 */}
        <select className="tag-select" value={selectedTag} onChange={handleTagSelect}>
          <option value="">태그를 선택하세요</option>
          {tags.map((tag, index) => (
            <option key={index} value={tag.title}>
              {tag.title}
            </option>
          ))}
        </select>
        <div className="tag-view">
          {viewContent.map((content, index) => (
            <div key={index}>{content}</div>
          ))}
        </div>
        <button onClick={handleAdd}>추가</button>
        <button onClick={handleCopy}>복사</button>
      </div>
    </div>
  );
};

export default TestComponent;
