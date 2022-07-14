========== Update Package ==========
npm install

========== SET mysql cred in .env ==========


========== Update Models ==========
sequelize-auto -o "./models" -d hr -h localhost -u root -p 3306 -x  -e mysql -t login


========== Start Project ==========
node server

