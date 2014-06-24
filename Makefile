start:
	@python -m SimpleHTTPServer > server.log 2>&1 & echo "$$!" > server.pid 
	@echo "Server started on localhost:8000"
	@google-chrome http://localhost:8000 &
	@echo "Launching Google Chrome..."

stop:
	@kill -9 `cat server.pid`
	@echo "Server stopped"
