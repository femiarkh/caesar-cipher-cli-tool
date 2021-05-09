# Caesar cipher CLI tool

Command line application that encodes and decodes Latin alphabet characters with Caesar algorithm. Original case is preserved. All characters other than Latin alphabet characters are preserved in their original form.

---

## Installation

1. Download this repository and unpack it.
2. Go to the app folder.
3. Run `npm install`.
4. You are good to go.

## Usage

Go to the app folder and enter a command into the terminal. A command should be `node my_caesar_cli` followed by a set of options. Options can be entered either in full mode (e.g. `--shift`) or in short mode (e.g. `-s`), the result will be the same. Possible options are:

- `-a`, `--action` **(required)**, an action (encode / decode)
- `-s`, `--shift` **(required)**, a shift
- `-i`, `--input` _(optional)_, path to an input file
- `-o`, `--ouput` _(optional)_, path to an output file

An action should be either **encode** or **decode**. It determines whether a text will be encrypted or decrypted.

A shift should be an **integer**. It determines a number of letters by which all the Latin characters in a text will be shifted.

An input should be a **path to a file** with an input text. It can be either relative or absolute. File must exist and be accessible both for reading and writing. If no input file is provided, then input will be expected to be entered from the terminal.

An output should be a **path to a file** with an output text. It can be either relative or absolute. File must exist and be accessible both for reading and writing. If no output file is provided, then output will be displayed on the terminal.

## Examples

1. `$ node my_caesar_cli -a encode -s 3 -i "./input.txt" -o "./output.txt"`

Before:

> input.txt
> This is a test.

> output.txt
> _empty_

After:

> input.txt
> This is a test.

> output.txt
> Wklv lv d whvw.

2. `$ node my_caesar_cli --action decode --shift 3 --input input.txt --output output.txt`

Before:

> input.txt
> Wklv lv d whvw.

> output.txt
> _empty_

After:

> input.txt
> Wklv lv d whvw.

> output.txt
> This is a test.

3. `$ node my_caesar_cli -a encode -s -52 -i input.txt -o output.txt`

Before:

> input.txt
> This is a test.

> output.txt
> _empty_

After:

> input.txt
> This is a test.

> output.txt
> This is a test.
