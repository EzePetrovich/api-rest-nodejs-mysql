import APP_CONFIG from '@src/config';
import mysql from 'mysql2/promise';

const { DB } = APP_CONFIG;

const connection = mysql.createPool({
  host: DB.HOST,
  port: DB.PORT,
  database: DB.NAME,
  user: DB.USER,
  password: DB.PASSWORD,
});

export async function list<T>(table: string) {
  const query = `SELECT * FROM ${table};`;
  const [results] = await connection.query(query);
  return results as T[];
}

export async function detail<T>(table: string, id: number) {
  const query = `SELECT * FROM ${table} 
                WHERE id = ${id};`;
  const [results] = await connection.query(query);
  return results as T[];
}

type MatrixData = [fields: string[], values: string[]];

export async function add<T>(table: string, data: T & Object) {
  const entries = Object.entries(data);

  const [fieldsArray, valuesArray] = entries.reduce(
    (initial: MatrixData, [field, value]) => {
      const [fields, values] = initial;
      fields.push(field);
      const checkedValue =
        typeof value == 'string' || value instanceof String
          ? `'${value}'`
          : value;
      values.push(checkedValue);
      return initial;
    },
    [[], []]
  );

  const fields = fieldsArray.join(', ');
  const values = valuesArray.join(', ');

  const query = `INSERT INTO ${table} (${fields}) VALUES (${values});`;
  await connection.query(query);
}

export async function remove(table: string, id: number) {
  const query = `DELETE FROM ${table} WHERE id = ${id};`;
  await connection.query(query);
  return true;
}
