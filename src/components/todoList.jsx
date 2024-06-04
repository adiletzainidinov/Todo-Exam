import { useDispatch, useSelector } from "react-redux";
import {
  complatedTodoList,
  deleteTodoList,
  editingTodo,
  selectComlated,
  selectLoading,
  selectTodo,
} from "../store/slice/todoSlice";
import styled from "styled-components";
import { useNavigate } from "react-router";

const TodoList = () => {
  const dispatch = useDispatch();
  const todoList = useSelector(selectTodo);
  const navigate = useNavigate();
  const isLoading = useSelector(selectLoading);
  const isComplated = useSelector(selectComlated);

  function deleteHandler(id) {
    dispatch(deleteTodoList(id));
  }

  function editHandler(id) {
    dispatch(editingTodo(id));
    navigate("updateTodo");
  }

  const addTodo = () => {
    navigate("createTodo");
  };

  function toggleIsComplated(id) {
    const requestObject = todoList.find((item) => item.id === id);
    dispatch(complatedTodoList(requestObject));
  }

  return (
    <Container>
      <Header>
        <h2>Todo List</h2>
        {isLoading ? (
          <>
            <Loading>Loading...</Loading>
          </>
        ) : (
          ""
        )}
        <Button
          style={{ backgroundColor: "green", color: "white" }}
          onClick={addTodo}
        >
          Add
        </Button>
      </Header>
      <Table>
        <thead>
          <Tr>
            <Th>№</Th>
            <Th>Задача</Th>
            <Th>Date</Th>
            <Th></Th>
          </Tr>
        </thead>
        {todoList?.map((item, index) => (
          <tbody key={item.id}>
            <Tr>
              <Td>{index + 1}</Td>
              <TdText
                style={
                  item.isComplated
                    ? {
                        textDecoration: "line-through",
                        color: "red",
                      }
                    : {}
                }
              >
                {item.value}
              </TdText>
              <Td>{item.date}</Td>
              <Td>
                {item.isComplated ? (
                  <Button
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => toggleIsComplated(item.id)}
                  >
                    Uncomplated
                  </Button>
                ) : (
                  <Button
                    style={{ backgroundColor: "grey", color: "white" }}
                    onClick={() => toggleIsComplated(item.id)}
                  >
                    Complated
                  </Button>
                )}
                <Button
                  style={{ backgroundColor: "blue", color: "white" }}
                  onClick={() => editHandler(item.id)}
                >
                  Edit
                </Button>
                <Button
                  style={{ backgroundColor: "red", color: "white" }}
                  onClick={() => {
                    deleteHandler(item.id);
                  }}
                >
                  Delete
                </Button>
              </Td>
            </Tr>
          </tbody>
        ))}
      </Table>
    </Container>
  );
};

export default TodoList;

const Loading = styled.h2`
  margin: 0px 0px;
`;
const Container = styled.div`
  width: 70%;
  margin: 0 auto;
`;
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 10px 30px;
`;
const Button = styled.button`
  padding: 5px 0px;
  margin: 0 10px;
  border-radius: 15px;
  border: 0;
  width: 140px;
`;
const Td = styled.td`
  border: 1px solid grey;
  padding: 5px;
  text-align: center;
`;
const TdText = styled.td`
  border: 1px solid grey;
  padding: 5px;
  text-align: left;
`;
const Th = styled.th`
  border: 1px solid grey;
  padding: 10px;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;
const Tr = styled.tr`
  display: grid;
  grid-template-columns: 50px 2fr 1fr 3fr;
  &:hover {
    background-color: #65bdbd;
    color: aliceblue;
  }
`;
