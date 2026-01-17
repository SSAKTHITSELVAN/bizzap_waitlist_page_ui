Perfect! I can see:

/var/www/bizzap-waitlist/ has your React app (with asset-manifest.json, static/ folder, etc.)
/var/www/bizzap-main/ has just static HTML files

So your nginx should point to /var/www/bizzap-waitlist/. Let's update it:
bashsudo nano /etc/nginx/sites-available/bizzap-main
Make sure it looks like this:
nginx# HTTP - Redirect to HTTPS
server {
    listen 80;
    server_name bizzap.app;
    return 301 https://$host$request_uri;
}

# HTTPS - Main server
server {
    listen 443 ssl http2;
    server_name bizzap.app;

    root /var/www/bizzap-waitlist;
    index index.html;

    # SSL Configuration - managed by Certbot
    ssl_certificate /etc/letsencrypt/live/bizzap.app/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/bizzap.app/privkey.pem;
    include /etc/letsencrypt/options-ssl-nginx.conf;
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

    # Main React app - handles all routes including /dashboard
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static files
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
Save and reload:
bashsudo nginx -t
sudo systemctl reload nginx
BUT WAIT! The React app in /var/www/bizzap-waitlist/ is from January 13 and probably doesn't have the updated code to handle the /dashboard route. You need to:

Update your React source code with the new App.js I provided
Rebuild the app
Copy to the server

Where is your React source code? Run this to find it:
bashfind /home -name "package.json" -type f 2>/dev/null | grep -v node_modules | head -10
find /root -name "package.json" -type f 2>/dev/null | grep -v node_modules | head -10
Or tell me where 