import useHttp from '../../hooks/use-http';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {

  const { isLoading, error, sendRequest: sendTask } = useHttp();

  const enterTaskHandler = async (taskText) => {

    const createTask = (data) => {
      const generatedId = data.name; // firebase-specific => "name" contains generated id
      const createdTask = { id: generatedId, text: taskText };
      props.onAddTask(createdTask);
    }

    sendTask({
      url: process.env.REACT_APP_FIREBASE_URL,
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: { text: taskText }
    }, createTask);

  };

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
