import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSquare, faSquareCheck } from "@fortawesome/free-regular-svg-icons";
import Pagination from "../components/pagination";
import { request } from "../../lib/request";
import { TodoDiv, TodoTable, TodoWrap } from "../../styles/styles";

const TodoPage = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState('');
  const [editTodoList, setEditTodoList] = useState([]);

  // Todo Table Pagination 옵션
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await request.get("/todos");
        setTodoList(res.data);
      } catch(e) {
        console.log(e);
      }
    };

    getTodos();
  }, []);

  const todoComplete = async (id) => {
    if(!window.confirm("완료처리 하시겠습니까?")) {
      return false;
    };
    const findTodo = todoList.find(obj => obj.id === id);
    try {
      const res = await request.put(`/todos/${id}`, { todo: findTodo.todo, isCompleted: true });
      setTodoList(prev => prev.map(obj => obj.id === id ? res.data : {...obj})); 
    } catch(e) {
      console.log(e);
    }
  }

  const createTodo = async (e) => {
    e.preventDefault();
    if(todo !== "") {
      try {
        const res = await request.post("/todos", { todo: todo });
        alert("Todo가 추가되었습니다.");
        setTodoList(prev => [...prev, res.data]);
        setTodo('');
      } catch(e) {
        console.log(e);
      }
    }
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
  const clickBtn = async (e, id) => {
    const { name } = e.target;
    if(name === "editTodo") setEditTodoList(prev => [...prev, { id: id, todo: todoList.find(obj => obj.id === id).todo }]);
    else if(name === "editCancel") {
      setTodoList(prev => prev.map(obj => obj.id === id ? { ...obj, todo: editTodoList.find(tmp => tmp.id === id).todo } : {...obj})); 
      setEditTodoList(prev => prev.filter(item => item.id !== id));
    }
    else if(name === "editSubmit") {
      const findTodo = todoList.find(obj => obj.id === id);
      if(findTodo) {
        try {
          const res = await request.put(`/todos/${id}`, { todo: findTodo.todo, isCompleted: findTodo.isCompleted });
          alert("수정 되었습니다.");
          setTodoList(prev => prev.map(obj => obj.id === id ? res.data : {...obj})); 
          setEditTodoList(prev => prev.filter(item => item.id !== id));
        } catch(e) {
          console.log(e)
        }
      }
    }
    else if(name === "delTodo") {
      if(!window.confirm("삭제 하시겠습니까?")) {
        return false;
      };
      const findTodo = todoList.find(obj => obj.id === id);
      if(findTodo) {
        try {
          const res = await request.delete(`/todos/${id}`);
          setTodoList(prev => prev.filter(item => item.id !== id)); 
          alert("삭제 되었습니다.");
        } catch(e) {
          console.log(e)
        }
      }
    }
  };
  
  return (
    <TodoWrap>
      <header>
        <h1>Todo List</h1>
      </header>
      <form onSubmit={createTodo}>
        <input type="text" name="todo" value={todo} onChange={todoChange} placeholder="todo 적기"/>
        <button type="submit">추가</button>
      </form>
      <TodoDiv>
        <TodoTable>
          <ul className="subject">
            <li>완료여부</li>
            <li>번호</li>
            <li>할일</li>
            <li>수정</li>
            <li>삭제</li>
          </ul>
          {todoList.slice(offset, offset + limit).map(({isCompleted, id, todo}, i) => 
            {
              const isEdit = editTodoList.some(obj => obj.id === id);
              return (
                <ul key={i}>
                  <li>
                    {isCompleted ? <span><FontAwesomeIcon icon={faSquareCheck} /></span> : <span className="empty_check" onClick={_ => todoComplete(id)}><FontAwesomeIcon icon={faSquare} /></span>}
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
      </TodoDiv>
      <footer>
        <Pagination total={todoList.length} limit={limit} page={page} setPage={setPage} />
      </footer>
    </TodoWrap>
  );
};

export default TodoPage;
