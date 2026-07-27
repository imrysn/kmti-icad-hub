import os

directory = r'i:/KMTI_MG_APP_DEVELOPMENT/kmti-icad-hub/frontend/src/components/3D_Modeling'
for filename in os.listdir(directory):
    if filename.endswith('.tsx'):
        filepath = os.path.join(directory, filename)
        with open(filepath, 'r', encoding='utf-8') as f:
            code = f.read()
            
        original_code = code
        code = code.replace('>Next<', '>{t(\'common.next\')}<')
        code = code.replace('>Next <', '>{t(\'common.next\')} <')
        code = code.replace('>Next Lesson <', '>{t(\'common.next\')} <')
        code = code.replace('> Previous<', '> {t(\'common.previous\')}<')
        
        # also replace 'Next' as fallback text
        code = code.replace("nextLabel || 'Next'", "nextLabel || t('common.next')")
        code = code.replace("nextLabel || 'Next Lesson'", "nextLabel || t('common.next')")
        
        if code != original_code:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(code)

print("Done translating 3D Next/Prev buttons")
