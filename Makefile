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
