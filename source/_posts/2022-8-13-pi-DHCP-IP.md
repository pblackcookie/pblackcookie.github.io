---
title: 有线——树莓派设置静态IP
date: 2022-08-13 17:40:21
categories: 
	- Learn
	- Raspberry Pi
tags: 
	- Raspberry Pi
---

&emsp;&emsp;记录~~笨蛋~~笔者设置树莓派静态IP的过程。

<!-- more -->

### 起因

&emsp;&emsp;为了防止路由器分配给树莓派的地址总是变来变去，笔者在网上搜索了*如何设置树莓派的静态IP地址。*

&emsp;&emsp;然而，不论笔者如何设置树莓派的IP静态地址，再次打开时地址还是会变化。

### 原因

&emsp;&emsp;笔者终于发现了，大多数教程中设置`eth0`是设置**有线网络**的静态IP地址，而笔者之前一直用WIFI连接树莓派！

&emsp;&emsp;再强调一遍，此教程是教**有线网络**的树莓派静态IP地址设置。

&emsp;&emsp;~~我还真是个笨蛋呐。~~

### 设置过程

&emsp;&emsp;1.若要修改静态IP地址，修改 /etc/dhcp.conf 中的配置文件。（DHCP配置文件）

&emsp;&emsp;`sudo vim /etc/dhcpcd.conf`

&emsp;&emsp;2.在打开的文件中，找到下图所示片段，并更改。

![](https://raw.githubusercontent.com/pblackcookie/ImageHosting/main/test-pic/202208131928432.png)

&emsp;&emsp;

&emsp;&emsp;按下`i`键，进入编辑模式。  
&emsp;&emsp;第一行就写 `interface eth0`即可。  
&emsp;&emsp;第二行就在`static ip_address`后写出来自己想要设置的静态IP地址即可，笔者这里设置了`192.168.0.111/24`。基本就改`111`那个部分，前三个部分树莓派连接的路由器怎么写的这里就怎么写。  
&emsp;&emsp;第三行写树莓派连接上的路由器地址，可以通过`ifconfig`指令查看。路由器地址可以通过看路由器上贴的纸来实现。  
&emsp;&emsp;第四行写的是域名服务器地址，一般写`114.114.114.114 8.8.8.8`即可。  

&emsp;&emsp;按下`esc`键后，按下`:wq`这三个键，保存并退出此文件。

&emsp;&emsp;输入`sudo reboot`来重启树莓派。
### 结果

&emsp;&emsp;重启之后，打开树莓派`Linux`终端，输入`hostname -I`，发现此时IP地址已经设置成功~

![](https://raw.githubusercontent.com/pblackcookie/ImageHosting/main/test-pic/202208131912204.png)

&emsp;&emsp;笔者一直用的远程连接来连接树莓派，所以能连接上其实已经证明静态IP设置成功了。  

![](https://raw.githubusercontent.com/pblackcookie/ImageHosting/main/test-pic/202208131946223.png)

![](https://raw.githubusercontent.com/pblackcookie/ImageHosting/main/test-pic/202208131946879.png)
### 参考文章

树莓派设置静态IP地址：https://www.cnblogs.com/duzetao/p/13770013.html