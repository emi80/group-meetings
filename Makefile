SHELL="/bin/bash"

start:
	@python -m SimpleHTTPServer > server.log 2>&1 & echo "$$!" > server.pid 
	@echo "Server started on localhost:8000"
	@google-chrome http://localhost:8000 & echo "$$!" > chrome.pid
	@echo "Launching Google Chrome..."

stop:
	@kill -9 `cat {server,chrome}.pid | tr '\n' ' '`
	@rm {server,chrome}.pid
	@echo "Server stopped"
