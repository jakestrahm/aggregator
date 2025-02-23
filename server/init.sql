CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR NOT NULL UNIQUE,
    email VARCHAR NOT NULL UNIQUE,
    password_hash VARCHAR NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now()
);

-- 1. foods
CREATE TABLE items (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    properties JSONB NOT NULL
);

-- 2. different diets e.g. cutting, bulking
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);

-- 3. what each diet actually consists of
CREATE TABLE group_items (
    group_id INTEGER REFERENCES groups(id),
    item_id INTEGER REFERENCES items(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (group_id, item_id)
);
