-- enable tablefunc extension if not already enabled
create extension if not exists tablefunc;


--[[ create tables ]]--
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    item_type VARCHAR(50) NOT NULL
);

CREATE TABLE item_properties (
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    property_name VARCHAR(50) NOT NULL,
    property_value TEXT NOT NULL,
    PRIMARY KEY (item_id, property_name)
);

CREATE TABLE collections (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
);

CREATE TABLE collection_items (
    collection_id INTEGER REFERENCES collections(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES items(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (collection_id, item_id)
);
