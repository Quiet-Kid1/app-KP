import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = event => {
    event.preventDefault();

    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type="text"
        name="q"
        onChange={e => setKeyword(e.target.value)}
        placeholder="Cari Berita.."
        className="mr-sm-2 "
        autoComplete="off"
      ></Form.Control>
      <Button type="submit" variant="outline-success" className="p-2" size="sm">
        Cari
      </Button>
    </Form>
  );
};

export default SearchBox;
