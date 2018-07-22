DB_PEM=$1

rm -rf .pgSecrets
mkdir .pgSecrets
echo "$DB_PEM" > .pgSecrets/postgresql.pem
