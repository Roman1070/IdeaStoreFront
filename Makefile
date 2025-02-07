copy_nginx:
	cp /root/IdeaStoreFront/nginx.conf /etc/nginx/nginx.conf

update:
	npm run build && cp -r /root/IdeaStoreFront/build/. /var/www/html/ &&mkdir -p /var/www/html/idea/static && mkdir -p /var/www/html/profile/static && mkdir -p /var/www/html/board/static && cp -r /root/IdeaStoreFront/build/. /var/www/html/idea && cp -r /root/IdeaStoreFront/build/. /var/www/html/profile/ && cp -r /root/IdeaStoreFront/build/. /var/www/html/board && nginx -s reload