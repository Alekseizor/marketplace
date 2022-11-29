-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS products (
                                     "uuid" varchar(255) not null primary key,
                                     "price" integer not null,
                                     "image" varchar(255) not null,
                                     "name" varchar(255) not null,
                                     "description" varchar(255) not null
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS products;
-- +goose StatementEnd
