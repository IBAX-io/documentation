import os
import re


def fix_link(file_path):
    with open(file_path, mode='r', encoding='utf-8', errors='replace') as f:
        html = f.read()
        regex_link_anchor = re.compile(' ({#(.+?)})[<"]', re.I | re.M | re.S)
        link_anchor = regex_link_anchor.findall(html)
        # print(link_anchor)
        flag = False
        for link_text in link_anchor:
            anchor = link_text[0]
            html = html.replace(anchor, '')
            flag = True

        if flag:
            # print(link_anchor)
            # print(f'Fix: {file_path}')
            with open(file_path, 'w', encoding='utf-8', errors='replace') as f1:
                f1.write(html)


if __name__ == '__main__':

    for root, dirs, files in os.walk(r"ibax-io.github.io"):
        for file in files:
            if file.endswith(".html") or file.endswith(".js"):
                path_html = os.path.join(root, file)
                fix_link(path_html)
