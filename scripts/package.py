"""Build the distributable from an explicit allowlist; never include runtime data."""
from pathlib import Path
import json,zipfile
root=Path(__file__).resolve().parents[1]
files=[root/name for name in ['index.html','admin.html','privacy.html','robots.txt','sitemap.xml','server.mjs','README.md']]
for directory in ['css','js','media','data','server','docs','scripts']:
    files.extend(p for p in (root/directory).rglob('*') if p.is_file() and '__pycache__' not in p.parts)
archive=root/'Mr-Biriyaniwala-template.zip'
with zipfile.ZipFile(archive,'w',zipfile.ZIP_DEFLATED,compresslevel=6) as z:
    for file in files:z.write(file,'Mr-Biriyaniwala/'+file.relative_to(root).as_posix())
    z.writestr('Mr-Biriyaniwala/assets/','')
with zipfile.ZipFile(archive) as z:
    assert z.testzip() is None
    assert all('/.runtime/' not in n and '/.qa/' not in n and '/.tools/' not in n and not n.endswith('.env') for n in z.namelist())
    assert len([n for n in z.namelist() if '/hero/' in n and n.endswith('.mp4')])==16
    assert json.loads(z.read('Mr-Biriyaniwala/data/catalog.json'))['site']['whatsapp']=='923368933584'
media_bytes=sum(p.stat().st_size for p in (root/'media').rglob('*') if p.is_file())
assert media_bytes<50_000_000
print(json.dumps({'archive':str(archive),'files':len(files),'archive_bytes':archive.stat().st_size,'media_bytes':media_bytes,'private_data_excluded':True}))
