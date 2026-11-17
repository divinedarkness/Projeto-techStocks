 docker run -d --name tech-stock -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_DATABASE=my-data-base -p 3306:3306 mysql:8

 docker ps

  docker exec -it <id do container> mysql -u root -p


  CREATE TABLE equipamentos (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    categoria VARCHAR(100) NOT NULL,
    numeroDeSerie VARCHAR(100) NOT NULL UNIQUE,
    status VARCHAR(50) NOT NULL,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


INSERT INTO equipamentos (
    id,
    name,
    categoria,
    numeroDeSerie,
    status,
    createdAt
) VALUES (
    UUID(),
    'Notebook Dell Inspiron',
    'Informática',
    'DELL-2026-001',
    'Ativo',
    NOW()
);


SELECT * FROM equipamentos;



