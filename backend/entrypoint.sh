#!/bin/sh

# Cria as pastas necessárias se não existirem
mkdir -p /var/www/html/storage/logs \
         /var/www/html/storage/framework/cache \
         /var/www/html/storage/framework/sessions \
         /var/www/html/storage/framework/views \
         /var/www/html/storage/app/public \
         /var/www/html/bootstrap/cache

# Corrige permissões
chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Executa as migrations automaticamente (opcional, mas útil em dev)
php artisan migrate --force

# Inicia o Apache
exec apache2-foreground