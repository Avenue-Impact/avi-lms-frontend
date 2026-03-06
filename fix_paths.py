import os
import glob

def fix_file(filepath):
    with open(filepath, 'r') as f:
        content = f.read()

    new_content = content.replace('${BASE_URL}/admins/courses', '${BASE_URL}/courses')
    new_content = new_content.replace('/api/v1/admins/courses', '/api/v1/courses') # in comments

    if new_content != content:
        with open(filepath, 'w') as f:
            f.write(new_content)
        print(f"Fixed {filepath}")

search_dir = 'src/hooks'
for root, _, files in os.walk(search_dir):
    for file in files:
        if file.endswith(('.js', '.jsx')):
            fix_file(os.path.join(root, file))

# Also check components for any hardcoded /admins/courses
for root, _, files in os.walk('src/Components'):
    for file in files:
        if file.endswith(('.js', '.jsx')):
            fix_file(os.path.join(root, file))
            
for root, _, files in os.walk('src/pages'):
    for file in files:
        if file.endswith(('.js', '.jsx')):
            fix_file(os.path.join(root, file))
