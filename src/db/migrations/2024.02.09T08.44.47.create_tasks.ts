import { Migration } from "../scripts/dbMigrate";

export const up: Migration = async (params) => {
  params.context.query(`CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    task VARCHAR(50) NOT NULL,
    user_id INT NOT NULL,
    board_id INT NOT NULL,
    card_id INT NOT NULL
);
`);
};
export const down: Migration = async (params) => {
  params.context.query(`DROP TABLE tasks;`);
};
