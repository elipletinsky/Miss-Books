import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'bookDB'

// https://elipletinsky.github.io/assets/img/Gwent.jpg
const genericBooks = [
  {
    "id": "OXeMG8wNskc",
    "title": "Gwent",
    "subtitle": "The Witcher Card Game",
    "authors": ["CD Projekt Red"],
    "publishedDate": 2017,
    "description": "An in-depth guide to Gwent, the card game from the Witcher universe, detailing strategies, card descriptions, and the game's development history.",
    "pageCount": 240,
    "categories": ["Games", "Fantasy"],
    "thumbnail": "https://elipletinsky.github.io/Miss-Books/assets/img/Gwent.jpg",
    "language": "en",
    "listPrice": {
      "amount": 109,
      "currencyCode": "EUR",
      "isOnSale": false
    }
  },
  {
    "id": "JYOJa2NpSCq",
    "title": "The Ode Less Travelled",
    "subtitle": "Unlocking the Poet Within",
    "authors": ["Stephen Fry"],
    "publishedDate": 2005,
    "description": "Stephen Fry's comprehensive guide to writing poetry, offering insights into various poetic forms, meters, and techniques, encouraging readers to explore their poetic potential.",
    "pageCount": 384,
    "categories": ["Poetry", "Writing"],
    "thumbnail": "https://elipletinsky.github.io/Miss-Books/assets/img/The Ode Less Travelled.jpg",
    "language": "sp",
    "listPrice": {
      "amount": 44,
      "currencyCode": "EUR",
      "isOnSale": true
    }
  },
  {
    "id": "1y0Oqts35DQ",
    "title": "The Unsung Hero",
    "subtitle": "Troubleshooters, Book 1",
    "authors": ["Suzanne Brockmann"],
    "publishedDate": 2000,
    "description": "The first book in the Troubleshooters series, focusing on Navy SEAL Lieutenant Tom Paoletti as he uncovers a terrorist plot while reconnecting with his past love.",
    "pageCount": 400,
    "categories": ["Romance", "Military Fiction"],
    "thumbnail": "https://elipletinsky.github.io/Miss-Books/assets/img/The Unsung Hero.jpg",
    "language": "he",
    "listPrice": {
      "amount": 108,
      "currencyCode": "ILS",
      "isOnSale": false
    }
  },
  {
    "id": "kSnfIJyikTP",
    "title": "The Rise Of The Russian Empire",
    "subtitle": "A Historical Narrative",
    "authors": ["Saki (H.H. Munro)"],
    "publishedDate": 1900,
    "description": "A historical account detailing the expansion and consolidation of the Russian Empire, written by the renowned British author Saki.",
    "pageCount": 320,
    "categories": ["History", "Politics"],
    "thumbnail": "https://elipletinsky.github.io/Miss-Books/assets/img/The Rise Of The Russian Empire.jpg",
    "language": "en",
    "listPrice": {
      "amount": 30,
      "currencyCode": "EUR",
      "isOnSale": true
    }
  },
  {
    "id": "f4iuVmbuKCC",
    "title": "Holes",
    "subtitle": "A Novel",
    "authors": ["Louis Sachar"],
    "publishedDate": 1998,
    "description": "A young adult novel about Stanley Yelnats, a boy wrongfully sent to a detention camp where he uncovers a family curse and hidden treasure.",
    "pageCount": 233,
    "categories": ["Young Adult", "Adventure"],
    "thumbnail": "https://elipletinsky.github.io/Miss-Books/assets/img/Holes.jpg",
    "language": "sp",
    "listPrice": {
      "amount": 19,
      "currencyCode": "USD",
      "isOnSale": false
    }
  },
  {
    "id": "U2rfZO6oBZf",
    "title": "Schisms",
    "subtitle": "A Study in Religious and Political Divisions",
    "authors": ["Joseph T. Stuart"],
    "publishedDate": 2021,
    "description": "An academic examination of historical and contemporary schisms in religious and political contexts, analyzing their causes and effects.",
    "pageCount": 400,
    "categories": ["History", "Religion"],
    "thumbnail": "https://elipletinsky.github.io/Miss-Books/assets/img/Schisms.jpg",
    "language": "en",
    "listPrice": {
      "amount": 91,
      "currencyCode": "USD",
      "isOnSale": true
    }
  },
  {
    "id": "xI0wrXaaAcq",
    "title": "The Face In The Abyss",
    "subtitle": "A Classic Fantasy Tale",
    "authors": ["A. Merritt"],
    "publishedDate": 1931,
    "description": "A classic fantasy novel that follows an adventurer's journey into a mysterious lost civilization hidden within the Andes.",
    "pageCount": 320,
    "categories": ["Fantasy", "Adventure"],
    "thumbnail": "https://elipletinsky.github.io/Miss-Books/assets/img/The Face In The Abyss.jpg",
    "language": "he",
    "listPrice": {
      "amount": 90,
      "currencyCode": "USD",
      "isOnSale": false
    }
  }
]
//`../assets/img/${book.title}.jpg`
_createBooks()

