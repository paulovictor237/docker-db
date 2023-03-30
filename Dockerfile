# Define a imagem base
FROM postgres:latest

# Define variáveis de ambiente para o PostgreSQL
ENV POSTGRES_USER postgres
ENV POSTGRES_PASSWORD mypassword
ENV POSTGRES_DB mydatabase

# Copia o script para criar o banco de dados para dentro do contêiner
# COPY create_database.sql /docker-entrypoint-initdb.d/

# Expõe a porta padrão do PostgreSQL (5432)
EXPOSE 5432
