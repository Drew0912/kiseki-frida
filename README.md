# Kiseki Frida
Frida script to extend functionality of Kiseki/Trails games and enable dynamic debugging.

Updated from https://github.com/Drew0912/ED8Frida which was based on https://github.com/Ouroboros/Falcom/tree/master/ED8/ed83 by [Ouroboros](https://github.com/Ouroboros) to enable more features of Frida and support more than just ed8 games.

Based on Frida version 16.4.10. Later versions have compatability issues related to Windows, e.g does not work on Windows 10 and system errors hooking WinAPI. Testing has only been done on Windows.

# Installation/Compiling
...

# Frida CLI
Frida CLI is a command line interface allowing interaction between a terminal and the frida script (or Frida directly). Refer to https://frida.re/docs/frida-cli/ for more information.

Support for Frida CLI is possible through `frida-tools` and Python but is not recommended or needed. I would only recommend using Frida CLI if you have some understanding of Frida or want to use some of the `rpc.export` functions provided as this is the only way. (Add docs on this)

## Installation
To do this, first install Python. I would recommend using a virtual environment for Python and `frida-tools` which is done by running 

`python -m venv .venv`

Ensure you are using the virtual environment (a `.bat` file is provided to easily use the virtual environment) and install `frida-tools` by running

`pip install frida-tools`

## Usage

To do.

# Credits
- ed83 Frida (both script and loader) by [Ouroboros](https://github.com/Ouroboros)
    - https://github.com/Ouroboros/Falcom/tree/master/ED8/ed83
- Frida
    - https://frida.re/