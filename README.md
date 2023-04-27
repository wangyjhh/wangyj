# wangyj 个人常用命令库
```html

      ___           ___           ___           ___                     ___    
     /__/\         /  /\         /__/\         /  /\          ___      /  /\   
    _\_ \:\       /  /::\        \  \:\       /  /:/_        /__/|    /  /:/   
   /__/\ \:\     /  /:/\:\        \  \:\     /  /:/ /\      |  |:|   /__/::\   
  _\_ \:\ \:\   /  /:/~/::\   _____\__\:\   /  /:/_/::\     |  |:|   \__\/\:\  
 /__/\ \:\ \:\ /__/:/ /:/\:\ /__/::::::::\ /__/:/__\/\:\  __|__|:|      \  \:\ 
 \  \:\ \:\/:/ \  \:\/:/__\/ \  \:\~~\~~\/ \  \:\ /~~/:/ /__/::::\       \__\:\
  \  \:\ \::/   \  \::/       \  \:\  ~~~   \  \:\  /:/     ~\~~\:\      /  /:/
   \  \:\/:/     \  \:\        \  \:\        \  \:\/:/        \  \:\    /__/:/ 
    \  \::/       \  \:\        \  \:\        \  \::/          \__\/    \__\/  
     \__\/         \__\/         \__\/         \__\/                           

```

## 安装 Install
```bash
# npm
npm i wangyj -g

# pnpm
pnpm add wangyj -g
```
## 命令 Command
| 命令名称 | 作用      |
| -------- | --------- |
| jhy      | npm源操作 |


## 用法 Usage
```html
Usage: jhy [options] [command]

npm镜像源操作命令

Options:
  -V,--version    输出版本号
  -h, --help      display help for command

Commands:
  now             查看当前镜像源
  ls              查看镜像源列表
  use             切换镜像源
  add             添加自定义镜像源
  edit            编辑自定义镜像源
  remove          删除自定义镜像源
  ping            测试镜像地址速度
  help [command]  display help for command
```
## 声明 Note
本库的npm镜像源切换命令的实现参考b站小满的[mmp](https://github.com/message163/mmp)库，
更多内容请登录 bilibili 关注[小满zs](https://space.bilibili.com/99210573)