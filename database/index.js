let books = [ {
    ISBN: "12345ONE",
    title: "Getting started with MERN",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["fiction", "programming", "tech", "web dev"],
    publication: 1
 },
 {
    ISBN: "12345Two",
    title: "Getting started with Python",
    authors: [1, 2],
    language: "en",
    pubDate: "2021-07-07",
    numOfPage: 225,
    category: ["fiction", "tech", "web dev"],
    publication: 1
 },
];

const authors = [
    {
        id: 1,
        name: "aarti",
        books: ["12345ONE"]
    },
    {
        
        id: 2,
        name: "animesh",
        books: ["12345ONE"]
    },
];

const publications = [
    {
        id: 1,
        name: "chakra",
        books: ["12345ONE"],
    },
    {
        id: 2,
        name: "Navneet",
        books: [],
    }
];

module.exports = { books, authors, publications };