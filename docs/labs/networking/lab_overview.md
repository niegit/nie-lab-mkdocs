# Networking Lab Overview  

Welcome to our **Networking Labs**—a hands-on environment designed to help you sharpen your networking skills and explore NIE’s operations in a controlled, safe space. From configuring firewalls and switches to implementing VLANs for VoIP or troubleshooting network issues, this lab empowers you to experiment freely. Reset configurations and practice as much as you like!  

!!! tip "Test, Test, and Test Again!"  
    This is a **safe space to fail and learn**, so step outside your comfort zone and dive in! Here you can make changes without fear of bringing down the network or causing unexpected issues. Go ahead—break it and figure out how to fix it!

<br>

## Equipment in the Rack  

Our lab is housed in a compact, rolling 12U rack that can be easily moved to your desk or a dedicated **lab bench**. Here's what you'll find in the rack:  


- **PDU (Power Distribution Unit):** Powers all devices in the rack.  
- **WatchGuard T45:** Firewall appliance for network security and routing.  
- **Cisco SG350X-24P:** Managed switch ideal for more robust network configurations.  
- **Aruba Instant On 1930-24P:** Cloud managed switch perfect for SMB network setups.  
- **Aruba Instant On AP22:** Cloud managed wireless access point that enables Wi-Fi connectivity.  
- (Planned) **Raspberry Pi with Windows Server & ADDS:** A versatile server for labs involving Active Directory.  

![Network Rack Front View](img/rack-full-front.png)  

---

## How to Use the Lab  

Each lab will provide you with the specific instructions to complete that lab, but below is **general** information about getting setup.

1. **Position the Rack**  
    - Move the rack to your desk or the **lab bench** in the back room. _You may need to unlock the caster wheels on the front of the rack._
    - Ensure it’s stable and positioned conveniently, but out of the way of others.

    !!! tip "⛔ Do Not Disturb ⛔"  
        While the lab is not overly noisy, please be considerate of those around you. If you are sitting near someone, please ask if they mind if you power on the lab. Otherwise, feel free to move to a hoteling desk or the lab bench in the back!  

2. **Power It On**  
    - Plug the single **PDU power cable** into a wall outlet to provide power to the entire rack. _You may need to open the plastic cover and flip the red master switch on the PDU._

3. **Connect Your Laptop**  
    - Use the provided **blue Ethernet cables** to connect your laptop to the lab. Each specific lab will give you more information on how to get connected. If you need additional cables please let someone know.

    !!! danger "Connecting the Lab to Internet"  
        **Internet Access:** Most of our labs don't require Internet to function as we're mostly communicating on the Layer 2 network. If a specific lab calls for Internet, please be sure to connect the firewall WAN into the dedicated **Lab Network** port in the back room! **Please do NOT plug any part of the lab into the existing network.**  

4. **Save Your Work**  
    - Our labs will continuously build onto one another, so having a defined placed to store your configuration files will be important. We recommend saving them to your **OneDrive** or to a dedicated **USB drive**.  
    - By doing this, you'll be able to quickly restore your previous configurations and pick up exactly where you left off last time!

5. **Clean Up**  
    - Remove the **blue Ethernet cables** connecting your laptop or other endpoints.  
    - Leave the infrastructure connected _(e.g., switches, firewall, AP)_.  
    - Power off devices and neatly organize cables. Leave the rack ready for the next person!  

6. **Report Issues**  
    - If you encounter any problems, contact [it@networkiteasy.com](mailto:it@networkiteasy.com) for assistance.  

---

## Tips for Success

- **Experiment Freely**: Feel confident resetting and reconfiguring devices without consequence.  
- **Learn Actively**: Take advantage of our hands-on learning and comfortable configuring enterprise hardware. 
- **Seek Support**: Your manager and peers are here to assist you when needed. Just give us a shout!  

<br>

Good luck and happy networking! 😊
