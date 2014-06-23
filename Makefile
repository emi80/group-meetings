presentation:
	@python -m SimpleHTTPServer > server.log 2>&1 && echo $$!>server.pid &
