---
title: 【Software tools】Mock Test整理
date: 2024-02-17 12:02:24
categories: 
     - Learn
     - linux
tags: 
     - linux
---
&emsp;&emsp;Software tools的Mock Test练习
<!-- more -->

# Test Questions collection

## Q1. Type the command (one word) that you would use on a Linux system to print the name of the current user to the terminal
A1. `whoami`

## Q2. Enter the command that you would use in the shell to make a copy of a file called ruby. The copied file should be called diamond.
A2. `cp ruby diamond`

**Another Q：Enter the command that you would use in the shell to delete a file called ruby.**
A：`rm ruby`

## Q3. The command sed (stream editor) reads from standard input, applies a transformation based on its arguments and prints the result on standard output.

One of its arguments is described in the manual page as follows:

y/source/dest/
    Transliterate the characters in the pattern space which appear in source
    to the corresponding character in dest.
The pattern space refers to the input.

For example, echo aabbccddee | sed y/bc/xb/ would print aaxxbbddee.

Based on this information, consider the following commands (lines starting with $ are commands, the rest is output):
```bash
$ cat colors.txt
Gules
Azure
Vert
Sable
Purpure
$ cat colors.txt | sed y/aeiou/eioua/ | tail -n 3
```
What will be printed on the **second line** of the output of the last command?

A3. Sebli

## Q4. Select the correct statement describing the normal location of certain files in a POSIX system.
Q4./bin contains executable programs. /home contains folders that can be written to by normal (non-root) users. /etc contains system-wide configuration files.

- /bin -> 包含可执行程序
- /usr -> 包含用户可用的大部分系统文件和程序
- /etc -> 包含通常(system-wide)的环境配置
- /home -> 包含能被普通用户写的文件
解释：
1. **/bin**：
   - 包含可执行程序，这些程序通常是系统启动和维护所需的基本工具。例如，命令行工具如ls、cp、mv等通常位于/bin目录中。
   - 这些可执行程序对于系统的正常运行至关重要，因此它们通常被放置在一个较小的文件系统中，以便在引导时能够立即访问。

2. **/usr**：
   - 包含用户可用的大部分系统文件和程序。这个目录包含了系统软件安装的大部分内容。
   - /usr目录中包含了各种子目录，比如/usr/bin、/usr/lib、/usr/include等。其中：
     - /usr/bin包含了许多用户可用的可执行程序。
     - /usr/lib包含了程序运行所需的共享库文件。
     - /usr/include包含了用于编译软件的头文件。
   - 通常，/usr目录中的内容可以被普通用户访问和使用，但有一些系统关键文件和目录可能会有限制。

3. **/etc**：
   - 包含系统范围的配置文件。这些配置文件用于设置系统的各种参数、服务和应用程序的行为。
   - /etc目录中包含了许多配置文件和子目录，用于配置不同的系统组件和应用程序。例如，/etc/passwd和/etc/group文件存储了用户和组的信息，/etc/network/interfaces文件用于配置网络接口等。
   - 这些配置文件通常只能由特权用户（如root）进行修改，以确保系统的稳定性和安全性。
4. **/home** 
   - 包含可供普通用户写入的文件夹：
   - /home目录是Linux系统中用户的主目录所在的位置。每个用户在/home目录下都有一个独立的子目录，其中包含了他们的个人文件和设置。这些用户目录通常只允许相应的用户和root用户对其进行写入操作。

5. **/usr vs /home**
   /usr 和 /home 都是 Linux 文件系统中的常见目录，但它们的用途和内容有所不同。

   ### **/usr**（Unix System Resources）：
   - **包含系统资源和用户应用程序**：/usr 目录通常包含系统资源和用户安装的应用程序。这些应用程序可以是系统自带的，也可以是用户自行安装的。
   - **可供所有用户访问**：与/home不同，/usr目录中的文件和应用程序通常是系统范围内共享的，因此可以被所有用户访问。
   - **例如**：/usr/bin 存储系统的可执行文件，/usr/lib 存储共享的库文件，/usr/share 存储共享的数据文件，/usr/local 存储用户自行安装的软件等。

   ### **/home**：
   - **包含用户的个人文件和设置**：/home 目录包含了每个用户的个人文件和设置。每个用户通常都有一个以其用户名命名的子目录，用于存储他们的文档、音乐、视频、配置文件等。
   - **只对相应用户可写**：/home 目录中的用户文件夹只能由相应用户或超级用户（root）访问和修改。
   - **通常用于用户个人数据**：/home 目录主要用于存储用户个人数据，例如文档、图片、下载内容等。

