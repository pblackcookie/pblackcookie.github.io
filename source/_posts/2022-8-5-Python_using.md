---
title: 使用Python完成一个文件迁移项目小程序
date: 2022-08-03 16:41:04
categories: 
	- Work
	- Python
tags: 
	- Python
---

&emsp;&emsp;最近被要求了处理文件的大量迁移，于是笔者开始凭借自己的三角猫功夫，使用Python来完成此功能。此文章通过复盘项目的提出至完成，旨在记录笔者自身在完成项目要求过程中遇到的一些挫折，与对Python程序语言的一些感悟。

<!-- more -->
## 环境变量的配置

&emsp;&emsp;不论使用何种语言，首先配置好适合语言的环境是重中之重。

&emsp;&emsp;只有配置好此路径之后，一些在CMD（命令行）里的命令才能正常使用。笔者在使用Python的过程中屡屡受挫，很大一部分原因就是并没有将此环境变量配置好。最后笔者干脆卸载重装了一遍Python才搞定此环境变量的配置。

### 检查环境变量的Python配置
&emsp;&emsp;首先检查自己Python环境变量到底配置好了没。

&emsp;&emsp;按下 `windows + R`，调出运行界面，输入`cmd` ,点击确定，打开命令行窗口。

&emsp;&emsp;在弹出的黑色窗口里输入`python` 并且回车，假如成功地打开了Python界面，则证明环境配置已经成功，可通过键入`exit()`或直接关闭此黑色窗口来退出Python程序，并跳转至条目2。

&emsp;&emsp;假如此时命令行窗口显示`python 不是内部或外部命令，也不是可运行的程序或批处理文件`，则证明环境还未配置，请先配置环境变量。

### 配置环境变量

&emsp;&emsp;找到已安装好的python所在目录，并复制该路径。（Python安装文件夹一般叫Python3.X.X）

&emsp;&emsp;找到电脑左下角的搜索按钮，点击并输入`编辑系统环境变量`，打开此进程，并在弹出页面中点击`环境变量（N）...`

&emsp;&emsp;注意，此时弹出窗口有两个变量，上半部分是`用户变量`，下半部分才是我们要编辑的变量，即`系统变量`。

&emsp;&emsp;找到一个名叫`Path`的变量，点击编辑。添加Python的文件夹路径进去。此处一般可以添加两条路径，一个是Python的exe程序所在的文件夹，另一个是此文件夹里的Script文件夹路路径。以笔者的电脑为例，此两条路径分别为`D:\python10` 和 `D:\python10\Scripts`。

&emsp;&emsp;一路点击**确定**后再退出，确保自己确实更改好了此环境变量。笔者点击了三次`确定`按钮，请核对有无少点击`确定`按钮的情况。

&emsp;&emsp;返回至1.1节，使用此方法检查自己的Python环境变量到底配置好没有。


## 要求功能的实现与改进

&emsp;&emsp;项目要求我做一个能批量迁移文件的小程序。  
&emsp;&emsp;什么？啥叫批量迁移文件？其实，翻译成人话就是：给文件改个人能看懂的名字，然后再将这个名称改成人能看懂名字的文件复制到所指定的目标文件夹。而原本的文件就存放在它所在的地方安安心心地当备份。

### 功能实现
&emsp;&emsp;从项目的要求中不难看出，此程序需要实现如下几个功能：读取Excel文件里的内容，并且根据此文件的内容找到需要复制的所有文件，将这些文件根据excel文件里的规则和格式改名，并将改名过后的所有文件复制到指定文件夹。

#### 读取Excel文件数据
&emsp;&emsp;说到读取Excel文件，就不得不提一些功能强大的Python模块了。笔者在此程序中用到的与读取Excel文件有关的模块有`xlrd(version 1.2.0)`，`pandas`，`openpyxl`。

