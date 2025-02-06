copy_nginx:
	cp /root/IdeaStoreFront/nginx.conf /etc/nginx/nginx.conf
build:
	npm run build
copy_build:
	cp -r /root/IdeaStoreFront/build/. /var/www/html/