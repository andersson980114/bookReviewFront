import React from 'react'
import { useParams } from 'react-router-dom'
import BookDetails from '../../components/BookDetails'
import ReviewSection from '../../components/ReviewSection'
import { Container } from 'react-bootstrap'
import { useBook } from '../../contexts/BookContext/BookContext'
import { useEffect } from 'react'
 
const Book = () => {
    const  params  = useParams()
    const { getBookById } = useBook() 
    
    useEffect(() => { 
        getBookById(params.id) 
    }, [])
 
    return (
        <Container>
            <BookDetails/>
            <ReviewSection />
        </Container>
    )
}

export default Book