&emsp;&emsp;笔者首先使用的是`xlrd`模块的最新版本，但是发现文件并未如期运行，经查找发现是版本太高不兼容问题，在降版本至1.2.0后，读取文件数据操作成功。  
&emsp;&emsp;这时一个配置好环境变量的优势就显现出来了，即可以直接在CMD（命令行窗口）里来安装这些所需的包。记住，此`xlrd`需要指定1.2.0版本。  

&emsp;&emsp;`pip install xlrd==1.2.0`  

&emsp;&emsp;安装好之后，即可在Python的.py文件里引用。比如：`import xlrd`

&emsp;&emsp;1.读取已知路径的Excel的文件内容
```	python
		# 引入要用的模块
		import xlrd 
		# 这条语句可以打开指定路径的Excel文件并读取
		aimdata = xlrd.open_workbook(r'your_excel_file_path\\excel_name.xlsx') 
		# 这条语句是在Python程序当前所在路径新创建一个可读的Excel文件，笔者之后改进读取文件的时候会用到
		# aimdata = xlrd.open_workbook('document.xlsx', "rb") 
```
&emsp;&emsp;2.读取指定行和列的内容，并将内容储存至列表中
```python
		# 获取Excel表格内第1张sheet表的内容
		table = data.sheets()[0]
		# 创建一个空表格，储存Excel中的数据  
		tables = []

		# 自定义一个函数，将Excel表格的内容导入到tables列表中
		def import_excel(excel):
			# 由于已知excel文件数据排列方式，故此时自己填写array列表的内容
			array = {'原本文件名': '', '目标文件名': '', '文件存放路径': '', '文件格式': ''}
			# 从excel表的第一行读取数据至nrow行
			for rown in range(excel.nrows):
				# 这是原文件名，读取第rown行第1个数据
				array[0] = table.cell_value(rown, 0)
				# 这是目标文件名，读取第rown行第2个数据
            	array[1] = table.cell_value(rown, 1)
            	# 这是目标复制存放路径，读取第rown行第3个数据
            	array[2] = table.cell_value(rown, 2)
            	# 这是文件类型，读取第rown行第4个数据
            	array[3] = table.cell_value(rown, 3)
            	# 将这一行读取的数据添加到tables中
				tables.append(array)
```
&emsp;&emsp;不难看出，新定义的import_excel(excel)函数首先会定义一个字典array（根据excel表头信息），随后通过for循环，一行一行的读取excel中的数据直至结束。这看起来没什么大问题，对吧？  
&emsp;&emsp;然而，存贮数据的excel表格的第一行往往都是表头信息，我们当然不需要读取这一行的数据，所以对笔者来说，收到的第一个改进建议是————让这个遍历从第二行起开始。

&emsp;&emsp;3.运行程序
```python
		if __name__ == '__main__':
			import_excel(table)
			# 为了验证结果准确性，遍历tables中的数
			for i in tables:
				print(i)
```
&emsp;&emsp;如果你也想像笔者一样试一试，那么就复制黏贴这些内容至Python的.py文件夹里面吧！不过，记得修改好xslx文件的路径哦~

#### 文件复制到指定文件夹
&emsp;&emsp;首先，要获取到指定了哪个文件夹。  
&emsp;&emsp;使用`os.path`模块中的`os.path.expanduser(default_dir)`功能。它可以帮助我们获取文件夹的路径  
&emsp;&emsp;在后续的可视化窗口交互操作中，笔者用`tkinter`模块中的`tkinter.filedialog.askdirectory()`来使用户通过自己选择界面获取指定目标文件夹，完整语句如下所示：  
```python
		import os
		import tkinter as tk
		aimfolder = tk.filedialog.askdirectory(title=u'选择文件夹',initialdir=(os.path.expanduser(default_dir)))
```

&emsp;&emsp;想要复制文件至指定文件夹，这时`shutil`模块中的`copyfile`就派上用场。它将源的内容复制到名为目标的文件。不过，目标必须可写才行。  
&emsp;&emsp;逗号之前为原文件路径，逗号之后为指定目标文件的路径。具体用法如下所示：  
&emsp;&emsp;`copyfile(ori_path , cpy_path)`

