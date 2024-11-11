Comandos:

1 - Buildar: docker compose up -d --build
  - Frontend (cliente): http://localhost:5173
  - Frontend (dashboard): http://localhost:5173/dashboard
2 - Acessar MySQL dentro de container: docker exec -it mysql sh
3 - Realizar operações mysql: mysql -h localhost -P 3306 -u root -p 
4 - Acessar bd: use trabalho-db;
5 - Operações
  - SELECT, INSERT, DELETE, UPDATE

5 - Derrubar: docker compose down -v (-v serve para remover volume)