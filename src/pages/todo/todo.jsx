import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faSquare, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import Pagination from "../components/pagination";

// createTodo POST
// todos
// Bearer access_token
// headers: {
//   Authorization: `Bearer ${accessToken}`
// }
// body
// todo : string
// response status: 201 Created

// getTodos GET
// todos
// Bearer access_token
// headers: {
//   Authorization: `Bearer ${accessToken}`
// }

// updateTodo PUT
// /todos/:id
// status: 200 OK

// deleteTodo DELETE
// /todos/:id
// status: 204 No Content
// body: 없음

const TodoTable = styled.main`
  display: table;
  width: 700px;
  height: 100%;

  ul {
    display: table-row;
  }
  ul.subject {
    display: table-header-group;
  }
  li {
    display: table-cell;
    width: 80px;
    text-align: center;
  }
`;

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const [editTodoList, setEditTodoList] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const res = await axios.get("/todos", { headers: {Authorization : `Bearer ${accessToken}`}});
      setTodoList(res.data);
    }
    getTodos();
  }, []);

  const todoComplete = () => {
    if(!window.confirm("완료처리 하시겠습니까?")) {
      return false;
    };
  }

  const addTodo = (e) => {
    e.preventDefault();
    console.log(todo);
    // axios post 보내기
  };

  const todoChange = (e) => {
    const { name, value } = e.target;
    
    if(name === "todo") {
      setTodo(value);
    } else {
      const editId = Number(name.replace('todo', ''));
      setTodoList(prev => prev.map((obj) => obj.id === editId ? { ...obj, todo: value } : {...obj})); 
    }
  }

  // 수정/취소/제출 버튼
  const clickBtn = (e, id) => {
    const { name } = e.target;
    if(name === "editTodo") setEditTodoList(prev => [...prev, { id: id, todo: todoList.find(obj => obj.id === id).todo }]);
    else if(name === "editCancel") {
      setTodoList(prev => prev.map(obj => obj.id === id ? { ...obj, todo: editTodoList.find(tmp => tmp.id === id).todo } : {...obj})); 
      setEditTodoList(prev => prev.filter(item => item.id !== id));
    }
    else if(name === "editSubmit") {
      console.log('edit submit')
    }
    else if(name === "delTodo") {
      console.log('del todo');
    }
  };

  useEffect(() => {
    console.log(todoList);
  }, [todoList])
  const [todo, setTodo] = useState('');
  
  return (
    <div>
      <header></header>
      <form onSubmit={addTodo}>
        <input type="text" name="todo" value={todo} onChange={todoChange} placeholder="todo 적기"/>
        <button type="submit">추가</button>
      </form>
      <TodoTable>
        <ul className="subject">
          <li>완료여부</li>
          <li>번호</li>
          <li>할일</li>
          <li></li>
          <li></li>
        </ul>
        {todoList.slice(offset, offset + limit).map(({isCompleted, id, todo}, i) => 
          {
            const isEdit = editTodoList.some(obj => obj.id === id);
            return (
              <ul key={i}>
                <li>
                  <span onClick={todoComplete}>{isCompleted ? <FontAwesomeIcon icon={faSquareCheck} /> : <FontAwesomeIcon icon={faSquare} />}</span>
                  </li>
                <li>
                  <span>{id}</span>
                </li>
                <li>
                  <input type="text" name={"todo" + id} value={todo} onChange={todoChange} disabled={!isEdit ? true : false} />
                </li>
                <li className="edit_btns">
                  {!isCompleted ? isEdit ? (
                        <>
                          <button name="editSubmit" onClick={e => clickBtn(e, id)}>제출</button>
                          <button name="editCancel" onClick={e => clickBtn(e, id)}>취소</button>
                        </>
                      ) : (
                        <button name="editTodo" onClick={e => clickBtn(e, id)}>수정</button>
                      )
                    : <></>
                  }
                </li>
                <li>
                  <button name="delTodo" onClick={e => clickBtn(e, id)}>삭제</button>
                </li>
              </ul>)
          }
        )}
      </TodoTable>
      <footer>
        <Pagination total={todoList.length} limit={limit} page={page} setPage={setPage} />
      </footer>
    </div>
  );
};

export default TodoPage;