&emsp;&emsp;笔者代码段如下所示：

```python
		# 引入copyfile功能
		from shutil import copyfile
		# 复制路径为已获取到的目标文件夹 + 目标文件名
		cpy_path = aimfolder + '\\' + array[1]
		# 虽然叫file_name, 但是array[2]是目标复制存放路径，别搞混了哦（对不起
		file_name = array[2]
		# 源的路径，必须具体到某个文件
		ori_path = file_name + '\\' + array[0]
		# 复制文件至目标文件夹
		copyfile(ori_path , cpy_path)
```

#### 文件改名
&emsp;&emsp;使用`os`模块中的`rename`功能来对文件进行改名。

&emsp;&emsp;此函数使用起来很简单。逗号前面是需要重命名的文件的文件路径，逗号后面是改名之后的指定路径下的文件名字和文件格式，如下所示：  
&emsp;&emsp;`os.rename(ori_file_name , final_file_name)`  
&emsp;&emsp;因为笔者已在复制文件时写入文件的名称，此时仅仅缺少文件的正确格式，所以笔者这里的程序改名是将文件附上正确的格式，以便文件的正常访问和使用。  
&emsp;&emsp;下段代码为笔者的改名程序：
```python
		#array[3], 文件格式
		file_format = array[3]
		os.rename(cpy_path , cpy_path + '.' + file_format)
```

#### 阶段完成任务
&emsp;&emsp;将所有功能整合到一个.py文件中，代码就如下图所示。

```python
		import os
		import xlrd
		import tkinter as tk
		from shutil import copyfile

		# 获取Excel文件并且读取数据
		f_path = filedialog.askopenfilename()
		# 已知execl表格存贮路径，从路径打开execl表格获取数据
		aimdata = xlrd.open_workbook(f_path, "rb")
		print("\n\t所选择需读取表格的文件路径为：",f_path)
		# 打开需要读取的xlsx表格
		table = aimdata.sheets()[0]

		# 获取目标文件夹路径
		cpy_path = filedialog.askdirectory()
		print("\n\t所选择的目标文件夹路径为：", cpy_path)
		
		# 读取Excel表格数据
		def import_excel(excel):
		aimname = cpy_path
		# 创建一个空列表，存储excel的数据
		tables = []
		for rown in range(excel.nrows):
			array = {'原本文件名':'','目标文件名':'','文件存放路径':'','文件格式':''}
			array[0]=table.cell_value(rown,0)
			array[1]=table.cell_value(rown,1)
			array[2] = table.cell_value(rown, 2)
			array[3] = table.cell_value(rown, 3)
			# 复制一份文件至指定文件夹
			# 若要修改指定复制的目标文件夹，更改aimname路径
			cpy_path = aimname + '\\' + array[1]
			filename=array[2]
			ori_path = filename + '\\' + array[0]
			copyfile(ori_path,cpy_path)
			# 修改文件名称
			os.rename(cpy_path,cpy_path + "." + array[3])
		# 打印tables中数据，查看数据读取正确与否
		print('\n\t修改所有数据一览\n')
		for i in tables:
			print(i)
		print('\n\t修改完成')


```

&emsp;&emsp;至此，此项目所要求的将改名后文件复制至指定文件夹的操作全部成功完成。不过，如果想程序至此就大功告成，那就太天真了。有的人它电脑上根本就没有Python，更别说这个程序还需要配置相应的Python环境是不？加之脆弱的Excel文件读取功能————读取第一行毫无用处的表头；一有为了美观所空出的Excel空列，就原地打转般读取不了文件路径。

&emsp;&emsp;总之，现在仅仅是实现了功能，后续对它的优化改进，也占据此项目的大部分时间。
### 功能改进

#### 对Excel文件的读取

##### 从Excel文件读取行数的改进
&emsp;&emsp;**从表格第二行读起**

