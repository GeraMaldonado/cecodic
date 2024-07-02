const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { getConnection } = require('./../database/database');

const login = async (req, res) => {
  const { usuario, contrasena } = req.body;

  try {
    const connection = getConnection();
    const [rows] = await connection.query('SELECT * FROM usuarios WHERE usuario = ?', [usuario]);
    if (rows.length === 0) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    const user = rows[0];
    const passwordMatch = await bcrypt.compare(contrasena, user.contrasena);

    if (!passwordMatch) {
      console.log(contrasena)
      console.log(user.contrasena)
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user.id }, 'secreto', { expiresIn: '1h' });

    res.status(200).json({ token });

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { login };

