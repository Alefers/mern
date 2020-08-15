const express = require('express');
const config = require('config');
const db = require('./config/database');

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));

const PORT = config.get('port') || 5000;

async function start() {
    try {
        await db.authenticate()
            .then(() => console.log('Db connected'))
            .catch(err => console.log('Error: ' + err));
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    } catch (e) {
        console.log('Server error', e.message);
        process.exit(1);
    }
}

start();

