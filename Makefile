copy_nginx:
	cp /root/IdeaStoreFront/nginx.conf /etc/nginx/nginx.conf
build:
	npm run build
copy_build:
	cp -r /root/IdeaStoreFront/build/. /var/www/html/ &&mkdir -p /var/www/html/idea/static && mkdir -p /var/www/html/profile/static && mkdir -p /var/www/html/board/static && cp -r /root/IdeaStoreFront/build/static/. /var/www/html/idea/static && cp -r /root/IdeaStoreFront/build/static/. /var/www/html/profile/static && cp -r /root/IdeaStoreFront/build/static/. /var/www/html/board/static