&emsp;&emsp;这个简单，只要将读表时的for循环改动一下即可。range为一个前闭后开区间，所以从第二行读起就是0，1，2，3，……中的1。  

```python
		for rown in range(excel.nrows):
		# 在def里找到这句for循环，将上述语句改为下述语句
		for rown in range(1,excel.nrows):
```

&emsp;&emsp;笔者记得此时会报错。恰好笔者也想将range之后的数据改为另一个已知行数，故有了接下来的改进`excel.nrows`的措施。

&emsp;&emsp;**只读取有数据的行数**

&emsp;&emsp;为了读取行数，在python程序的最上方引入了`pandas`模块。由于range为一个前闭后开区间，而`pandas`模块中的`read_excel`又从第二行开始读起，所以在获取到的行数数据后加1，可以读取第二行起至有数据的最后一行。

&emsp;&emsp;笔者代码如下所示：
```python
		import pandas as pd
		line_data = pd.read_excel(r'your_excel_file_path')
		end_line = len(line_data) + 1
		for rown in range(1, end_line):
```

##### 支持Excel文件里出现空白列
&emsp;&emsp;实现逻辑为：在程序所在的当前目录新创建一个无空白列,内容与选取Excel文件相同的的.xlsx文件，读取此文件内容，并且在读取完成之后删除此文件。这是在读取Excel文件时，为了防止一有空白列，导致代码报错，而优化的功能。

&emsp;&emsp;笔者的代码如下所示：
```python
		import pandas
		df = pd.read_excel(r'your_choose_excel_file_path', index_col=0)
		final_df = df[df.columns.drop(list(df.filter(regex='Unnamed')))]
		# 在创造出的新document文件中进行数据更改，不破坏原本文档的数据格式
		# 此文件会和.py文件处在同一个目录下
		final_df.to_excel('document.xlsx')
		aimdata = xlrd.open_workbook('document.xlsx', "rb")
		table = aimdata.sheets()[0]
		# 此处为for循环按行读取Excel文件代码，略。对for循环的优化改进见上一小节。
		# ……
		# 读取数据完成后，删除此文件
		os.remove('document.xlsx')
```

#### 制作GUI可视化窗口
&emsp;&emsp;使用简单易上手的`tkinter`模块。具有python自带等优点。笔者想通过制作可视化窗口，最终将其打包为.exe文件的方式，让此程序在无Python环境的，别的主机上也能正常运行。可视化窗口最大的好处是交互性较强，这让对程序一窍不通的人也能通过点击按钮→得到反馈的方式完成自己想要的操作，于是，笔者艰难的GUI可视化窗口探索历程至此展开。

##### 简易实现窗口制作
&emsp;&emsp;想要实现一个可视化窗口，不说功能，仅仅说“实现”，还是蛮简单的。  
&emsp;&emsp;笔者最初所写代码如下：  
```python
		import tkinter as tk
		from tkinter import filedialog
		def promptWin1():
			root=tk.Tk()
			root.withdraw()
			# 获得将要读取数据的execl表格的路径
			f_path = filedialog.askopenfilename()
			print('\n读取的execl表格文件地址为:',f_path)
			return f_path
		def promptWin2():
			root = tk. Tk()
   			root.withdraw()
    		#获得一个文件夹路径，用于存放指定的复制文件
			cpy_path =filedialog.askdirectory()
			print('\n制定复制文件夹位置为：',cpy_path)
			return cpy_path

		window = tk.Tk()
		#设置窗口标题
		window.title('批量更改文件名称系统')

		window.geometry("800x600+200+200")
		label = tk.Label(window,text='欢迎来到此系统，请根据需求选择操作',bg = 'black', fg = 'white', font =('Consolas', 24), width=500, height=3)
		button1 = tk.Button(window, text = '选择execl表格读取数据', height=3,width=25,bg="black",fg="white",font =('Consolas', 12),command = promptWin1)
		button2 = tk.Button(window, text = '选择要将文件复制到的目标路径', height=3,width=25,bg="black",fg="white",font =('Consolas', 12),command = promptWin2)

		label.pack(side='top')
		button1.pack(expand='yes')
		button2.pack(expand='yes')
		# 使此窗口一直存在于桌面
		window.mainloop()
```

