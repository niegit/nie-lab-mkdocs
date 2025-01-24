<!-- 
Concept: Take everything we've learned so far and combine it into a network: Reload firewall configuration, reload switch config, connect FW <> Switch, confirm DHCP passed through to switch, etc.

Disconnect the patch cable from the firewall LAN port that goes into the SW01. We will need to plug ourselves directly into it again, but this also prevents the switch from getting a random DHCP address from the firewall until we've had a chance to restore the SW01 config.

Restore Firewall from baseline - Log into defaults (if defaults aren't configured then refer to end of last lab to reset)
- Use CMD ipconfig to check if you received an IP in the defaults, otherwise adjust NIC or reset firewall 
- Use WSM, Connect to Device with defaults, launch policy manager.
Note: User accounts are not stored in the config file, therefore the admin/status accounts will be set to their defaults as well. Refer to the last lab for that info, but these are good accounts "to know" going forward
- File > Open > Configuration File (No to saving) > Navigate to Baseline config and open
- Save the restored config to the Firewall (File > Save > To Firebox)
    - NO to adding feature key warning (No Internet)
    - use default Admin creds
    - cancel save location
    - Yes to feature key warning
    - Yes to limited functionality
    No to saving changes
- IPConfig /renew to get new lease
- ipconfig to check IP received from LAN port
- Disconnect from WSM (changed IPs)


Restore Switch - Log into switch and reload baseline
- Move your PC's cable from the firewall to GE12 on SW01 (leave firewall LAN unplugged for now, otherwise switch would get DHCP)
- Set NIC for default cisco and login, create temp account to login
- Restore SW01 config from baseline
Don't wait, you lost connectivity due to the IP changes.

Connect Devices
- Plug switch GE01 into firewall LAN
- Update your NIC to DHCP
- Run ipconfig /renew to confirm you have DHCP Ip address handed to you through switch and default gateway now points to firewall
- ping switch IP

- Plug PC01 into switch GE13 and Power On
- Confirm received IP in DHCP, otherwise adjust NIC
- Ping between devices (may not be able to ping your device as Win Firewall may stop it, but can ping from your device out)

Adjust VLANs
- Sign into switch and save the config you previously restored
- Adjust GE12 for Security VLAN (20)
- Ipconfig would show no Internet now; bounce the port by doing an Admin shutdown on interface (Port Management > Port Settings select GE13 and edit)
- Administrative status down and apply (this disables the port, can visually check and see no lights)
    - "UP" and apply - now we have an IP in the security VLAN that the firewall handed to us via DHCP
- Ipconfig PC01 to check IP
- Ping from your PC to PC01 and confirm it doens't work like last lab. 

Check Firewall Traffic
- Launch system manager
- switch to traffic manager
- In the search box, enter the IP address of PC01 (should be on .20 network). This filters traffic to or from that particular IP
- Ping from your PC to PC01 again and you should see Deny attempts
- We can verify that ICMP traffic from our PC to PC01 is getting denied from the LAN network to the SECURITY network

Now let's fix it
From Policy manager, make new policy to allow traffic between these VLANs
- packet filter > ping
- ALLOW-PING-FROM-LAN-TO-SECURITY
- From LAN
- TO SECURITY
- Enable Logging x2
- Move Policy above Ping so that it takes precendence, otherwise the ping rule would continue to block us.

Try Again
- Open system manager and filter traffic toPC01 again if you clsoed it. Make sure the traffic isn't "paused" at t he bottom
- Ping PC01 again, this time you should see ALLOWED traffic, and it should specify the policy allowing it (ALLOW-PING-FROM-LAN-TO-SECURITY)

Scope in the Policy
Currently we're allowing the entire LAN to the SECURITY network. Some VLANs that may make sense, but in this case, let's pretend that we only want to allow one specific computer on the LAN to the SECURITY network. 

- Open Policy Manager

Setup a DHCP reservation for your PC on the LAN network.
- Network Configuration > VLAN > open LAN
- Add a Reserved Address to ensure the IP doesn't change in the future
 - Name it your PC hostname (run hostname cmd)
 - IP Address for something within the network - let's do 192.168.10.100
 - MAC is the Ethernet adapter MAC address. (ipconfig /all and look for the physical address for the correct Ethernet Adapter you're using)

- Setup > Aliases > Add
- Set a friendly name for your computer, typically hostname or what you just used above
- Add member > choose Host IPv4 for a single IP > add the "reserved IP" 192.168.10.100
- Ok all the way through

Now we have an alias with a friendly name that we can use in our policies, and it will always refer to the specific IP address.
- Open the Ping policy we created
- Remove LAN from the FROM and add your new alias instead
- Update the name to reflect changes (ALLOW-PING-FROM-PC-TO-SECURITY)
- Save policy and save config to firewall

Test Again...again
- run an ipconfig /renew to get your new DHCP address
- ipconfig to confirm IP
- No surprise, we should still be able to ping PC01!
- To test our changes, give your computer a new IP in the LAN network that's different than what you configured for the alias. This time set your gateway address as well so that it sends the traffic to the firewall for routing. 


 -->