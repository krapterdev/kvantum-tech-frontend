import bcrypt from 'bcryptjs';
import { db } from '../../config/db.js';

const mapUser = (row) => {
  if (!row) return null;
  return {
    id: row._id,
    _id: row._id,
    name: row.name,
    email: row.email,
    password: row.password,
    role: row.role,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    comparePassword: async function(candidate) {
      return await bcrypt.compare(candidate, this.password);
    }
  };
};

export const findUserByEmail = async (email) => {
  const result = await db.query('SELECT * FROM users WHERE "email" = $1', [email.toLowerCase().trim()]);
  return mapUser(result.rows[0]);
};

export const findUserById = async (id) => {
  const result = await db.query('SELECT * FROM users WHERE "_id" = $1', [id]);
  const user = mapUser(result.rows[0]);
  if (user) {
    delete user.password;
  }
  return user;
};

export const createUser = async (userData) => {
  const { id, name, email, password, role } = userData;
  const targetId = id || 'user_' + Math.random().toString(36).substr(2, 9);
  
  const hashedPassword = await bcrypt.hash(password, 10);
  
  const result = await db.query(
    `INSERT INTO users ("_id", "name", "email", "password", "role") VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [targetId, name, email.toLowerCase().trim(), hashedPassword, role || 'sales']
  );
  return mapUser(result.rows[0]);
};

export const listAllUsers = async () => {
  const result = await db.query('SELECT * FROM users ORDER BY "created_at" DESC');
  return result.rows.map(row => {
    const user = mapUser(row);
    delete user.password;
    return user;
  });
};

export const deleteUserById = async (id) => {
  const result = await db.query('DELETE FROM users WHERE "_id" = $1 RETURNING *', [id]);
  return mapUser(result.rows[0]);
};