&emsp;&emsp;此模块应用良好，一个小巧的窗口在运行程序的过程中弹至界面，给予笔者极大成就感。而且，通过编写的def函数，你不难看出笔者想干嘛————第一个按钮获取到了xlsx文件夹的位置，第二个按钮获取到了指定复制文件夹的位置。那么第三个按钮，理应是读取excel表格，并完成所有功能的按钮。笔者想将这担了大任的第三个按钮也加入这个界面。  

&emsp;&emsp;只能说理想很丰满，现实很骨感。这第三个按钮点击下去，此窗口是毫无反应。笔者就在这时开始被一个顺序问题所困扰。

##### 顺序问题简单描述
&emsp;&emsp;笔者加入读取excel文件数据的第三个按钮后，程序开始运行不通了。原因是读取excel文件，本质是需要获取excel文件的数据，来存放到tables（一个列表）中（按钮1所实现的功能），然后再把改名后的文件复制到指定目标文件夹cpy_path（按钮2获取目标文件夹路径）中。

&emsp;&emsp;于是我们可以看出，tables和cpy_path这两个数据对按钮3来说是不可或缺的，只有得到它们，文件的改名复制才能成功地进行下去。笔者发现，问题的根源其实实在tkinter模块的button的command命令使用中。

&emsp;&emsp;以下图这段代码为例，如若要使button函数实现按下按钮才执行的command命令，则函数后面不能加括号。即`command = promptWin1`是正确的，而`command = promptWin1()`会导致此函数在运行程序的一瞬间就被加载，弹出不必要的窗口。

`button1 = tk.Button(window, text = '选择execl表格读取数据', height=3,width=25,bg="black",fg="white",font =('Consolas', 12),command = promptWin1)`

&emsp;&emsp;聪明的你有没有发现问题的根源？没错，command函数要求后边不能跟东西，没有函数的返回值（笔者亲测有了也没用），但笔者的读取excel文件所定义的函数`import_excel(excel)`，必须要在括号里面填写可执行对象。于是就跟圆物体的嵌入方形的框架一样，它合不来呀。

&emsp;&emsp;没有返回值，那么按钮1和按钮2的值，按钮3就完全获取不到。甚至按钮3本身也执行不了它自己的函数，这下可怎么办呢？


##### 艰难解决

&emsp;&emsp;最初，笔者想，既然是被局限在按钮1和2里的局部变量导致问题无法解决，那么将这两个值直接设置成全局变量，随后在按钮3的功能里调用不就好了？  
&emsp;&emsp;一不做二不休，笔者立马把`table` 变成`global table`;把`cpy_path`变成`global cpy_path`。这下按钮3的函数确实能读取到这俩变量了。但是因为它们的global属性，还是导致了会在程序运行的瞬间就弹出两个不明所以的对话框（一个是选择文件，一个是选择文件夹）。

