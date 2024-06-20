const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const history = require('connect-history-api-fallback');

const eventosRoutes = require('./routes/eventos.routes');
const app = express();
app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(history({
  rewrites: [
    { from: /^\/api\/.*$/, to: (context) => context.parsedUrl.pathname }
  ]
}));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/eventos', eventosRoutes);

module.exports = app;