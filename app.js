const express = require('express');
const config = require('config');
const db = require('./models');
const authMiddlewhare = require('./middleware/auth.middleware');

const app = express();

app.use(express.json({extended: true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', authMiddlewhare, require('./routes/link.routes'));

const PORT = config.get('port') || 5000;

db.sequelize.sync()
    .then(() => {
        app.listen(PORT, () => console.log(`App has been started on port ${PORT}...`));
    })
    .catch(e => {
        console.log(e);
        process.exit(1);
    });
