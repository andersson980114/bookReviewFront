import React, { useEffect, useState } from 'react';
import { Container, InputGroup, Form, Button, Badge } from 'react-bootstrap';
import BookCard from '../../components/BookCard';
import { FaSearch } from 'react-icons/fa';
import { useBook } from '../../contexts/BookContext/BookContext';

const Dashboard = () => {
  const { books, categories } = useBook();
  const [searchData, setSearchData] = useState([]);
  const [inputSearchData, setInputSearchData] = useState({ search: '' });
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    setSearchData(books);
  }, [books]);

  const handleData = (e) => {
    setInputSearchData({
      ...inputSearchData,
      [e.target.name]: e.target.value,
    });

    if (e.target.value === undefined || e.target.value === '') {
      setSearchData(books);
    } else {
      const dataCopy = books
        .filter((item) => {
          return (
            item.nombre.toLowerCase().includes(inputSearchData.search.toLowerCase()) ||
            item.autor.nombre.toLowerCase().includes(inputSearchData.search.toLowerCase()) ||
            item.autor.apellido.toLowerCase().includes(inputSearchData.search.toLowerCase())
          );
        })
        .map((item) => item);
      setSearchData(dataCopy);
    }
  };

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const filteredBooks = books.filter((book) => {
    const matchesSearchTerm =
      book.nombre.toLowerCase().includes(inputSearchData.search.toLowerCase()) ||
      book.autor.nombre.toLowerCase().includes(inputSearchData.search.toLowerCase()) ||
      book.autor.apellido.toLowerCase().includes(inputSearchData.search.toLowerCase());

    const matchesSelectedCategories =
      selectedCategories.length === 0 || selectedCategories.includes(book.categoria._id);

    return matchesSearchTerm && matchesSelectedCategories;
  });

  return (
    <Container style={descriptionStyles.container}>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Buscar"
          aria-label="Buscar"
          aria-describedby="basic-addon2"
          value={inputSearchData.search}
          name="search"
          onChange={handleData}
        />
        <Button variant="outline-secondary" id="button-addon2">
          <FaSearch style={{ marginInline: '5px' }} />
        </Button>
      </InputGroup>

      <Form.Group controlId="categoryFilter">
        <Form.Label>Filtrar por Categorías:</Form.Label>
        <div className="d-flex flex-wrap pb-4">
          {categories.map((category) => (
            <Form.Check
              key={category._id}
              type="checkbox"
              label={category.nombre}
              value={category._id}
              onChange={handleCategoryChange}
              checked={selectedCategories.includes(category._id)}
              className="me-3 mb-2"
            />
          ))}
        </div>
      </Form.Group>

      <div className="row justify-content-center">
        {filteredBooks.map((book, index) => (
          <div key={index} className="col-lg-4 col-md-6 col-xs-12 mb-4 mx-auto">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </Container>
  );
};

const descriptionStyles = {
  container: {
    padding: '20px',
  },
};

export default Dashboard;
