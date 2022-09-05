const queries = {
    getEmailEntry:`
    SELECT
    e.title,
    e.content,
    e.date,
    e.category,
    a.name,
    a.surname,
    a.image
FROM entries AS e
INNER JOIN authors AS a ON e.id_author = a.id_author
WHERE email=$1;` ,
    getAllEntry:"" ,
    createEntry:"",
    updateEntry:"",
    deleteEntry:"",
    getEmailAuthor:"" ,
    getAllAuthor:""
}

module.exports = queries;