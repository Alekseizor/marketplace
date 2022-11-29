-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS carts (
                    "uuid" varchar(255) not null primary key,
                    "product" varchar(255) not null
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS carts;
-- +goose StatementEnd
