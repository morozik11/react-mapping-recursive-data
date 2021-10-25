import React, { useState } from "react";
import "./styles.css";

interface Comment {
  id: number
  text: string
  children?: Comment[]
}

let comments: Comment[] = [
  {
    id: 1,
    text: "message 1",
    children: [
      {
        id: 3,
        text: "message 3"
      }
    ]
  },
  {
    id: 2,
    text: "message 2",
    children: [
      {
        id: 4,
        text: "message 4",
        children: [
          {
            id: 7,
            text: "message 7"
          },
          {
            id: 8,
            text: "message 8"
          }
        ]
      },
      {
        id: 5,
        text: "message 5"
      }
    ]
  }
];

const CommentItem: React.FC<{ comment: Comment, level: number }> = ({ comment, level }) => {
  const [isShowChildren, setShowChildren] = useState(false)

  const changeVisibility = () => {
    setShowChildren(!isShowChildren)
  }

  const styleForSpan = {
    marginLeft: "5px",
    marginRight: "5px"
  }

  const styleForConatiner = {
    marginTop: '5px',
    marginLeft: `${level*30}px`
  }

  return (
    <>
      <div style={styleForConatiner}>
        {isShowChildren && <span style={styleForSpan}>-</span>}
        {!isShowChildren && <span style={styleForSpan}>+</span>}
        <span style={styleForSpan}>{comment.text}</span>
        <button onClick={() => changeVisibility()}>Show children</button>
        {
          isShowChildren &&
          comment.children &&
          comment.children.map((item) => (<CommentItem key={item.id} comment={item} level={level+1}></CommentItem>))
        }
      </div>
    </>
  )
}

export default function App() {
  return (
    <div className="App">
      {
        comments.map((item) => (<CommentItem key={item.id} comment={item} level={0}></CommentItem>))
      }
    </div>
  )
}