&emsp;&emsp;函数不行，全局变量更不行，那到底要怎么办才能把顺序变成笔者想要的那样，点击按钮才执行呢？这时一个想法出现在笔者脑海————**类**！  
&emsp;&emsp;将tkinter下的所有函数都打包到一个类里，这既可以保证窗口顺序没有被打乱，又可以保证这两项变量在类里被所有函数获取，而且也不必非要创造一个名字叫import_excel且有返回值的函数，可谓是一石多鸟。  
&emsp;&emsp;笔者将函数打包在类里的代码如下：
```python
		# 实现复制文件，读取execl表格文件所用的库
		import os
		import xlrd
		import pandas as pd
		from shutil import copyfile
		# 实现窗口可视化所引用的库
		import tkinter as tk
		from tkinter import filedialog
		from tkinter import messagebox

		class Appliation(tk.Frame):
			def __init__(self, master=None):
				super().__init__(master)
				self.master = master
				self.filepath = tk.StringVar()
				self.pack()
				self.main_config() # 对界面的一些基本配置
				self.create_widgets()
				self.create_widgets1()
				self.create_widgets2()
			# 窗口的一些基本设置
			def main_config(self):
				#设置窗口大小不可变
				root.resizable(0,0)
				#设置主标题
				self.getFile_bt = tk.Label(self)
				self.getFile_bt['width'] = 50
				self.getFile_bt['height'] = 3
				self.getFile_bt['font'] = ('Consolas', 18)
				self.getFile_bt['fg'] = 'black'
				self.getFile_bt['text'] = "欢迎来到批量更改文件名称系统，请根据需求选择操作"
				self.getFile_bt.pack(side="top")

			# 按钮1所实现的功能
			def create_widgets(self):
				#获取文件
				self.getFile_bt = tk.Button(self)
				self.getFile_bt['width'] = 40
				self.getFile_bt['height'] = 3
				self.getFile_bt['font'] = ('Consolas', 18)
				self.getFile_bt['background'] = 'black'
				self.getFile_bt['fg'] = 'white'
				self.getFile_bt['text'] = "请点击此处选择读取数据的excel文件"
				self.getFile_bt['command'] = self._getFile
				elf.getFile_bt.pack(side="top")

				# 显示文件路径
				self.filePath_en = tk.Entry(self, width = 30)
				self.filePath_en.pack(side="top")

				self.filePath_en.delete(0, "end")
				self.filePath_en.insert(0, "请选择文件")
			# 打开文件并且显示路径
			def _getFile(self):
				default_dir = r"文件路径"
				self.filePath = tk.filedialog.askopenfilename(title=u'选择文件',initialdir=(os.path.expanduser(default_dir)))
				print(self.filePath)
				self.filePath_en.delete(0,"end")
				self.filePath_en.insert(0,self.filePath)

			# 按钮2所实现的功能
			def create_widgets1(self):
				self.getFile_bt = tk.Button(self)
				self.getFile_bt['width'] = 40
				self.getFile_bt['height'] = 3
				self.getFile_bt['font'] = ('Consolas', 18)
				self.getFile_bt['background'] = 'black'
				self.getFile_bt['fg'] = 'white'
				self.getFile_bt['text'] = '选择要将改名后文件挂载到的目标文件夹'
				self.getFile_bt['command'] = self._getFloder
				self.getFile_bt.pack(side="top")

				# 显示文件夹路径
				self.filePath_en1 = tk.Entry(self, width=30)
				self.filePath_en1.pack(side="top")

				self.filePath_en1.delete(0, "end")
				self.filePath_en1.insert(0, "请选择文件夹")
			# 打开文件夹并且显示路径
			def _getFloder(self):
				default_dir =r"文件夹路径"
				self.filePath = tk.filedialog.askdirectory(title=u'选择文件夹',initialdir=(os.path.expanduser(default_dir)))
				print(self.filePath)
				self.filePath_en1.delete(0,"end")
				self.filePath_en1.insert(0,self.filePath)

			def create_widgets2(self):
				self.getFile_bt = tk.Button(self)
				self.getFile_bt['width'] = 40
				self.getFile_bt['height'] = 3
				self.getFile_bt['font'] = ('Consolas', 18)
				self.getFile_bt['background'] = 'black'
				self.getFile_bt['fg'] = 'white'
				self.getFile_bt['text'] = '点击此处开始批量挂载文件'
				self.getFile_bt['command'] = self._transfer
				self.getFile_bt.pack(expand="yes")

				# 显示转化挂载提示
				self.filePath_en2 = tk.Entry(self, width=30)
				self.filePath_en2.pack(side="top")

				self.filePath_en2.delete(0, "end")
				self.filePath_en2.insert(0, "点击上述按钮开始转换文件名称与挂载")
			#转化与挂载文件
			def _transfer(self):
				# 获取目标文件数据
				# 使用dataframe删除excel文件中空白行
				df = pd.read_excel(self.filePath_en.get(), index_col=0)
				final_df = df[df.columns.drop(list(df.filter(regex='Unnamed')))]
				# final_df.to_excel(self.filePath_en.get())
				# 在创造出的新document文件中进行数据更改，不破坏原本文档的数据格式
				final_df.to_excel('document.xlsx')
				# aimdata = xlrd.open_workbook(self.filePath_en.get(), "rb")
				aimdata = xlrd.open_workbook('document.xlsx', "rb")
				table = aimdata.sheets()[0]
				# print(type(table))
				aimfolder = self.filePath_en1.get()

				### 创建一个字典贮存execl表里面的文字
				# 原本的def import_execl(execl):函数，不需要了
				# 在循环之前创建一个空列表，存储execl的数据
				tables = []
				#获取execl表格的文件行数
				line_data = pd.read_excel(self.filePath_en.get())
				end_line = len(line_data) + 1
				# define array and the data is from the start row in the execl sheet
				# default desire get data form is as the list below
				# array = {'原本文件名': '', '目标文件名': '', '文件存放路径': '', '文件格式': ''}
				# get all data as a list in the row[0]
				# if there is a NaN column, then delete this column
				array = table.row_values(0)
				for rown in range(1, end_line):
					array[0] = table.cell_value(rown, 0) # initial file name
					# print('原文件名:',array[0])
					array[1] = table.cell_value(rown, 1) # final file name
					# print('目标文件名:',array[1])
					array[2] = table.cell_value(rown, 2) # file store directory
					# print('目标挂载路径：',array[2])
					array[3] = table.cell_value(rown, 3) # file format
					# print('文件类型：',array[3])
					# 复制一份文件至指定文件夹
					# 若要修改指定复制的目标文件夹，更改aimfolder路径
					cpy_path = aimfolder + '\\' + array[1]
					filename = array[2]
					ori_path = filename + '\\' + array[0]
					copyfile(ori_path, cpy_path)
					# 修改复制后文件的名称
					# tar_path 是目标路径，如需换路径，更改filename至指定路径即可
					# tar_path = filename + '\\' + array['原本文件名']
					# os.rename(ori_path, tar_path)
					os.rename(cpy_path, cpy_path + "." + array[3])
					# 打印操作数据一览
					# print("已将" + array[0] + "更改为：" + array[1] + "." + array[3])
					tables.append(array)
				os.remove('document.xlsx')
				self.filePath_en2.delete(0, "end")
				self.filePath_en2.insert(0, "操作成功,恭喜")

```

