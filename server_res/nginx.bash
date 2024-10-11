# Update package list:
sudo apt update
# Install Nginx:
sudo apt install nginx
# Enable and start Nginx:
sudo systemctl enable nginx
sudo systemctl start nginx
# Check Nginx status:
sudo systemctl status nginx
# Allow Nginx through the firewall (if necessary):
sudo ufw allow 'Nginx Full'
