-- +goose Up
-- +goose StatementBegin
create table users
(
    uuid          uuid NOT NULL primary key,
    name          text,
    role          int,
    pass          text
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE users;
-- +goose StatementEnd
