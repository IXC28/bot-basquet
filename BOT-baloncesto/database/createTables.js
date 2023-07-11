const db = require('./index');

// Crear usuarios
const createUsers = async () => {
  const deleteStatement = db.prepare(`
    DROP TABLE IF EXISTS users
`);
  deleteStatement.run();

  const createStatement = db.prepare(`
    CREATE TABLE IF NOT EXISTS users (
        discord_id TEXT PRIMARY KEY, 
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        token TEXT NOT NULL
    )
    `);
  createStatement.run();

};

// Crear notas
const createNotes = async () => {
  const deleteStatement = db.prepare(`
    DROP TABLE IF EXISTS notes
`);
  deleteStatement.run();

  const createStatement = db.prepare(`
    CREATE TABLE IF NOT EXISTS notes (
      note_id INTEGER PRIMARY KEY AUTOINCREMENT,
      text TEXT NOT NULL,
      discord_id TEXT NOT NULL,
      FOREIGN KEY (discord_id)
        REFERENCES users (discord_id)
        ON DELETE CASCADE
    )
    `);
  createStatement.run();

};

// Crear Monedas
const createCoin = async () => {
  const deleteStatement = db.prepare(`
    DROP TABLE IF EXISTS coins
`);
  deleteStatement.run();

  const createStatement = db.prepare(`
    CREATE TABLE IF NOT EXISTS coins (
        discord_id TEXT PRIMARY KEY, 
        name TEXT NOT NULL,
        banco INTEGER NOT NULL
    )
    `);
  createStatement.run();

};

const createTables = async () => {
  await createUsers();
  console.log('Tabla de usuarios creadas');
  await createNotes();
  console.log('Tablas de notas creadas');
  await createCoin();
  console.log('Tablas de usuariosCoin creada');

  console.log('tablas creadas');
};

createTables();