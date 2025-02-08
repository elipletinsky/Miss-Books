import { bookService } from "../services/book.service.js"

const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        console.log('filterByToEdit:', filterByToEdit)
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])
    //{ author: '', price: '', publishedDate: '', language: '', categories: '',isOnSale: ''}

    function handleChange({ target }) {
        let { value, name: field } = target
        console.log('handleChange recived field:', field, 'value:', value)
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        console.log('handleChange changed field:', field, 'value:', value)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    // function handleChangePrimitive({ target }) {
    //     const value = target.value
    //     const field = target.name
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    // }

    // function handleTxtChange(ev) {
    //     const value = ev.target.value
    // setFilterByToEdit(prevFilter => ({ ...prevFilter, txt: value }))
    // }

    // function handleMinSpeedChange(ev) {
    //     const value = ev.target.value
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, minSpeed: value }))
    // }

    const { authors, price, publishedDate, language, categories, isOnSale} = filterByToEdit
    return (
        <section className="car-filter">
            <h2>Filter Our Books</h2>
            <form>
                <label htmlFor="authors">Author</label>
                <input onChange={handleChange} value={authors} type="text" name="authors" id="authors" />

                <label htmlFor="price">Price</label>
                <input onChange={handleChange} value={price || ''} type="number" name="price" id="price" />

                <button>Submit</button>
            </form>
        </section>
    )
}