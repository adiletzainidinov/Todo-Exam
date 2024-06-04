import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";

const TodoForm = ({ onSubmit, data, buttonValue, nameValue, color }) => {
  const [value, setValue] = useState("");
  const [date, setDate] = useState("");
  const [id, setId] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setValue(data.value);
      setDate(data.date);
      setId(data.id);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      value,
      date,
      id,
      isComplated: false,
    };
    onSubmit(newTodo);

    setValue("");
    setDate("");
    navigate("/");
  };

  return (
    <Container>
      <h2 style={{ textAlign: "center" }}>{nameValue}</h2>
      <form onSubmit={handleSubmit}>
        <InputContainer>
          <label htmlFor="value">Задача</label>
          <Input
            type="text"
            id="value"
            placeholder="Last Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            required
          />

          <label htmlFor="date">Date</label>
          <Input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </InputContainer>
        <ButtonContainer>
          <Button style={{ backgroundColor: `${color}` }} type="submit">
            {buttonValue}
          </Button>
          <Button
            onClick={() => navigate("/")}
            style={{ backgroundColor: "red" }}
          >
            calcel
          </Button>
        </ButtonContainer>
      </form>
    </Container>
  );
};

export default TodoForm;

const Container = styled.div`
  margin: 30px auto;
  width: 40%;
  border: 1px solid black;
  padding: 20px;
`;
const Input = styled.input`
  width: 100%;
  padding: 5px 10px;
  margin-bottom: 5px;
`;
const InputContainer = styled.div`
  margin-top: 10px;
`;
const ButtonContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;
const Button = styled.button`
  width: 48%;
  padding: 7px 10px;
  color: white;
  border-radius: 10px;
  border: 0;
`;
