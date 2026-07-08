import os
import re

directory = r'i:\KMTI_MG_APP_DEVELOPMENT\kmti-icad-hub\frontend\src\components\ICAD\Manual'

for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith('.tsx') or file.endswith('.ts') or file.endswith('.css'):
            filepath = os.path.join(root, file)
            with open(filepath, 'r', encoding='utf-8') as f:
                content = f.read()
            
            # Replace ../../ with ../../../../
            new_content = content.replace('../../', '../../../../')
            
            # Replace from "../ or from '../ with from "../../../ or from '../../../
            new_content = re.sub(r'from "(?!\.\.)\.\./([A-Za-z])', r'from "../../../\1', new_content)
            new_content = re.sub(r"from '(?!\.\.)\.\./([A-Za-z])", r"from '../../../\1", new_content)
            
            if new_content != content:
                with open(filepath, 'w', encoding='utf-8') as f:
                    f.write(new_content)
