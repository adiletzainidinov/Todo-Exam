import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import styled from 'styled-components';
import './../App.css'
const TodoForm = ({ onSubmit, data, buttonValue, nameValue, color }) => {
  const [value, setValue] = useState('');
  const [id, setId] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setValue(data.value);
      setId(data.id);
    }
  }, [data]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      value,
      id,
      isComplated: false,
    };
    onSubmit(newTodo);

    setValue('');
    navigate('/');
  };

  return (
    <Container>
      <h2 style={{ textAlign: 'center' }}>{nameValue}</h2>
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
        </InputContainer>
        <ButtonContainer>
          <Button style={{ backgroundColor: `blue` }} type="submit">
            {buttonValue}
          </Button>
          <Button
            onClick={() => navigate('/')}
            style={{ backgroundColor: 'red' }}
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
  border: none;
  padding: 20px;
  border-radius: 10px;
  background-color: #90f1fd;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.15);
  label {
    font-size: 24px;
    font-weight: bold;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 10px 10px;
  margin-bottom: 5px;
  border-radius: 10px;
  border: none;
  margin-top: 10px;
  outline: none;
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
