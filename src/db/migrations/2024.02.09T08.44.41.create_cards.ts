import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    user_id INT NOT NULL,
    board_id INT NOT NULL
);
`);
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE cards;`);
};
