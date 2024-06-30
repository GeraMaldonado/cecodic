const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = process.argv[2];

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Error al generar el hash:', err);
    process.exit(1);
  } else {
    console.log(hash);
  }
});

