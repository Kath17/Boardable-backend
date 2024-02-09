import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`CREATE TABLE boards (
  id SERIAL PRIMARY KEY,
  title VARCHAR(50) NOT NULL,
  color VARCHAR(7) NOT NULL,
  created_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  user_id INT NOT NULL
);
`);
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE boards;`);
};
