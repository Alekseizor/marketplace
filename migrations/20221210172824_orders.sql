-- +goose Up
-- +goose StatementBegin

create table orders
(
    uuid      uuid NOT NULL primary key,
    products      text[],
    user_uuid uuid,
    date      timestamp,
    status    text
);

-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE orders;
-- +goose StatementEnd