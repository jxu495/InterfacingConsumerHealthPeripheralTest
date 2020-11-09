import React, { useState, useEffect } from 'react';
import { Text } from 'react-native';

const TestAPI = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then((response) => response.json())
      .then((json) => setData(json.title))
  }, []);

  return (
    <Text>
      Fetched title... {data}.
    </Text>
  );
}



export default TestAPI;
