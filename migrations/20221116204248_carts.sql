-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS carts (
                    "uuid" uuid not null primary key,
                    store_uuid uuid,
                    user_uuid  uuid
);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS carts;
-- +goose StatementEnd
