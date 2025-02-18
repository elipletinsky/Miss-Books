

const { useState, useEffect } = React


export function BookFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        //console.log('filterByToEdit:', filterByToEdit)
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])
    //{ authors: '', minPrice: '', publishedDate: '',orderByPrice: false, language: '', categories: '',isOnSale: ''}

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


    const { authors, minPrice, publishedDate, orderByPrice, language, categories, isOnSale} = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form>
                <label htmlFor="authors">Author</label>
                <input onChange={handleChange} value={authors} type="text" name="authors" id="authors" />

                <label htmlFor="minPrice">Minimum Price</label>
                <input onChange={handleChange} value={minPrice || ''} type="number" name="minPrice" id="minPrice" />

                <label htmlFor="orderByPrice">By ascending Price</label>
                <input onChange={handleChange} value={orderByPrice} type="checkbox" name="orderByPrice" id="orderByPrice" className="orderByPrice-checkbox" />

                <button>Submit</button>
            </form>
        </section>
    )
}