export const bookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
        // console.log('books before filter', books)
            if (filterBy.authors) {
                console.log('filterBy.authors:', filterBy.authors)
                const regExp = new RegExp(`^${filterBy.authors}`, 'i')

                books = books.filter(book => book.authors.some(author => regExp.test(author)))
                // console.log('filtered books by :',filterBy.authors, books)
            }
            if (filterBy.minPrice) {
              console.log('filterBy.minPrice:', filterBy.minPrice)
                books = books.filter(book => {
                  const priceInShekels = convertToshekel(book.listPrice.amount, book.listPrice.currencyCode)
                  return priceInShekels >= filterBy.minPrice
                  })
            }
            if(filterBy.orderByPrice){
              console.log('filterBy.orderByPrice:', filterBy.orderByPrice)
              books.sort((a, b) => {
                const priceA = convertToshekel(a.listPrice.amount, a.listPrice.currencyCode)
                const priceB = convertToshekel(b.listPrice.amount, b.listPrice.currencyCode)
                return priceA - priceB
            })
            }
            console.log('books after filter', books) 
            return books
        })
}

function get(bookId) {
    return storageService.get(BOOK_KEY, bookId)
        .then(_setNextPrevBookId)
}

function remove(bookId) {
    return storageService.remove(BOOK_KEY, bookId)
}

function save(book) {
    if (book.id) {
        return storageService.put(BOOK_KEY, book)
    } else {
        return storageService.post(BOOK_KEY, book)
    }
}

function getEmptyBook() {
    return {
      title: '',
      subtitle: '',
      authors: '',
      publishedDate: '',
      description: '',
      pageCount: '',
      categories: '',
      thumbnail: '',
      language: '',
      listPrice: {
          amount: '',
          currencyCode: '',
          isOnSale: false
      }
  }
}


function getDefaultFilter() {
    // return { txt: '', minSpeed: '' }
    return { authors: '', minPrice: '', publishedDate: '',orderByPrice: false, language: '', categories: '',isOnSale: ''}
}

function convertToshekel(amount, currencyCode) {
  switch (currencyCode) {
    case 'USD':
      return amount * 3.2
    case 'EUR':
      return amount * 3.8
    case 'ILS':
      return amount
  }

}


function _setNextPrevBookId(book) {
    return query().then((books) => {
        const bookIdx = books.findIndex((currBook) => currBook.id === book.id)
        const nextBook = books[bookIdx + 1] ? books[bookIdx + 1] : books[0]
        const prevBook = books[bookIdx - 1] ? books[bookIdx - 1] : books[books.length - 1]
        book.nextBook = nextBook.id
        book.prevBook = prevBook.id
        console.log('_setNextPrevBookId nextBook:', nextBook)
        console.log('_setNextPrevBookId book:', book)
        return book
    })
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    
    if (!books || !books.length) {
        saveToStorage(BOOK_KEY, genericBooks)
    }
}

