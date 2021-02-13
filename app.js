//console.log("hello world!");
const pgp = require('pg-promise')();
const shortid = require('shortid');

const db = pgp('postgres://postgres:somePassword@localhost:5432/tm');
const query1 = 'INSERT INTO fly_booking(booking_id, client_name, fly_number, "from", "to", date) VALUES ($1, $2, $3, $4, $5, $6);';
const query2 = 'INSERT INTO hotel_booking(booking_id, client_name, hotel_name, arrival, departure) VALUES ($1, $2, $3, $4, $5);';
const query3 = 'UPDATE account SET amount = amount - 200 WHERE client_name=$1';

const name = 'Nik';
db.tx(t =>  {
    const q1 = db.none(query1, [shortid.generate(), name, 'KLM 1382', 'KBP', 'AMS', '01/05/2015']);
    const q2 = db.none(query2, [shortid.generate(), name, 'Hilton', '01/05/2015', '07/05/2015']);
    const q3 = db.none(query3, [name])
    return t.batch([q1, q2, q3]);
}).then(data => { data })
.catch(error => {
    console.log(error);
});

