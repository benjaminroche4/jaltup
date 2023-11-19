#Composer setup
composer setup:
	@php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
	@php -r "if (hash_file('sha384', 'composer-setup.php') === 'e21205b207c3ff031906575712edab6f13eb0b361f2085f1f1237b7126d785e826a450292b6cfd1d64d92e6563bbde02') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
	@php composer-setup.php
	@php -r "unlink('composer-setup.php');"
	@echo "Composer installed"

#Composer commands
composer:
	@php composer.phar $(filter-out $@,$(MAKECMDGOALS))

#Symfony commands : Start server
start:
	@echo "Starting Symfony server..."
	@symfony server:start

#Symfony commands : Stop server
stop:
	@echo "Stopping Symfony server..."
	@symfony server:stop

#Clear cache
clear:
	@php bin/console cache:clear

creata-database:
	@php bin/console doctrine:database:create