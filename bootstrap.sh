echo "Running Provision"

cd /vagrant

sudo apt-get update
sudo apt-get install -y python-software-properties
sudo add-apt-repository -y ppa:chris-lea/node.js
sudo apt-get update
sudo apt-get install -y nodejs git mongodb

sudo npm install -g bower
bower install --allow-root