&emsp;&emsp;可喜可贺，可喜可贺，此令人头疼的问题至此才被解决掉。

##### GUI可视化窗口中的功能改进
&emsp;&emsp;读取文本框中内容，实现按下一次按钮，程序复制并改名文件。  
&emsp;&emsp;上文附上的代码中有这一段的改进。老实说，笔者这是在解决顺序问题的同时一并解决了获取数据问题，虽然看上去有点取巧耍小聪明，但是结果是好的不是嘛。  

&emsp;&emsp;解决思路：将获取到的路径输入至Entry框里，点击按钮3的时候，会读取按钮1和按钮2框下的数字，来找到读取数据文件的路径和文件复制的路径。  

&emsp;&emsp;部分代码如下（都在类里面）（其实在上一段代码里都能找到）：

```python
		def create_widgets(self):
			#显示文件路径
			self.filePath_en = tk.Entry(self, width = 30)
			self.filePath_en.pack(side="top")

			self.filePath_en.delete(0, "end")
			self.filePath_en.insert(0, "请选择文件")
		# 打开文件并且显示路径
		def _getFile(self):
			default_dir = r"文件路径"
			self.filePath = tk.filedialog.askopenfilename(title=u'选择文件',initialdir=(os.path.expanduser(default_dir)))
			print(self.filePath)
			self.filePath_en.delete(0,"end")
			self.filePath_en.insert(0,self.filePath)
		def create_widgets1(self):
			# 显示文件夹路径
			self.filePath_en1 = tk.Entry(self, width=30)
			self.filePath_en1.pack(side="top")

			self.filePath_en1.delete(0, "end")
			self.filePath_en1.insert(0, "请选择文件夹")
		# 打开文件夹并且显示路径
		def _getFloder(self):
			default_dir =r"文件夹路径"
			self.filePath = tk.filedialog.askdirectory(title=u'选择文件夹',initialdir=(os.path.expanduser(default_dir)))
			print(self.filePath)
			self.filePath_en1.delete(0,"end")
			self.filePath_en1.insert(0,self.filePath)

```

