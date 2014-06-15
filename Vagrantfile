# -*- mode: ruby -*-
# vi: set ft=ruby :

VAGRANTFILE_API_VERSION = "2"

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  config.vm.box = "hashicorp/precise32"
  config.vm.provision "shell", path: "bootstrap.sh"
  config.vm.network "forwarded_port", guest: 8000, host: 8000
  config.vm.network "public_network"

end
