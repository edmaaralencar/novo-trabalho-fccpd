Comandos:

1 - Buildar: docker compose up -d --build
  - Acessar frontend: http://localhost:5173
  - Acessar backend: http://localhost:4000/api/
2 - Acessar MySQL dentro de container: docker exec -it mysql sh
3 - Realizar operações mysql: mysql -h localhost -P 3306 -u root -p 
4 - Acessar bd: use trabalho-db;

5 - Parar: docker compose down -v (-v serve para remover volume)