总之，/usr 包含系统范围内的共享资源和应用程序，可供所有用户访问；而 /home 包含用户的个人文件和设置，每个用户的文件夹只能由相应用户或超级用户访问和修改。

## Q5. Given a file that shows up as follows in ls -l:
-rw-rw-r--  1 Breda  staff  1024  Jan 1 10:01 logfile
Suppose that group users contains Alice, Breda and Carole; group tech contains Alice and Breda; and group staff contains Breda and Carole.

What are the access rights for the three users on this file?

A5.
**Alice: Can read, but not write or execute
Breda: Can read and write, but not execute
Carole: Can read and write, but not execute**

In all cases, "execute" refers to running the program as ./logfile.

解释：注意看文件的状态，文件属于staff组，而Alice在tech组，所以权限只有r。

## Q6. A colleague has written a shell script called star. When they directly address it as ./star or /home/bob/code/star, it works, but just typing star gives an error message. Mark the following as true or false:
A6.
- **FALSE** The colleague has forgotten to set the +x bit on the script.
- **FALSE** To run a shell script without the ./ prefix, the file has to have the extension .sh.
- **TRUE** The error message appears because the folder containing the script is not on the shell's PATH.

Expian: 
[a] 设置 +x 位（可执行权限）是使脚本直接可执行的必要条件。由于脚本可以通过 ./star 或 /home/bob/code/star 运行，这意味着脚本已经设置了可执行权限，因此同事没有忘记设置 +x 位。

[b] 脚本文件是否具有 .sh 扩展名并不影响在没有 ./ 前缀的情况下运行脚本的能力。只要脚本文件具有可执行权限，并且位于 PATH 环境变量中列出的目录中，就可以在不指定路径或 ./ 前缀的情况下执行它。

[c] 出现错误消息是因为包含脚本的文件夹不在 shell 的 PATH 中。当您输入一个命令而没有指定路径时，shell 会在 PATH 环境变量中列出的目录中查找该命令。如果脚本所在的目录未包含在 PATH 中，shell 就无法找到它。

## Q7. You are currently on branch develop and you would like to merge commits from branch fred into branch george. Complete the git commands to do this, assuming you have no uncommitted changes in your local files. You do not need to do any git status to check the state of anything for this question.
A7.
- git checkout george
- git merge fred

## Q8. The following script, with line numbers added, is an attempt to implement the "compiler helper exercise" to make a script called b that, when called with either ./b build example or ./b build example.c, should first compile the C program example.c to example and, if and only if this was successful, then run it.
```shell
 1 | #!/bin/sh
 2 | # Build helper script
 3 | if [ $# -lt 2 ]
 4 | then
 5 |     echo "Use: $0 [compile|build|run] PROGRAM"
 6 |     exit 2
 7 | fi
 8 | BASE="$(basename $2)"
 9 | SOURCE="${BASE}.c"
10 | case $1 in
11 |     compile)
12 |         gcc -Wall -std=c99 "$SOURCE" -o "$BASE"
13 |         ;;
14 |     run)
15 |         exec "./$BASE"
16 |         ;;
17 |     build)
18 |         $0 compile "$2" || $0 run "$2"
19 |         ;;
20 |     *)
21 |         echo "Unknown command '$1', valid ones are compile, build, run."
22 |         ;;
23 | esac
```

The first mistake is on line 8. 哪里错了呢？
The second mistake is on line 18. || 用错了 

## Q9. Enter the commands that you would run on a Debian Linux system as the root user to perform the following system administration tasks.
A9. 
- Install the package called redstone (assume that it exists): `apt install redstone`
- Fetch the latest version of the catalog file from the repository server, that shows what the latest version of each package is: `apt update`


## Q10. You call fork() and see a return value of 404. Which of the following is correct?
A10. Fork succeeded, you are in the parent process, and the pid of the child process is 404.

解释：当调用 `fork()` 函数成功时，它会创建一个新的子进程。在父进程中，`fork()` 函数会返回新创建的子进程的进程ID（PID）。如果 `fork()` 的返回值是 404，那么表示子进程的PID是404。因此，父进程会接收到子进程的PID作为`fork()`函数的返回值。