### 完整代码
&emsp;&emsp;其实艰难解决里那一段代码后面再加一小点儿就是完整的代码了。
```python
		root = tk.Tk()
		root.title("批量文件处理系统")
		root.geometry("640x480+600+300")

		app = Appliation(master=root)
		#关闭窗口提示框
		def on_close():
			if tk.messagebox.askokcancel("提示窗口", "您确定要退出吗？"):
				root.destroy()
		root.protocol('WM_DELETE_WINDOW', on_close)
		app.mainloop()

```

&emsp;&emsp;如果不想自己复制粘贴，也可这边请。  
&emsp;&emsp;完整代码的py文件见此github链接：https://github.com/pblackcookie/bulk-files-renamed-and-copy-to-typical-folder
## 将Python的example.py文件打包成软件

### pyinstaller打包方式

#### 打包文件教程
&emsp;&emsp;1. cmd 使用 pip 命令。  
&emsp;&emsp;`pip install pyinstaller`  

&emsp;&emsp;2. 使用cmd切换到需要打包的py文件所在的文件夹  
&emsp;&emsp;`cd 此处为文件夹路径`

&emsp;&emsp;3. 输入`pyinstaller -F -w pythonfilename.py`后，单击回车，等待cmd最后一行出现`xxxxxx successfully`字样，即为打包成功。

&emsp;&emsp;4. 在和python文件同样的文件夹里， 会有一个名叫`dist`的文件夹，里面即是打包好的.exe文件。


#### 生成的包文件链接

&emsp;&emsp;此项目笔者所生成包文件链接如下：  
&emsp;&emsp;https://github.com/pblackcookie/bulk-files-renamed-and-copy-to-typical-folder/releases/tag/python

#### example.exe文件的体积消减测试

&emsp;&emsp;首先说一个令人沮丧的结果，就是此测试以失败告终。  
&emsp;&emsp;网传的大多数所谓在Python虚拟环境中消减体积，只是他们的本地Python程序中自带了别的并无用到的模块，而笔者仅仅引入了所需模块，所以笔者最初生成的.exe文件大小即为最小版本。即便如此，一个只有9KB的文件集成成一个exe文件后，其体积也扩大到了31.1MB。令人唏嘘。  
&emsp;&emsp;如若并无额外模块，请不要相信网上的缩减体积说法。

## 参考文章

### 安装方面

pip指定版本安装:https://blog.csdn.net/zhaoleiedu/article/details/111472654  
提升pip安装速度过慢方法:https://blog.csdn.net/weixin_45941288/article/details/123204037  
pyinstaller教程:https://blog.csdn.net/xqe777/article/details/124308646

### 功能实现方面

使用xlrd模块读取Excel文件:https://m.php.cn/article/460337.html  
获取选取特定文件夹路径:https://vimsky.com/examples/usage/python-os-path-expanduser-method.html  
pandas模块详解:https://blog.csdn.net/qq_18351157/article/details/124865696  
可视化窗口简易教程:https://blog.csdn.net/tuzkizki/article/details/108810248  
窗口进阶版:https://blog.csdn.net/qq_21396469/article/details/118446580  
Entry输入教程:https://blog.csdn.net/weixin_43201327/article/details/109596556
